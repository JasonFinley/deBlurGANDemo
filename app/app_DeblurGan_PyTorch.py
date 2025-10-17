# -*- coding: utf-8 -*-
"""
Created on Thu Oct 16 12:05:42 2025

@author: ittraining
"""

# -*- coding: utf-8 -*-
"""
Use PyTorch DeblurGAN-v2 (.pth) to deblur images with Tkinter UI
"""

import os
import torch
import torch.nn as nn
import numpy as np
from PIL import Image, ImageTk
from torchvision import transforms
import tkinter as tk
from tkinter import filedialog

# ======== 模型定義區 ========
from models.fpn_inception import FPNInception  # 你需確認這個檔案存在

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"🔹 Using device: {device}")

# 模型 checkpoint 路徑
checkpoint_dir = os.path.join(os.getcwd(), "model")
ckpt_path = os.path.join(checkpoint_dir, "deblurgan_v2_latest.pth")

# 初始化模型
G = FPNInception(norm_layer=nn.InstanceNorm2d).to(device)
checkpoint = torch.load(ckpt_path, map_location=device)
G.load_state_dict(checkpoint["G"], strict=False)
G.eval()
print("✅ Model loaded from", ckpt_path)


# ======== Tile-based 推論函式 ========
def deblur_image_tiled(model, img, device, tile_size=512, overlap=32):
    """
    用 tile-based 方法在 GPU 記憶體有限時推論整張大圖。
    Args:
        model: 已載入權重的 DeblurGAN-v2 Generator
        img: 要處理的影像
        device: torch.device("cuda" or "cpu")
        tile_size: 每塊大小（建議 512）
        overlap: 重疊區域像素數（建議 16~64）
    """
    model.eval()
    
    # ---- 預處理 ----
    w, h = img.size
    
    # 確保為 32 倍數
    new_w = (w // 32) * 32
    new_h = (h // 32) * 32
    if new_w != w or new_h != h:
        img = img.resize((new_w, new_h), Image.BICUBIC)
        w, h = new_w, new_h

    img_np = np.array(img).astype(np.float32) / 255.0
    img_tensor = torch.from_numpy(img_np).permute(2, 0, 1).unsqueeze(0).to(device)

    # ---- 計算 tile 網格 ----
    stride = tile_size - overlap
    tiles_x = list(range(0, w, stride))
    tiles_y = list(range(0, h, stride))
    if tiles_x[-1] + tile_size > w:
        tiles_x[-1] = w - tile_size
    if tiles_y[-1] + tile_size > h:
        tiles_y[-1] = h - tile_size

    # ---- 準備空白輸出與權重 ----
    output = torch.zeros_like(img_tensor)
    weight = torch.zeros_like(img_tensor)

    with torch.no_grad():
        for y in tiles_y:
            for x in tiles_x:
                patch = img_tensor[:, :, y:y+tile_size, x:x+tile_size]
                pred = model(patch)
                
                # 疊加到對應位置
                output[:, :, y:y+tile_size, x:x+tile_size] += pred
                weight[:, :, y:y+tile_size, x:x+tile_size] += 1.0

    # ---- 平均化（避免重疊區域過曝）----
    output /= weight
    output = torch.clamp(output, 0, 1)

    # ---- 轉回圖片 ----
    out_np = (output.squeeze().permute(1, 2, 0).cpu().numpy() * 255.0).astype(np.uint8)
    return Image.fromarray(out_np)


# ======== 封裝成 DeblurModel 類 ========
class DeblurModel:
    def __init__(self, model):
        self.model = model

    def predict(self, image_path):
        img = Image.open(image_path).convert("RGB")
        out_img = deblur_image_tiled(self.model, img, device, tile_size=512, overlap=32)
        return out_img


# ======== Tkinter GUI ========
class ImageViewerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("AI Image Deblurring Viewer (PyTorch)")
        self.root.geometry("1500x700")
        self.create_gui()
        self.model = DeblurModel(G)

    def create_gui(self):
        label_font = ("Helvetica", 16)
        self.browse_button = tk.Button(
            self.root, text="Browse Image", command=self.browse_image, font=label_font
        )

        self.canvas_original = tk.Canvas(self.root, width=480, height=420, bg="lightgray")
        self.canvas_result = tk.Canvas(self.root, width=480, height=420, bg="lightgray")
        self.result_label = tk.Label(self.root, text="", font=("Helvetica", 18, "bold"), fg="blue")

        self.browse_button.grid(row=0, column=0, columnspan=2, pady=10)
        self.canvas_original.grid(row=1, column=0, padx=10, pady=10)
        self.canvas_result.grid(row=1, column=1, padx=10, pady=10)
        self.result_label.grid(row=2, column=0, columnspan=2, pady=10)

    def browse_image(self):
        file_path = filedialog.askopenfilename(
            filetypes=[("Image files", "*.jpg *.jpeg *.png *.gif *.bmp *.tif")]
        )
        if file_path:
            self.display_images(file_path)

    def display_images(self, image_path):
        img = Image.open(image_path)
        img.thumbnail((480, 420))
        photo = ImageTk.PhotoImage(img)
        self.canvas_original.create_image(0, 0, anchor="nw", image=photo)
        self.canvas_original.image = photo

        result_img = self.model.predict(image_path)
        result_img.thumbnail((480, 420))
        photo_result = ImageTk.PhotoImage(result_img)
        self.canvas_result.create_image(0, 0, anchor="nw", image=photo_result)
        self.canvas_result.image = photo_result

        self.result_label.config(text=f"File: {os.path.basename(image_path)} → Deblurred by DeblurGAN-v2")


if __name__ == "__main__":
    root = tk.Tk()
    app = ImageViewerApp(root)
    root.mainloop()

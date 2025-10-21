"use client"
import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { App, message, Upload } from 'antd';
import {
  InboxOutlined,
  FileOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Dragger } = Upload;

const ItemRender = (originNode, file, fileList, actions) => {
    // 狀態對應顏色與 icon
    let color = '#333';
    let IconBefore = FileOutlined;
    let IconAfter = null;

    if (file.status === 'uploading') {
      color = '#faad14';
      IconBefore = LoadingOutlined;
    } else if (file.status === 'done') {
      color = '#52c41a';
      IconBefore = CheckCircleOutlined;
      IconAfter = DeleteOutlined;
    } else if (file.status === 'error') {
      color = '#ff4d4f';
      IconBefore = CloseCircleOutlined;
      IconAfter = DeleteOutlined;
    }

    const Before = <IconBefore style={{ color, marginRight: 6 }} />;
    const After = IconAfter && (
        <IconAfter
          style={{ color: '#999', marginLeft: 8, cursor: 'pointer' }}
          onClick={actions.remove}
        />
    );

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 4,
          padding: '4px 8px',
          borderRadius: 4,
          background: '#2e2c2cff',
        }}
      >
        <div>
          {Before}
          <span style={{ color }}>{file.name}</span>
        </div>
        {After}
      </div>
    );
}

const AntdUpload = ({setUploadFile}) => {

  const { message } = App.useApp(); // ✅ 改這裡
  const [fileList, setFileList] = useState([]); // 僅保存一個檔案

  const props = {
    name: 'file',
    size: 'large',
    accept: ".png,.jpg,.jpeg",
    multiple: false,
    maxCount: 1,
    fileList: fileList,
    
    itemRender: ItemRender,

    beforeUpload: (file) => {
      // ✅ 可額外檢查格式或大小
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上傳圖片！');
        return Upload.LIST_IGNORE; // 阻止加入列表
      }
      return true;
    },
    onChange(info) {

      let newFileList = info.fileList.slice(-1); // ✅ 僅保留最後一個
      setFileList(newFileList);

      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setUploadFile(info.file.originFileObj);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="text-white">Click or drag file to this area to upload</p>
      <p className="text-white">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        banned files.
      </p>
    </Dragger>
  )
}

export default AntdUpload;
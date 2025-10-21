"use client"

import { Button } from "antd";

const BTNDownload = ({ fileName, downloadURL}) => {

    const handleOnClick = () => {

        if( !downloadURL ) return;

        const file_name = !fileName ? "deblurred_image.png" : fileName;

        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = file_name;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Button
            type="primary"
            disabled={ !downloadURL }
            onClick={handleOnClick}
            style={{
                width: "120px",
                height: "44px",
                color: "#ffffff",
                fontSize: "20px"
            }}
        >
            Download
        </Button>
    )
}

export default BTNDownload;
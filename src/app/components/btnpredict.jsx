"use client"

import { Button } from "antd";
import { useEffect, useState } from "react";

const BTNPredict = ({imageFileObj, setIsFetching, setPredictObj }) => {

    const [isDisabled, setIsDisabled] = useState( false ); 
    
    const postPredict = async ( fileObj ) => {
        setIsFetching(true);
        setIsDisabled(true);

        /*
        {
            asset_id: response.asset_id,
            format: response.format,
            public_id: response.public_id,
            version: response.version,
            url: response.secure_url,
            width: response.width,
            height: response.height,
            name: response.original_filename,
        }
        */
        const formData = new FormData();
        formData.append("file_name", fileObj.name );
        formData.append("file_format", fileObj.format );
        formData.append("file_url", fileObj.url );
        formData.append("file_width", fileObj.width );
        formData.append("file_height", fileObj.height );
        formData.append("file_created_at", fileObj.created_at );

        const res = await fetch("https://aidemoproject-deblurganv2demo.hf.space/predict", { method: "POST", body: formData });
        const jsonRes = await res.json();
        console.log(jsonRes);
        setPredictObj(jsonRes);
        setIsFetching(false);
        setIsDisabled(false);
        //return url
    }

    const handlePredict = () => {
        if( imageFileObj.url == null ) 
            return;

        postPredict( imageFileObj );
    }

    useEffect( () => {

        setIsFetching(false)
        if( imageFileObj.url == null ) {
            setIsDisabled( true );
        }

    }, [imageFileObj] );

    return <Button
        type="primary"
        disabled={isDisabled} 
        onClick={ handlePredict }
        style={{
            width: "120px",
            height : "44px",
            color: "#ffffff",
            fontSize: "20px"
        }}
    >
        Deblur
    </Button>;
}

export default BTNPredict;
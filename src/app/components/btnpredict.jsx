"use client"

import { Button } from "antd";
import { useEffect, useState } from "react";

const BTNPredict = ({imageFile, setIsLoading, setPredictURL }) => {
    
    const postPredict = async ( file ) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", file );

        const res = await fetch("https://aidemoproject-deblurganv2demo.hf.space/predict", { method: "POST", body: formData });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        console.log(url);
        setPredictURL(url);
        setIsLoading(false);
        //return url
    }

    const handlePredict = () => {
        postPredict( uploadedImageFile );
    }

    useEffect( () => {

        setIsLoading(false)

    }, [imageFile] );

    return <Button onClick={ handlePredict }>CLEAR</Button>;
}

export default BTNPredict;
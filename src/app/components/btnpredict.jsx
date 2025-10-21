"use client"

import { Button } from "antd";
import { useEffect, useState } from "react";

const BTNPredict = ({imageFile, setIsFetching, setPredictURL }) => {

    const [isDisabled, setIsDisabled] = useState( false ); 
    
    const postPredict = async ( file ) => {
        setIsFetching(true);
        setIsDisabled(true);

        const formData = new FormData();
        formData.append("file", file );

        const res = await fetch("https://aidemoproject-deblurganv2demo.hf.space/predict", { method: "POST", body: formData });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        console.log(url);
        setPredictURL(url);
        setIsFetching(false);
        setIsDisabled(false);
        //return url
    }

    const handlePredict = () => {
        if( imageFile )
            postPredict( imageFile );
    }

    useEffect( () => {

        setIsFetching(false)

    }, [imageFile] );

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
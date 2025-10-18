"use client"

import { useState } from "react";
import AntdUpload from "../components/antdupload";
import BTNPredict from "../components/btnpredict";

const ViewMain = () => {
    const [ isLoading, setIsLoading ] = useState( false );
    const [ imageFile, setImageFile ] = useState( null );
    const [ predictURL, setPredictURL ] = useState( null );

    return <div>
        <AntdUpload/>
        <BTNPredict
            imageFile={ imageFile }
            setIsLoading={ setIsLoading }
            setPredictURL={ setPredictURL }
        />
    </div>;
}

export default ViewMain;
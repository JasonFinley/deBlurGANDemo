"use client"

import { useEffect, useState } from "react";
import AntdUpload from "../../components/antdupload";
import BTNPredict from "../../components/btnpredict";
import { Spin } from "antd";
import ComparisonImage from "../../components/comparisonimage";
import BTNDownload from "../../components/btndownload";
import "./deblur.css";

const ViewDeblur = () => {
    
    const [ isFetching, setIsFetching ] = useState( false );
    const [ predictObj, setPredictObj ] = useState({
        url: null,
        name: null,
        width: null,
        height: null,
        created_at: null,
    });
    const [ upLoadFileObj, setUploadFileObj ] = useState( {
        created_at: null,
        asset_id: null,
        public_id: null,
        version: null,
        format: null,
        url: null,
        width: null,
        height: null,
        name: null,
        // format: "jpg",
        // url: "https://picsum.photos/id/1/1280/720",
        // width: 1280,
        // height: 720,
        // name: "random_image",
    } );

    return <div>
        <AntdUpload
            setUploadFileObj={ setUploadFileObj }
        />
        <div className="w-full flex justify-center my-4">
            <BTNPredict
                imageFileObj={ upLoadFileObj }
                setIsFetching={ setIsFetching }
                setPredictObj={ setPredictObj }
            />
            <div className="w-4"/>
            <BTNDownload
                fileName={ predictObj.name }
                downloadURL={ predictObj.url }
            />
        </div>
        <div className="w-full flex justify-center">
            <div className="relative w-full max-w-[1024px] h-auto aspect-[4/3] bg-gray-600/50 mx-auto">
                { upLoadFileObj.url && !predictObj.url &&
                    <div className="relative w-full h-full flex justify-center items-center">
                        <img
                            loading="lazy"
                            src={ upLoadFileObj.url } 
                            alt="Uploaded"
                            className="object-cover w-full h-full"
                        />
                    </div>
                }
                {
                    isFetching ? (
                        <div className="absolute left-0 top-0 w-full max-w-[1024px] h-auto aspect-[4/3] bg-black/50 flex justify-center items-center">
                            <Spin tip="Loading" size="large">
                                <div style={{
                                        padding: 50,
                                        background: 'rgba(0, 0, 0, 0.05)',
                                        borderRadius: 4,
                                    }} 
                                />
                            </Spin>
                        </div>
                    ) : predictObj.url && (
                        <div className="absolute left-0 top-0 w-full max-w-[1024px] h-auto aspect-[4/3] bg-black/50 flex justify-center items-center">
                            {/*<ComparisonImage
                                imageA={ "https://picsum.photos/id/870/1024/768" }
                                imageB={ "https://picsum.photos/id/870/1024/768?grayscale&blur=2" }
                            />*/}
                            <ComparisonImage
                                imageA={ upLoadFileObj.url }
                                imageB={ predictObj.url }
                            />
                        </div>
                    )
                }
            </div>
        </div>
    </div>;
}

export default ViewDeblur;
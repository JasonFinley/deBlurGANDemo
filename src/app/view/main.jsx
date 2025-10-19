"use client"

import { useCallback, useMemo, useState } from "react";
import AntdUpload from "../components/antdupload";
import BTNPredict from "../components/btnpredict";
import { Spin } from "antd";
import ComparisonImage from "../components/comparisonimage";
import BTNDownload from "../components/btndownload";

const ViewMain = () => {
    const [ isFetching, setIsFetching ] = useState( false );
    const [ imageFile, setImageFile ] = useState( null );
    const [ predictURL, setPredictURL ] = useState( null );

    const getImageFileURL = useCallback( () => {
        if( imageFile )
            return URL.createObjectURL( imageFile );
        return null;
    }, [imageFile] );

    const getDeblurredImageURL = useCallback( () => {

        if( !predictURL ) return null;

        return {
            fileName: imageFile ? ( "deblurred_" + imageFile.name ): "deblurred_image.png",
            predictURL: predictURL
        }

    }, [predictURL]);

    return <div>
        <AntdUpload
            setUploadFile={ setImageFile }
        />
        <div className="w-full flex justify-center my-4">
            <BTNPredict
                imageFile={ imageFile }
                setIsFetching={ setIsFetching }
                setPredictURL={ setPredictURL }
            />
            <div className="w-4"/>
            <BTNDownload
                fileName={ getDeblurredImageURL() ? getDeblurredImageURL().fileName : null }
                predictURL={ getDeblurredImageURL() ? getDeblurredImageURL().predictURL : null }
            />
        </div>
        <div className="w-full flex justify-center">
            <div className="relative w-[1024px] h-[768px] bg-stone-800/50">
                { imageFile &&
                    <div className="relative w-full h-full flex justify-center items-center">
                        <img 
                            src={ URL.createObjectURL( imageFile ) } 
                            alt="Uploaded" 
                        />
                    </div>
                }
                {
                    isFetching ? (
                        <div className="absolute left-0 top-0 w-[1024px] h-[768px] bg-black/50 flex justify-center items-center">
                            <Spin tip="Loading" size="large">
                                <div style={{
                                        padding: 50,
                                        background: 'rgba(0, 0, 0, 0.05)',
                                        borderRadius: 4,
                                    }} 
                                />
                            </Spin>
                        </div>
                    ) : predictURL && (
                        <div className="absolute left-0 top-0 w-[1024px] h-[768px] bg-black/50 flex justify-center items-center">
                            {/*<ComparisonImage
                                imageA={ "https://picsum.photos/id/870/1024/768" }
                                imageB={ "https://picsum.photos/id/870/1024/768?grayscale&blur=2" }
                            />*/}
                            <ComparisonImage
                                imageA={ getImageFileURL() }
                                imageB={ predictURL }
                            />
                        </div>
                    )
                }
            </div>
        </div>
    </div>;
}

export default ViewMain;
"use client"

import React, { useState } from 'react';
import Image from "next/image";
import { Layout, Menu, theme } from 'antd';
import ViewDeMotion from './demotion';
const { Header, Content, Footer, Sider } = Layout;

const ViewMain = () => {

    const [selectedKey, setSelectedKey] = useState('1');

    const items = [{
        key: '1',
        label : '模糊去噪',
    },{
        key: '2',
        label : '畫質修復',
    },{
        key: '3',
        label : '圖像濾鏡',
    }]


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleOnSelectMenu = (e) => {
        console.log('click ', e.key);
        setSelectedKey( e.key );
    }

    return (
    <Layout hasSider>
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'sticky',
                insetInlineStart: 0,
                top: 0,
                bottom: 0,
                scrollbarWidth: 'thin',
                scrollbarGutter: 'stable',
            }}
        >
            <div className='w-full h-32 bg-[#061830] flex justify-center items-center'>
                <Image
                    priority
                    unoptimized 
                    height={96} 
                    width={128} 
                    src={"/clearify_logo.png"} 
                    alt="Clearify LOGO"
                    style={{ 
                        width: '100%', 
                        height: 'auto', 
                        objectFit: 'contain' 
                    }}
                />
            </div>
            <Menu 
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']} 
                items={items}
                style={{
                    fontSize: "20px",
                    textAlign: "center"
                }}
                onSelect={ handleOnSelectMenu }
            />
        </Sider>
        <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                {
                    selectedKey === '1' ? (
                        <div>
                            <ViewDeMotion/>
                        </div>
                    ) : selectedKey === '2' ? ( 
                        <div className='text-2xl'>畫質修復內容區 - Comming Soon</div>
                    ) : selectedKey === '3' ? (
                        <div className='text-2xl'>圖像濾鏡區 - Comming Soon</div>
                    ) : (
                        <div className='text-2xl'>Comming Soon</div>
                    )
                }
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    </Layout>);
}

export default ViewMain;
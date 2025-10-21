
import { App, ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const theme = {
    components: {
        Button: {
            borderColorDisabled: "#504e54ff",
            colorPrimary: "#4200e8ff",
            defaultBorderColor: "#efecf4ff",
            defaultColor: "#ffffff",
            contentFontSize: "20px",
            height: "44px",
            borderRadius: "8px",
        },
    }
};

const ProvidersAntd = ({ children }) => {
    return (
        <App>
            <AntdRegistry>
                <ConfigProvider theme={theme}>
                    {children}
                </ConfigProvider >
            </AntdRegistry>
        </App>
    )
}

export default ProvidersAntd;
import Image from "next/image";

const Header = () => {
    return <div className="flex w-full h-24 bg-[#061830]">
        <Image unoptimized height={96} width={128} style={{ objectFit: 'contain' }} src={"/clearify_logo.png"} alt="Clearify LOGO"/>
    </div>;
}

export default Header;
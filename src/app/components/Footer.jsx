import Image from "next/image";
import React from "react";
import logo01 from "../../../public/images/logo01.png";

const Footer = () => {
  return (
    <footer className="footer bg-[#152930e3] border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <Image alt="VNFIXER-LOGO" width={200} height={50} src={logo01}></Image>
        <p className="text-white">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

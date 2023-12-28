import Image from "next/image";
import React from "react";
import logo01 from "../../../public/images/logo01.png";

const Footer = () => {
  return (
    <footer className="rounded-lg shadow m-4 bg-[#152930e3] border z-50 border-t-[#33353F]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              alt="VNFIXER-LOGO"
              width={200}
              height={0}
              src={logo01}
              loading="lazy"
            ></Image>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Điều khoản
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Chứng Nhận
              </a>
            </li>
            <li>
              <a href="tel:0342246435" className="hover:underline">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-300 sm:text-center">
          © 2023
          <a href="https://flowbite.com/" className="hover:underline">
            VNFIXER™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

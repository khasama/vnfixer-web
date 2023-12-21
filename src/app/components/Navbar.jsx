"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo01 from "../../../public/images/logo01.png";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector, isLoggedInSelector } from "../redux/selectors";
import { logout } from "../redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";

const navLinks = [
  {
    title: "Trang chủ",
    path: "/",
  },
  {
    title: "Trở thành đối tác",
    path: "/agency",
  },
  {
    title: "Dịch vụ",
    path: "/category",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [hidden, setHidden] = useState(true);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  // const handleSign = () => {
  //   router.push("/login");
  // };

  const handleLogOut = () => {
    dispatch(logout())
      .then(unwrapResult)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLogin(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="border-t-8 border-nav-top top-0 left-0 right-0 z-10 bg-[#ffff] bg-opacity-100">
      <div className="flex justify-between md:justify-center lg:justify-between container lg:py-4 flex-wrap items-center mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-black font-semibold"
        >
          <Image
            loading="lazy"
            alt="VNFIXER-LOGO"
            width={200}
            height={50}
            src={logo01}
          ></Image>
        </Link>
        <div className="mobile-menu z-50 block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border-2 rounded border-cyan-400 hover:text-black"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border-2 rounded border-cyan-400 hover:text-black"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex justify-center items-center p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            <li>
              <button className="flex justify-center items-center gap-2 border border-[#4694EF] hover:border-[#326bac] text-[#4694EF] font-bold py-2 px-8 rounded-full">
                Hotline <PhoneIcon width={15}></PhoneIcon>
              </button>
            </li>
            <li>
              {!login ? (
                <Link href={"/login"}>
                  <button className="block bg-[#4694EF] hover:bg-[#2c5b92] text-white font-bold py-2 px-8 rounded-full">
                    Đăng nhập
                  </button>
                </Link>
              ) : (
                <div className="relative">
                  {hidden && (
                    <div className="absolute top-3 right-2  bg-red-500 w-2 h-2 rounded-full"></div>
                  )}
                  <button
                    data-ripple-light="true"
                    data-popover-target="menu"
                    onClick={() => setHidden(!hidden)}
                    className="rounded-full select-none p-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    <Image
                      src={
                        currentUser.avatar
                          ? currentUser.avatar
                          : require("../../../public/images/default.png")
                      }
                      alt={"avatar"}
                      width={40}
                      height={40}
                    ></Image>
                  </button>
                  <ul
                    role="menu"
                    data-popover="menu"
                    data-popover-placement="bottom"
                    hidden={hidden}
                    className="absolute z-10 min-w-[150px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none "
                  >
                    <li
                      role="menuitem"
                      className="hover:underline block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                    >
                      <Link href={"/profile"}>
                        <b>Hồ Sơ</b>
                      </Link>
                    </li>
                    <li
                      role="menuitem"
                      className="hover:underline block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                    >
                      <b> Tin nhắn</b>
                    </li>
                    <li
                      onClick={handleLogOut}
                      role="menuitem"
                      className="hover:underline block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                    >
                      <b>Đăng xuất</b>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </div>
  );
};

export default Navbar;

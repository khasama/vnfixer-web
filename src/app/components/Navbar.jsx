"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import logo01 from "../../../public/images/logo01.png";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector, isLoggedInSelector } from "../redux/selectors";
import { logout } from "../redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import MessageForm from "./MessageForm";

const navLinks = [
  {
    title: "Trang chủ",
    path: "/",
  },
  {
    title: "Trở thành đối tác",
    path: "/create_agency",
  },
  {
    title: "Dịch vụ",
    path: "/agency",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState();
  const [hidden, setHidden] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    setHidden(true);
    dispatch(logout())
      .then(unwrapResult)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLogin(isLoggedIn);
    setUser(currentUser);
  }, [isLoggedIn, currentUser]);

  return (
    <div className="border-t-8 border-nav-top top-0 left-0 right-0 z-10 bg-[#ffff] bg-opacity-100">
      <div className="flex justify-between md:justify-center lg:justify-between container lg:py-4 flex-wrap items-center mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-black font-semibold"
          shallow
        >
          <Image
            alt="VNFIXER-LOGO"
            width={200}
            height={0}
            src={logo01}
            blurDataURL={logo01}
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
              {!user?.agencyRole?.length > 0 ? (
                <Link
                  href={"tel:0342246435"}
                  shallow
                  className="flex justify-center items-center gap-2 border border-[#4694EF] hover:border-[#326bac] text-[#4694EF] font-bold py-2 px-8 rounded-full"
                >
                  Hotline <PhoneIcon width={15}></PhoneIcon>
                </Link>
              ) : (
                <Link
                  href={`${
                    user?.agencyRole == "STAFF"
                      ? "/manage/staff"
                      : "/manage/manager"
                  }`}
                  shallow
                  className="flex justify-center items-center gap-2 border bg-[#4694EF] hover:border-[#326bac] text-white font-bold py-2 px-8 rounded-full"
                >
                  {user?.agencyRole == "STAFF"
                    ? "Quản lý yêu cầu"
                    : "Quản lý chi nhánh"}
                </Link>
              )}
            </li>
            <li>
              {!login ? (
                <Link href={"/login"} shallow>
                  <button className="block bg-[#4694EF] hover:bg-[#2c5b92] text-white font-bold py-2 px-8 rounded-full">
                    Đăng nhập
                  </button>
                </Link>
              ) : (
                <div className="relative">
                  {hidden && (
                    <div className="absolute top-3 right-2  bg-red-500 w-2 h-2 rounded-full"></div>
                  )}
                  {!hidden && (
                    <div
                      className="fixed inset-0 w-full h-full"
                      onClick={() => setHidden(!hidden)}
                    ></div>
                  )}
                  <button
                    data-ripple-light="true"
                    data-popover-target="menu"
                    onClick={() => setHidden(!hidden)}
                    className="rounded-full select-none p-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    <Image
                      src={
                        currentUser?.avatar
                          ? currentUser?.avatar
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
                    className="absolute right-0 z-10 min-w-[170px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none "
                  >
                    <li
                      role="menuitem"
                      className="hover:underline block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                    >
                      <Link
                        onClick={() => setHidden(true)}
                        href={"/profile"}
                        shallow
                      >
                        <b>Hồ Sơ</b>
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setShowMessage(!showMessage);
                      }}
                      role="menuitem"
                      className="hover:underline block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                    >
                      <b> Thông báo</b>
                    </li>
                    <li
                      role="menuitem"
                      className="hover:underline block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                    >
                      <b>
                        <Link
                          onClick={() => setHidden(true)}
                          href={"/my_request"}
                          shallow
                        >
                          Yêu cầu của tôi
                        </Link>
                      </b>
                    </li>
                    {currentUser?.agencyRole?.length > 0 && (
                      <li
                        role="menuitem"
                        className="hover:underline block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <b>
                          <Link
                            onClick={() => setHidden(true)}
                            shallow
                            href={`${
                              user?.agencyRole == "STAFF"
                                ? "/manage/staff"
                                : "/manage/manager"
                            }`}
                          >
                            {user?.agencyRole == "STAFF"
                              ? "Quản lý yêu cầu"
                              : "Quản lý chi nhánh"}
                          </Link>
                        </b>
                      </li>
                    )}
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
      {showMessage ? <MessageForm onClose={setShowMessage} /> : null}
    </div>
  );
};

export default Navbar;

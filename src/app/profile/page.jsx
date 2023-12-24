"use client";
import { updateUser } from "../redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaInfo,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRetweet,
  FaUserAlt,
} from "react-icons/fa";
import { isLoggedInSelector, currentUserSelector } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Auth() {
  const srcTemp = require("../../../public/images/default.png");
  const isLogin = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);
  const [disable, setDisable] = useState(true);
  const [logged, setLogged] = useState(false);
  const [fullName, setFullName] = useState(currentUser?.fullName);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [email, setEmail] = useState(currentUser?.email);
  const [address, setAddress] = useState(currentUser.address);
  const [avatar, setAvatar] = useState(
    currentUser?.avatar?.length > 0 ? currentUser?.avatar : srcTemp
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const notify = () => toast.error(messageError);

  useEffect(() => {
    !isLogin && router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLogged(isLogin);
  }, [isLogin]);

  const handleCancel = () => {
    setDisable(true);
    setFullName(currentUser?.firstName);
    setPhone(currentUser?.phone);
    setAddress(currentUser?.address);
    setEmail(currentUser?.email);
    setAvatar(!currentUser?.avatar?.length > 0 ? srcTemp : "");
  };

  const handleEditProfile = () => {
    setDisable(true);

    if (email.length > 2 && fullName.length > 2) {
      const user = {
        fullName: fullName,
        phone: phone,
        email: email,
        avatar: avatar,
        address: address ?? "",
      };
      dispatch(updateUser(user))
        .then({ unwrapResult })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Error!");
    }
  };

  return (
    <>
      {logged && (
        <>
          <Toaster position="top-center" />
          <div className="bg-login"></div>
          <div className="p-5">
            <div className="row d-flex justify-content-center align-items-center p-3 lg:p-10">
              <div className="bg-white opacity-90 shadow-xl relative w-full md:w-2/3 mx-auto px-6 py-16 lg:p-10 rounded-xl flex flex-col sm:flex-row sm:items-start items-center  flex-wrap gap-1 sm:gap-0 min-h-[60vh]">
                <div className="text-white flex flex-col w-1/4 sm:pr-2">
                  <div className="mx-auto text-center">
                    <Image
                      width={150}
                      height={0}
                      src={avatar}
                      alt="Generic placeholder"
                      className="img-fluid img-thumbnail mt-4 mb-2 rounded-xl"
                    />
                    <div>
                      <button
                        type="button"
                        disabled={disable}
                        className="bg-[#4b4b4c] rounded-xl px-2 py-1 cursor-pointer"
                        data-mdb-ripple-color="dark"
                        onClick={() => {
                          const rule = () =>
                            "abcdefghijklmnopqrstuvwxyz"[
                              Math.floor(Math.random() * 26)
                            ];
                          const randomLetter = rule();
                          setAvatar(
                            `https://robohash.org/${randomLetter}?set=set5&bgset=&size=400x400`
                          );
                        }}
                      >
                        <FaRetweet></FaRetweet>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-3/4">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center lg:w-3/4 w-full pb-5">
                      <FaInfo className="text-2xl text-blue-500"></FaInfo>
                      <b className="text-2xl">Thông tin</b>
                    </div>
                    <div className="">
                      <div className="w-full">
                        <b>Tên</b>
                        <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md bg-[#e1f8fd63] flex flex-row items-center lg:w-2/3 w-full">
                          <FaUserAlt></FaUserAlt>
                          <input
                            className={
                              " bg-transparent ml-5 w-full focus-visible:outline-none focus-visible:border-b-2"
                            }
                            type={"text"}
                            name={"fullName"}
                            onChange={(e) => {
                              setFullName(e.target.value);
                            }}
                            value={fullName}
                            disabled={disable}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <b>Email</b>
                      {console.log(avatar, fullName, phone, address, email)}
                      <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md bg-[#e1f8fd63] flex flex-row items-center lg:w-2/3 w-full">
                        <FaPhoneAlt></FaPhoneAlt>
                        <input
                          className={
                            " bg-transparent ml-5 w-full focus-visible:outline-none focus-visible:border-b-2 text-black"
                          }
                          type={"email"}
                          name={"email"}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          value={email}
                          disabled={disable}
                        ></input>
                      </div>
                    </div>
                    <div className="py-2">
                      <b>Số điện thoại</b>
                      <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md bg-[#e1f8fd63] flex flex-row items-center lg:w-2/3 w-full">
                        <FaPhoneAlt></FaPhoneAlt>
                        <input
                          className={
                            " bg-transparent ml-5 w-full focus-visible:outline-none focus-visible:border-b-2"
                          }
                          type={"number"}
                          name={"phone"}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          value={phone}
                          disabled={disable}
                        ></input>
                      </div>
                    </div>
                    <div className="py-2">
                      <b>Địa chỉ</b>
                      <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md bg-[#e1f8fd63] flex flex-row items-center lg:w-2/3 w-full">
                        <FaMapMarkerAlt></FaMapMarkerAlt>
                        <input
                          className={
                            "bg-transparent ml-5 w-full focus-visible:outline-none focus-visible:border-b-2"
                          }
                          type={"text"}
                          name={"address"}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          value={address}
                          disabled={disable}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-10 justify-end absolute bottom-2 right-5">
                  <button
                    type="button"
                    className={`bg-black rounded-xl text-sm text-white px-4 py-3`}
                    data-mdb-ripple-color="dark"
                    onClick={() => setShowChangePassword(true)}
                  >
                    Đổi mật khẩu
                  </button>
                  {disable ? (
                    <button
                      type="button"
                      className={`bg-black rounded-xl text-sm text-white px-4 py-3`}
                      data-mdb-ripple-color="dark"
                      onClick={() => setDisable(false)}
                    >
                      Chỉnh sửa
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={`text-sm rounded-xl text-black bg-white px-4 py-3 border border-red-500`}
                        data-mdb-ripple-color="dark"
                        onClick={handleCancel}
                      >
                        Huỷ
                      </button>
                      <button
                        type="button"
                        className="bg-[#00aeff] text-sm rounded-xl text-white px-4 py-3"
                        data-mdb-ripple-color="dark"
                        onClick={handleEditProfile}
                      >
                        Save
                      </button>
                    </>
                  )}
                  {/* {showChangePassword ? (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="mx-auto border-0 rounded-lg shadow-lg relative flex flex-col w-2/3 lg:w-1/2 bg-[#fdf2e8] outline-none focus:outline-none p-5">
                          <div className="flex flex-col gap-1 items-center justify-center border-blue-100 border-2 rounded-lg w-full px-2 py-2">
                            <p className="py-2"> Thay đổi mật khẩu</p>
                            <div className="py-3 w-10/12 md:w-1/2">
                              <label>
                                <FaKey></FaKey>
                              </label>
                              <div className="w-full flex flex-row items-center border-b-2 border-[#695308] bg-[#fcecc18d]">
                                <input
                                  value={oldPassword}
                                  onChange={(e) =>
                                    setOldPassword(e.target.value)
                                  }
                                  type="password"
                                  autoComplete="off"
                                  name="oldPassword"
                                  id="oldPassword"
                                  className="sm:text-base text-sm px-3 py-2"
                                  placeholder="Mật khẩu cũ"
                                  required
                                />
                              </div>
                            </div>
                            <div className="py-3 w-10/12 md:w-1/2">
                              <label>
                                <FaKey></FaKey>
                              </label>
                              <div className="w-full flex flex-row items-center border-b-2 border-[#695308] bg-[#fcecc18d] relative">
                                <input
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                  type={`${showPassword ? "text" : "password"}`}
                                  autoComplete="off"
                                  name="newPassword"
                                  id="newPassword"
                                  className="sm:text-base text-sm px-3 py-2"
                                  placeholder="Mật khẩu mới"
                                  required
                                />
                                <span className="absolute right-0">
                                  {showPassword ? (
                                    <FaEye
                                      onClick={() => setShowPassword(false)}
                                    ></FaEye>
                                  ) : (
                                    <FaEyeSlash
                                      onClick={() => setShowPassword(true)}
                                    ></FaEyeSlash>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="p-5 flex-auto overflow-auto mx-auto space-x-5">
                            <Button
                              name={"cancel"}
                              id={"cancel"}
                              type={"button"}
                              onClick={() => {
                                setShowChangePassword(false);
                              }}
                              className="text-black bg-white text-md md:text-base font-bold p-2 shadow-[#6e6e6e9d] shadow-md hover:shadow-none"
                            >
                              <p className="text-sm">Huỷ</p>
                            </Button>
                            <Button
                              name={"change"}
                              id={"change"}
                              type={"button"}
                              onClick={() => {
                                handleChangPassword();
                                handleLogOutClick();
                              }}
                              className="bg-[#04d6d6] text-white text-md md:text-base font-bold p-2 shadow-[#6e6e6e9d] shadow-md hover:shadow-none"
                            >
                              <p className="text-sm">Thay đổi</p>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null} */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

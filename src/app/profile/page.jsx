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
  FaBuilding,
  FaAt,
} from "react-icons/fa";
import {
  isLoggedInSelector,
  currentUserSelector,
  categoriesSelector,
} from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import vnfixerAPI from "../api/vnfixerApi";
import { FaReadme } from "react-icons/fa6";
import { getCategories } from "../redux/reducers/category";

export default function Auth() {
  const srcTemp = require("../../../public/images/default.png");
  const srcAgency = require("../../../public/images/logo.png");
  const categories = useSelector(categoriesSelector);
  const isLogin = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);
  const [userDisable, setUserDisable] = useState(true);
  const [agencyDisable, setAgencyDisable] = useState(true);
  const [agency, setAgency] = useState();
  const [logged, setLogged] = useState(false);
  const [fullName, setFullName] = useState(currentUser?.fullName);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [email, setEmail] = useState(currentUser?.email);
  const [address, setAddress] = useState(currentUser?.address);
  const [agencyName, setAgencyName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [agencyAvatar, setAgencyAvatar] = useState(srcAgency);
  const [avatar, setAvatar] = useState(
    currentUser?.avatar?.length > 0 ? currentUser?.avatar : srcTemp
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    !isLogin && router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    setLogged(isLogin);
  }, [isLogin]);

  const getAgencyOwner = async () => {
    if (currentUser) {
      try {
        const res = await vnfixerAPI.getAgency(currentUser.agencyId);
        if (res.status == 200) {
          setAgency(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAgencyOwner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getAllCategory = () => {
      dispatch(getCategories())
        .then(unwrapResult)
        .catch((err) => {
          alert(err.message);
        });
    };
    getAllCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (agency) {
      setAgencyName(() => {
        setCategoryId(agency.categoryId);
        setDescription(agency.description);
        setCategoryName(agency.category.name);
        setAgencyAvatar(agency?.logo?.length > 0 ? agency?.logo : srcAgency);
        return agency.name;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agency]);

  const handleUserCancel = () => {
    setUserDisable(true);
    setFullName(currentUser?.firstName);
    setPhone(currentUser?.phone);
    setAddress(currentUser?.address);
    setEmail(currentUser?.email);
    setAvatar(currentUser?.avatar?.length > 0 ? currentUser.avatar : srcTemp);
  };
  const handleAgencyCancel = () => {
    setAgencyDisable(true);
    if (agency) {
      setAgencyName(() => {
        setCategoryId(agency.categoryId);
        setDescription(agency.description);
        setCategoryName(agency.category.name);
        setAgencyAvatar(agency?.logo?.length > 0 ? agency?.logo : srcAgency);
        return agency.name;
      });
    }
  };

  const handleEditProfile = () => {
    setUserDisable(true);
    if (email.length > 2 && fullName.length > 2) {
      const user = {
        fullName: fullName,
        phone: phone,
        // email: email,
        // avatar: avatar,
        // address: address ?? "",
      };
      dispatch(updateUser(user))
        .then({ unwrapResult })
        .catch((err) => {
          console.log(err);
        });
      toast.success("Đã cập nhật thông tin của bạn");
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      console.log("Error!");
    }
  };
  const handleUpdateAgency = async () => {
    setAgencyDisable(true);
    if (agencyName.length > 2 && description.length > 2) {
      const data = {
        name: agencyName,
        categoryId: categoryId,
        description: description,
      };
      try {
        const res = await vnfixerAPI.updateAgency(currentUser.agencyId, data);
        console.log(res);
        if (res.status == 200) {
          toast.success("Đã cập nhật thông tin của bạn");
          getAgencyOwner();
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
        console.log("Error!");
      }
    } else {
      toast.error("Vui lòng nhập đủ độ dài tối thiểu là 2 ký tự");
    }
  };

  return (
    <>
      {logged && agency && currentUser?.agencyRole == "MANAGER" && (
        <>
          <div
            className={`${
              currentUser?.agencyRole == "MANAGER"
                ? "bg-loginOwner"
                : "bg-login"
            }`}
          ></div>
          <div className="p-3 lg:p-10">
            <div className="bg-white opacity-90 shadow-xl relative w-full md:w-2/3 mx-auto px-6 py-16 lg:p-10 rounded-xl flex flex-col sm:flex-row sm:items-start items-center  flex-wrap gap-1 sm:gap-0 min-h-[60vh]">
              <div className="text-white flex flex-col w-1/4 sm:pr-2">
                <div className="mx-auto text-center">
                  <Image
                    width={150}
                    height={0}
                    src={agencyAvatar}
                    alt="Generic placeholder"
                    className="img-fluid img-thumbnail mt-4 mb-2 rounded-xl"
                  />
                  <div>
                    <button
                      type="button"
                      disabled={agencyDisable}
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
                    <FaBuilding className="text-2xl text-blue-500 pr-2"></FaBuilding>
                    <b className="text-2xl">Thông Tin Đại lý</b>
                  </div>
                  <div className="">
                    <div className="w-full">
                      <b>Tên đại lý</b>
                      <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md bg-[#e1f8fd63] flex flex-row items-center lg:w-2/3 w-full">
                        <input
                          className={
                            " bg-transparent ml-5 w-full focus-visible:outline-none focus-visible:border-b-2"
                          }
                          type={"text"}
                          name={"fullName"}
                          onChange={(e) => {
                            setAgencyName(e.target.value);
                          }}
                          value={agencyName}
                          disabled={agencyDisable}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <b>Mô tả</b>
                    <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md bg-[#e1f8fd63] flex flex-row items-center lg:w-2/3 w-full">
                      <textarea
                        id="message"
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
                        placeholder="Write your thoughts here..."
                        value={description}
                        disabled={agencyDisable}
                      />
                    </div>
                  </div>
                  <div className="py-2">
                    <b>Dịch vụ cung cấp</b>
                    <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md bg-[#e1f8fd63] flex flex-row items-center lg:w-2/3 w-full">
                      {agencyDisable ? (
                        <input
                          className={
                            "bg-transparent ml-5 w-full focus-visible:outline-none focus-visible:border-b-2"
                          }
                          type={"text"}
                          name={"categoryName"}
                          value={categoryName}
                          disabled
                        ></input>
                      ) : (
                        <div className="dropdown inline-block relative w-full">
                          <button className="bg-white shadow-2xl text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center w-full">
                            <span className="mr-1">{categoryName}</span>
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                            </svg>
                          </button>
                          <ul className="dropdown-menu absolute hidden rounded-lg text-gray-700 pt-1 z-10 shadow-lg w-full scrollbar overflow-y-scroll overscroll-x-none">
                            {categories &&
                              categories.map((category, index) => (
                                <li
                                  onClick={() =>
                                    setCategoryId(() => {
                                      setCategoryName(category.name);
                                      return category.categoryId;
                                    })
                                  }
                                  key={index}
                                  className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                                >
                                  {category.name}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="py-2">
                    <b>Sô lượng chi nhánh</b>
                    <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md bg-[#e1f8fd63] flex flex-row items-center lg:w-2/3 w-full">
                      <FaMapMarkerAlt></FaMapMarkerAlt>
                      <div
                        className={
                          "bg-transparent ml-5 w-full focus-visible:outline-none focus-visible:border-b-2"
                        }
                      >
                        {agency?.branches?.length + " Chi Nhánh"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-10 justify-end absolute bottom-2 right-5">
                {agencyDisable ? (
                  <button
                    type="button"
                    className={`bg-black rounded-xl text-sm text-white px-4 py-3`}
                    data-mdb-ripple-color="dark"
                    onClick={() => setAgencyDisable(false)}
                  >
                    Chỉnh sửa
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className={`text-sm rounded-xl text-black bg-white px-4 py-3 border border-red-500`}
                      data-mdb-ripple-color="dark"
                      onClick={handleAgencyCancel}
                    >
                      Huỷ
                    </button>
                    <button
                      type="button"
                      className="bg-[#00aeff] text-sm rounded-xl text-white px-4 py-3"
                      data-mdb-ripple-color="dark"
                      onClick={handleUpdateAgency}
                    >
                      Cập nhật
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {logged && (
        <>
          <Toaster position="top-center" />
          <div className="p-3 lg:p-10">
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
                      disabled={userDisable}
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
                    <b className="text-2xl">Thông Tin Người Dùng</b>
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
                          disabled={userDisable}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <b>Email</b>
                    <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md bg-[#e1f8fd63] flex flex-row items-center lg:w-2/3 w-full">
                      <FaAt></FaAt>
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
                        disabled={userDisable}
                      ></input>
                    </div>
                  </div>
                  <div className="py-2">
                    <b>Số điện thoại</b>
                    <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md bg-[#e1f8fd63] flex flex-row items-center lg:w-2/3 w-full">
                      <FaPhoneAlt></FaPhoneAlt>
                      <input
                        className={
                          "bg-transparent ml-5 w-full focus-visible:outline-none focus-visible:border-b-2"
                        }
                        type={"number"}
                        name={"phone"}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        value={phone}
                        disabled={userDisable}
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
                        disabled={userDisable}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-10 justify-end absolute bottom-2 right-5">
                {/* <button
                  type="button"
                  className={`bg-black rounded-xl text-sm text-white px-4 py-3`}
                  data-mdb-ripple-color="dark"
                  onClick={() => setShowChangePassword(true)}
                >
                  Đổi mật khẩu
                </button> */}
                {userDisable ? (
                  <button
                    type="button"
                    className={`bg-black rounded-xl text-sm text-white px-4 py-3`}
                    data-mdb-ripple-color="dark"
                    onClick={() => setUserDisable(false)}
                  >
                    Chỉnh sửa
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className={`text-sm rounded-xl text-black bg-white px-4 py-3 border border-red-500`}
                      data-mdb-ripple-color="dark"
                      onClick={handleUserCancel}
                    >
                      Huỷ
                    </button>
                    <button
                      type="button"
                      className="bg-[#00aeff] text-sm rounded-xl text-white px-4 py-3"
                      data-mdb-ripple-color="dark"
                      onClick={() => handleEditProfile()}
                    >
                      Lưu
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
        </>
      )}
    </>
  );
}

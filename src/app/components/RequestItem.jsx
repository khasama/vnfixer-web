"use client";
import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import ReactTimeAgo from "react-time-ago";
import Button from "./Button";
import { requestStaffStatus } from "../constants";
import { FaBuilding, FaUser } from "react-icons/fa6";
import { getCategories } from "../redux/reducers/category";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { categoriesSelector } from "../redux/selectors";

const RequestItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const categories = useSelector(categoriesSelector);
  const dispatch = useDispatch();

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

  const getStatusColor = (status) => {
    if (status === "CANCEL") {
      return "bg-red-500";
    } else if (status === "ACCEPT") {
      return "bg-blue-500";
    } else if (status === "PENDING") {
      return "bg-yellow-500";
    } else if (status === "DONE") {
      return "bg-green-500";
    } else if (status === "PICKED" || status === "PAID") {
      return "bg-violet-500";
    }
  };

  const DetailRequest = () => {
    return (
      <div
        id="select-modal"
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          !showModal && "hidden"
        }`}
      >
        <div className="relative p-4 w-2/3 max-h-full">
          {/* Modal content */}
          <div className="relative bg-gray-100 rounded-lg shadow ">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900">
                Chi tiết yêu cầu
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="select-modal"
              >
                <svg
                  className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-3">
              <span className="font-semibold flex gap-2 items-center pb-2">
                <FaUser className="text-blue-400" size={15}></FaUser>Khách hàng
              </span>
              <div
                htmlFor="job-1"
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg mb-3"
              >
                <div className="block pr-2">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Khách hàng</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerName}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Email</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerEmail}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Tỉnh/Thành</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.city}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Số điện thoại</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerPhone}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small> Dịch vụ</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {categories &&
                      categories?.filter(
                        (item) => item.id === props?.category?.id
                      )[0]?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-3 px-3">
              <span className="font-semibold flex gap-2 items-center pb-2">
                <FaBuilding className="text-orange-400" size={15}></FaBuilding>
                Đại lý
              </span>
              <div
                htmlFor="job-1"
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg mb-3"
              >
                <div className="block pr-2">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Người nhận</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerEmail?.pickerId}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Chi nhánh</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.branch?.city}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small> Ngày nhận</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.updatedAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 py-2 bg-white shadow-md w-full rounded-md flex flex-col md:flex-row items-center gap-2 flex-wrap">
      {showModal && <DetailRequest></DetailRequest>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full lg:w-6/12">
        <div className="">
          <span className="md:text-sm text-xs">Tiêu đề:</span>
          <b className="md:text-sm text-xs"> {props.title}</b>
        </div>
        <div className="">
          <span className="md:text-sm text-xs">Tên khách hàng</span>
          <b className="md:text-sm text-xs"> {props.customerName}</b>
        </div>
        <div className="">
          <span className="md:text-sm text-xs">Thành phố:</span>
          <b className="md:text-sm text-xs"> {props.city}</b>
        </div>
        <div className="">
          <span className="md:text-sm text-xs">Ngày dự kiến: </span>
          <b className="md:text-sm text-xs">
            {typeof props?.expectDate == "object"
              ? props?.expectDate?.map((item, index) => (
                  <span key={index}>
                    {item} {props?.expectDate?.length > 1 && " | "}
                  </span>
                ))
              : props?.expectDate}
          </b>
        </div>
      </div>
      <div className="md:w-5/12 w-full flex gap-2">
        <div className="w-1/3">
          <div
            className={`${getStatusColor(
              props.status
            )} w-fit flex-1 px-2.5 py-1.5 rounded-lg font-semibold text-sm text-gray-800 md:text-sm`}
          >
            {props.status}
          </div>
        </div>
        <div className="w-2/3 shrink-0 hidden lg:block">
          {props?.branch?.agency?.name && props?.branch?.agency?.name + " - "}
          {props?.branch?.city && props?.branch?.city}
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-col-1 gap-2">
          <div className="flex items-center gap-5">
            <div
              className="flex items-center gap-1 text-blue-700 underline text-sm cursor-pointer"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <span>Thông tin chi tiết</span>
              <i
                aria-label="icon: caret-down"
                className="anticon anticon-caret-down"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className=""
                  data-icon="caret-down"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                </svg>
              </i>
            </div>
            {props.status == "PENDING" && (
              <>
                <div className="btn">
                  {typeof props?.onPick === "function" ? (
                    <Button
                      type={"button"}
                      className={"bg-lightBlue-400 py-1 px-3 rounded-lg"}
                      onClick={() => props.onPick(props.id)}
                    >
                      <b>Lấy</b>
                    </Button>
                  ) : (
                    <Button
                      type={"button"}
                      className={""}
                      onClick={() => alert("oke")}
                    >
                      <FaPencilAlt></FaPencilAlt>
                    </Button>
                  )}
                </div>
                <div className="btn">
                  {typeof props?.onPick === "function" ? (
                    <Button
                      type={"button"}
                      className={"text-gray-600 cursor-pointer text-xs"}
                      onClick={() => alert("oke")}
                      disabled={props.status != "PENDING" ? false : true}
                    >
                      Từ chối
                    </Button>
                  ) : (
                    <Button
                      type={"button"}
                      className={""}
                      onClick={() => alert("oke")}
                      disabled={props.status != "PENDING" ? false : true}
                    >
                      <small className="text-gray-600">Huỷ</small>
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-end gap-5 text-xs">
            <ReactTimeAgo date={Date.parse(props.createdAt)} locale="EN-US" />
          </div>
        </div>
      </div>
    </div>
  );
};
export const RequestItemStaff = (props) => {
  const [showModal, setShowModal] = useState(false);
  const categories = useSelector(categoriesSelector);
  const dispatch = useDispatch();

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
  const getStatusColor = (status) => {
    if (status === "CANCEL") {
      return "bg-red-500";
    } else if (status === "ACCEPT") {
      return "bg-blue-500";
    } else if (status === "PENDING") {
      return "bg-yellow-500";
    } else if (status === "DONE") {
      return "bg-green-500";
    } else if (status === "PICKED") {
      return "bg-violet-500";
    }
  };
  const DetailRequest = () => {
    return (
      <div
        id="select-modal"
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          !showModal && "hidden"
        }`}
      >
        <div className="relative p-4 w-2/3 max-h-full">
          {/* Modal content */}
          <div className="relative bg-gray-100 rounded-lg shadow ">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900">
                Chi tiết yêu cầu
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="select-modal"
              >
                <svg
                  className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-3">
              <span className="font-semibold flex gap-2 items-center pb-2">
                <FaUser className="text-blue-400" size={15}></FaUser>Khách hàng
              </span>
              <div
                htmlFor="job-1"
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg mb-3"
              >
                <div className="block pr-2">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Khách hàng</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerEmail}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Email</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerEmail}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Tỉnh/Thành</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.city}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Số điện thoại</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerPhone}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small> Dịch vụ</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {categories &&
                      categories?.filter(
                        (item) => item.id === props?.category?.id
                      )[0]?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-3 px-3">
              <span className="font-semibold flex gap-2 items-center pb-2">
                <FaBuilding className="text-orange-400" size={15}></FaBuilding>
                Đại lý
              </span>
              <div
                htmlFor="job-1"
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg mb-3"
              >
                <div className="block pr-2">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Người nhận</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerEmail?.pickerId}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Chi nhánh</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.branch?.city}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small> Ngày nhận</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.updatedAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="px-4 py-2 bg-white shadow-md w-full rounded-md flex flex-col md:flex-row items-center gap-2 flex-wrap">
      {showModal && <DetailRequest></DetailRequest>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full lg:w-6/12">
        <div className="">
          <span className="md:text-sm text-xs">Tiêu đề:</span>
          <b className="md:text-sm text-xs"> {props.title}</b>
        </div>
        <div className="">
          <span className="md:text-sm text-xs">Tên khách hàng</span>
          <b className="md:text-sm text-xs"> {props.customerName}</b>
        </div>
        <div className="">
          <span className="md:text-sm text-xs">Thành phố:</span>
          <b className="md:text-sm text-xs"> {props.city}</b>
        </div>
        <div className="">
          <span className="md:text-sm text-xs">Ngày dự kiến: </span>
          <b className="md:text-sm text-xs">
            {typeof props?.expectDate == "object"
              ? props?.expectDate?.map((item, index) => (
                  <span key={index}>
                    {item} {props?.expectDate?.length > 1 && " | "}
                  </span>
                ))
              : props?.expectDate}
          </b>
        </div>
      </div>
      <div className="md:w-5/12 w-full flex gap-2">
        <div className="w-1/3">
          <div
            className={`${getStatusColor(
              props.status
            )} w-fit flex-1 px-2.5 py-1.5 rounded-lg font-semibold text-sm text-gray-800 md:text-sm`}
          >
            {props.status}
          </div>
        </div>
        <div className="w-2/3 shrink-0 hidden lg:block">
          {props?.branch?.agency?.name && props?.branch?.agency?.name + " - "}
          {props?.branch?.city && props?.branch?.city}
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-col-1 gap-2">
          <div className="flex items-center gap-5">
            <div
              className="flex items-center gap-1 text-blue-700 underline text-sm cursor-pointer"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <span>Thông tin chi tiết</span>
              <i
                aria-label="icon: caret-down"
                className="anticon anticon-caret-down"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className=""
                  data-icon="caret-down"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                </svg>
              </i>
            </div>
            {props.status == "PICKED" && (
              <>
                <div className="btn">
                  {typeof props?.onPick === "function" && (
                    <Button
                      type={"button"}
                      className={"bg-lightBlue-400 py-1 px-3 rounded-lg"}
                      onClick={() => props.onPick(props.id)}
                    >
                      <b>Lấy</b>
                    </Button>
                  )}
                </div>
              </>
            )}
            {typeof props?.onChangeStatus === "function" && (
              <div className="w-fit my-3">
                <div className="dropdown inline-block relative w-full">
                  <button className="bg-white shadow-2xl text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center w-full">
                    <span className="mr-1">Đổi trạng thái</span>
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                    </svg>
                  </button>
                  <ul className="dropdown-menu absolute hidden rounded-lg text-gray-700 pt-1 z-10 shadow-lg w-full scrollbar overflow-y-scroll overscroll-x-none">
                    {requestStaffStatus?.map((item, index) => (
                      <li
                        onClick={() => props.onChangeStatus(props.id, item)}
                        key={index}
                        className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-5 text-xs">
            <ReactTimeAgo date={Date.parse(props.createdAt)} locale="EN-US" />
          </div>
        </div>
      </div>
    </div>
  );
};
export const RequestItemManager = (props) => {
  const [showModal, setShowModal] = useState(false);
  const categories = useSelector(categoriesSelector);
  const dispatch = useDispatch();

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
  const getStatusColor = (status) => {
    if (status === "CANCEL") {
      return "bg-red-500";
    } else if (status === "ACCEPT") {
      return "bg-blue-500";
    } else if (status === "PENDING") {
      return "bg-yellow-500";
    } else if (status === "DONE") {
      return "bg-green-500";
    } else if (status === "PICKED") {
      return "bg-violet-500";
    }
  };
  const DetailRequest = () => {
    return (
      <div
        id="select-modal"
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          !showModal && "hidden"
        }`}
      >
        <div className="relative p-4 w-2/3 max-h-full">
          {/* Modal content */}
          <div className="relative bg-gray-100 rounded-lg shadow ">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900">
                Chi tiết yêu cầu
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="select-modal"
              >
                <svg
                  className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-3">
              <span className="font-semibold flex gap-2 items-center pb-2">
                <FaUser className="text-blue-400" size={15}></FaUser>Khách hàng
              </span>

              <div
                htmlFor="job-1"
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg mb-3"
              >
                <div className="block pr-2">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Khách hàng</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerEmail}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Email</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerEmail}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Tỉnh/Thành</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.city}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Số điện thoại</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerPhone}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small> Dịch vụ</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {categories &&
                      categories?.filter(
                        (item) => item.id === props?.category?.id
                      )[0]?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-3 px-3">
              <span className="font-semibold flex gap-2 items-center pb-2">
                <FaBuilding className="text-orange-400" size={15}></FaBuilding>
                Đại lý
              </span>
              <div
                htmlFor="job-1"
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg mb-3"
              >
                <div className="block pr-2">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Người nhận</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.customerEmail?.pickerId}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Chi nhánh</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.branch?.city}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small> Ngày nhận</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {props?.updatedAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="px-4 py-2 bg-white shadow-md w-full rounded-md flex flex-col md:flex-row items-center gap-2 flex-wrap">
      {showModal && <DetailRequest></DetailRequest>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full lg:w-6/12">
        <div className="">
          <span className="md:text-sm text-xs">Tiêu đề:</span>
          <b className="md:text-sm text-xs"> {props.title}</b>
        </div>
        <div className="">
          <span className="md:text-sm text-xs">Tên khách hàng</span>
          <b className="md:text-sm text-xs"> {props.customerName}</b>
        </div>
        <div className="">
          <span className="md:text-sm text-xs">Thành phố:</span>
          <b className="md:text-sm text-xs"> {props.city}</b>
        </div>
        <div className="">
          <span className="md:text-sm text-xs">Ngày dự kiến: </span>
          <b className="md:text-sm text-xs">
            {typeof props?.expectDate == "object"
              ? props?.expectDate?.map((item, index) => (
                  <span key={index}>
                    {item} {props?.expectDate?.length > 1 && " | "}
                  </span>
                ))
              : props?.expectDate}
          </b>
        </div>
      </div>
      <div className="md:w-5/12 w-full flex gap-2">
        <div className="w-1/3">
          <div
            className={`${getStatusColor(
              props.status
            )} w-fit flex-1 px-2.5 py-1.5 rounded-lg font-semibold text-sm text-gray-800 md:text-sm`}
          >
            {props.status}
          </div>
        </div>
        <div className="w-2/3 shrink-0 hidden lg:block text-sm">
          {props?.branch?.agency?.name && props?.branch?.agency?.name + " - "}
          {props?.branch?.city && "Chi Nhánh: " + props?.branch?.city}
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-col-1 gap-2">
          <div className="flex items-center gap-5">
            <div
              className="flex items-center gap-1 text-blue-700 underline text-sm cursor-pointer"
              onClick={() => setShowModal(!showModal)}
            >
              <span>Thông tin chi tiết</span>
              <i
                aria-label="icon: caret-down"
                className="anticon anticon-caret-down"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className=""
                  data-icon="caret-down"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                </svg>
              </i>
            </div>
            {props.status == "PENDING" && (
              <>
                <div className="btn">
                  {typeof props?.onPick === "function" ? (
                    <Button
                      type={"button"}
                      className={"bg-lightBlue-400 py-1 px-3 rounded-lg"}
                      onClick={() => props.onPick(props.id)}
                    >
                      <b>Lấy</b>
                    </Button>
                  ) : (
                    <Button
                      type={"button"}
                      className={""}
                      onClick={() => alert("oke")}
                    >
                      <FaPencilAlt></FaPencilAlt>
                    </Button>
                  )}
                </div>
                <div className="btn">
                  {typeof props?.onPick === "function" ? (
                    <Button
                      type={"button"}
                      className={"text-gray-600 cursor-pointer text-xs"}
                      onClick={() => alert("oke")}
                      disabled={props.status != "PENDING" ? false : true}
                    >
                      Từ chối
                    </Button>
                  ) : (
                    <Button
                      type={"button"}
                      className={""}
                      onClick={() => alert("oke")}
                      disabled={props.status != "PENDING" ? false : true}
                    >
                      <small className="text-gray-600">Huỷ</small>
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-end gap-5 text-xs">
            <ReactTimeAgo date={Date.parse(props.createdAt)} locale="EN-US" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;

"use client";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import ReactTimeAgo from "react-time-ago";
import Button from "./Button";
import { requestStaffStatus } from "../constants";

const RequestItem = (props) => {
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
  return (
    <div className="px-4 py-2 bg-white shadow-md w-full rounded-md flex flex-col md:flex-row items-center gap-2 flex-wrap">
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
            <div className="flex items-center gap-1 text-blue-700 underline text-sm">
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
  return (
    <div className="px-4 py-2 bg-white shadow-md w-full rounded-md flex flex-col md:flex-row items-center gap-2 flex-wrap">
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
            <div className="flex items-center gap-1 text-blue-700 underline text-sm">
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
  return (
    <div className="px-4 py-2 bg-white shadow-md w-full rounded-md flex flex-col md:flex-row items-center gap-2 flex-wrap">
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
            <div className="flex items-center gap-1 text-blue-700 underline text-sm">
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

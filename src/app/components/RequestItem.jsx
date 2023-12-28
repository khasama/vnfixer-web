"use client";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import ReactTimeAgo from "react-time-ago";
import Button from "./Button";
import { FaMinus } from "react-icons/fa6";

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
    <div className="px-4 py-2 bg-white shadow-md w-full rounded-md flex flex-col md:flex-row items-center gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full lg:w-5/12">
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
            {props?.expectDate?.map((item, index) => (
              <span key={index}>
                {item} {props?.expectDate?.length > 1 && " | "}
              </span>
            ))}
          </b>
        </div>
      </div>
      <div className="md:w-4/12 w-full flex gap-2">
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
      <div className="lg:w-3/12 w-full">
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

"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector } from "@/app/redux/selectors";
import FilterSide from "@/app/components/FilterSide";
import { getCategories } from "@/app/redux/reducers/category";
import { unwrapResult } from "@reduxjs/toolkit";
import vnfixerAPI from "../api/vnfixerApi";
import RequestItem from "./RequestItem";
import toast, { Toaster } from "react-hot-toast";
import {
  FaAt,
  FaBuilding,
  FaCircleUser,
  FaHandHoldingHand,
  FaLocationDot,
  FaMobileScreen,
  FaPersonMilitaryRifle,
} from "react-icons/fa6";
import Image from "next/image";
import ReactTimeAgo from "react-time-ago";

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    const getAllCategory = () => {
      dispatch(getCategories())
        .then(unwrapResult)
        .catch((err) => {
          alert(err.message);
        });
    };
    getAllCategory();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedCheckbox(id === selectedCheckbox ? null : id);
  };

  const handleChangeCity = (city) => {
    setCity(city);
  };
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-wrap w-full">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row w-full"
          role="tablist"
        >
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 1
                  ? "text-white bg-blue-600"
                  : "text-blue-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              <b>
                <i className="fas fa-space-shuttle text-base mr-1"></i> Yêu cầu
              </b>
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 2
                  ? "text-white bg-blue-600"
                  : "text-blue-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              <b>
                <i className="fas fa-cog text-base mr-1"></i> Nhân sự
              </b>
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 3
                  ? "text-white bg-blue-600"
                  : "text-blue-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(3);
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              <b>
                <i className="fas fa-briefcase text-base mr-1"></i> Chi nhánh
              </b>
            </a>
          </li>
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div
                className={openTab === 1 ? "flex gap-3 " : "hidden"}
                id="link1"
              >
                <FilterSide
                  onchangeCity={handleChangeCity}
                  onchangeCategory={handleCheckboxChange}
                  city={city}
                  selectedCheckbox={selectedCheckbox}
                  status={status}
                  onChangeStatus={setStatus}
                ></FilterSide>
                <RequestTab
                  city={city}
                  selectedCheckbox={selectedCheckbox}
                  status={status}
                ></RequestTab>
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <StaffTab></StaffTab>
              </div>
              <div
                className={openTab === 3 ? "flex gap-3" : "hidden"}
                id="link3"
              >
                <BranchTab
                  city={city}
                  selectedCheckbox={selectedCheckbox}
                  status={status}
                ></BranchTab>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RequestTab = (props) => {
  const [requests, setRequests] = useState();
  const getManagerReq = async () => {
    const data = {
      limit: "10",
      page: "1",
      category: props.selectedCheckbox,
      city: props.city,
      status: props.status,
    };
    const res = await vnfixerAPI.getRequestManager(data);
    if (res.status == 200) {
      setRequests(res?.data?.data?.entries);
    }
  };

  useEffect(() => {
    getManagerReq();
  }, [props]);

  const handlePickRequest = async (id) => {
    const res = await vnfixerAPI.pickRequestManager(id);

    if (res.status == 200) {
      getManagerReq();
      toast.success("Đã nhận yêu cầu");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 max-h-[100vh] overflow-auto scrollbar">
      {requests?.map((request) => (
        <RequestItem
          key={request.id}
          id={request.id}
          title={request.title}
          description={request.description}
          city={request.city}
          expectDate={request.expectDate}
          createdAt={request.createdAt}
          status={request.status}
          customerName={request.customerName}
          category={request.category}
          branch={request.branch}
          onPick={handlePickRequest}
        ></RequestItem>
      ))}
    </div>
  );
};
const BranchTab = () => {
  const [branches, setBranches] = useState();
  const currentUser = useSelector(currentUserSelector);
  const getManagerReq = async () => {
    const res = await vnfixerAPI.getBranches(currentUser.agencyId);
    if (res.status == 200) {
      setBranches(res?.data?.data?.branches);
    }
  };

  useEffect(() => {
    getManagerReq();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePickRequest = async (id) => {
    const res = await vnfixerAPI.pickRequestManager(id);

    if (res.status == 200) {
      getManagerReq();
      toast.success("Đã nhận yêu cầu");
    }
  };

  return (
    <div className="w-full grid grid-cols-3 gap-3 max-h-[100vh] overflow-auto scrollbar">
      {branches?.map((branch) => (
        <div
          className="rounded-md shadow-lg p-4 hover:shadow-md flex flex-row"
          key={branch.id}
        >
          <div className="w-2/3">
            <p className="text-lg flex items-center gap-2 flex-row">
              <FaBuilding className="text-[#4694EF]" />
              {branch.city}
            </p>
            <p className="text-lg flex items-center gap-2 flex-row">
              <FaLocationDot className="text-[#4694EF]" />
              {branch.address}
            </p>
          </div>
          <div className="w-1/3">
            <button
              className="bg-[#FFD333] hover:bg-[#ac9132] text-black font-bold py-3 px-8 rounded"
              onClick={() => alert(branch.id, branch.city)}
            >
              Cập nhật
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
const StaffTab = () => {
  const [staffs, setStaffs] = useState();
  const currentUser = useSelector(currentUserSelector);
  const getManagerReq = async () => {
    const res = await vnfixerAPI.getStaffs(currentUser.agencyId);
    if (res.status == 200) {
      setStaffs(res?.data?.data);
    }
  };

  useEffect(() => {
    getManagerReq();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async (id, role) => {
    if (role != "MANAGER") {
      const res = await vnfixerAPI.removeStaff(id);
      if (res.status == 200) {
        getManagerReq();
        toast.success("Đã xoá nhân viên");
      }
    } else {
      toast.error("Bạn không thể xoá chủ đại lý");
    }
  };

  return (
    <ul className="grid md:grid-cols-4 gap-x-2 m-5">
      {staffs?.map((staff) => (
        <li key={staff.id} className="shadow-lg rounded-md px-3 py-2">
          <div className="w-full flex flex-col md:flex-row max-h-[100vh] overflow-auto scrollbar">
            <Image
              loading="lazy"
              src={
                staff?.imageUrl?.length > 0
                  ? staff.imageUrl
                  : "/images/staff.png"
              }
              alt={staff.agencyRole}
              width={0}
              height={0}
              sizes="20vw"
              style={{ width: "20%", height: "auto", margin: "auto" }}
            ></Image>
            <div className="text-[#484848] rounded-b-xl mt-3 px-5 pt-2 pb-5">
              <ul>
                <li className="text-sm font-semibold mb-2 flex flex-row items-center gap-3">
                  <FaAt className="text-gray-500"></FaAt> {staff.email}
                </li>
                <li className="text-sm font-semibold mb-2 flex flex-row items-center gap-3">
                  <FaCircleUser className="text-gray-500"></FaCircleUser>
                  {staff.fullName}
                </li>
                <li className="text-sm font-semibold mb-2 flex flex-row items-center gap-3">
                  <FaMobileScreen className="text-gray-500"></FaMobileScreen>
                  {staff.phone}
                </li>
                <li className="text-sm font-semibold mb-2 flex flex-row items-center gap-3">
                  <FaPersonMilitaryRifle className="text-gray-500"></FaPersonMilitaryRifle>
                  {staff.agencyRole}
                </li>
                <li className="text-sm font-semibold mb-2 flex flex-row items-center gap-3">
                  <FaHandHoldingHand className="text-gray-500"></FaHandHoldingHand>
                  <ReactTimeAgo
                    date={Date.parse(staff.createdAt)}
                    locale="EN-US"
                  />
                </li>
                <li className="flex flex-row items-center justify-end">
                  <button
                    type="button"
                    alt="Remove"
                    className="text-[#ff0040be] text-sm font-semibold rounded-md px-3 py-2 border border-[#ff0040be]"
                    onClick={() => handleRemove(staff.id, staff.agencyRole)}
                  >
                    Xoá
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;

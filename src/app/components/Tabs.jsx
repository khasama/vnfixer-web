"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector } from "@/app/redux/selectors";
import FilterSide from "@/app/components/FilterSide";
import { getCategories } from "@/app/redux/reducers/category";
import { unwrapResult } from "@reduxjs/toolkit";
import vnfixerAPI from "../api/vnfixerApi";
import { RequestItemManager } from "./RequestItem";
import toast, { Toaster } from "react-hot-toast";
import {
  FaAt,
  FaBuilding,
  FaCheck,
  FaCircleUser,
  FaHandHoldingHand,
  FaLocationDot,
  FaMagnifyingGlass,
  FaMobileScreen,
  FaPersonMilitaryRifle,
  FaPlus,
} from "react-icons/fa6";
import Image from "next/image";
import ReactTimeAgo from "react-time-ago";
import Button from "./Button";
import { cities } from "../constants";

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
        <RequestItemManager
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
        ></RequestItemManager>
      ))}
    </div>
  );
};
const BranchTab = () => {
  const [branches, setBranches] = useState();
  const currentUser = useSelector(currentUserSelector);
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const [branchId, setBranchId] = useState("");
  const [agencyId, setAgencyId] = useState("");
  const [address, setAddress] = useState("");
  const [action, setAction] = useState(false);
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

  const handleUpdate = async () => {
    const data = {
      agencyId: agencyId,
      address: address,
      city: city,
    };
    const res = await vnfixerAPI.updateBranch(branchId, data);
    if (res.status == 200) {
      getManagerReq();
      toast.success("Đã cập nhật");
      setShowModal(false);
    }
  };

  const handleBranchUpdate = (id, address, city, agencyId) => {
    setBranchId(() => {
      setShowModal(!showModal);
      setAddress(address);
      setCity(city);
      setAgencyId(agencyId);
      return id;
    });
  };
  const handleShowCreateBranch = () => {
    setShowModal(() => {
      setAction(!action);
      return !showModal;
    });
  };
  const handleCreate = async () => {
    const data = {
      city: city,
      address: address,
      agencyId: agencyId,
    };
    const res = await vnfixerAPI.createBranch(data);
    if (res.status == 201) {
      getManagerReq();
      toast.success("Đã tạo chi nhánh");
      setShowModal(false);
    }
  };

  useEffect(() => {
    setAgencyId(() => {
      setAddress("");
      setCity("");
      return branches && branches[0].agencyId;
    });
  }, [action]);

  return (
    <div className="flex flex-col">
      <div>
        <Button
          className="px-3 py-2 rounded-md bg-sky-400 mx-5 text-white flex items-center gap-3"
          type={"button"}
          alt={"Thêm nhân viên"}
          onClick={() => handleShowCreateBranch()}
        >
          <FaPlus></FaPlus> Thêm Chi Nhánh
        </Button>
      </div>
      <div className="w-full grid grid-cols-3 gap-3 max-h-[100vh] overflow-auto scrollbar">
        {branches?.map((branch) => (
          <div
            className="rounded-md shadow-lg p-4 hover:shadow-md flex flex-row"
            key={branch.id}
          >
            <div className="w-2/3 flex flex-col gap-3">
              <p className="text-lg flex items-center gap-2 flex-row">
                <FaBuilding className="text-[#4694EF]" />
                {branch.city}
              </p>
              <p className="text-lg flex items-start gap-2 flex-row">
                <FaLocationDot className="text-[#4694EF]" />
                {branch.address}
              </p>
            </div>
            <div className="w-1/3 flex items-center gap-2">
              <button
                className="bg-[#FFD333] hover:bg-[#ac9132] text-black font-bold py-2 px-3 rounded"
                onClick={() =>
                  handleBranchUpdate(
                    branch.id,
                    branch.address,
                    branch.city,
                    branch.agencyId
                  )
                }
              >
                Cập nhật
              </button>
              <button
                type="button"
                alt="Remove"
                className="text-[#ff0040be] text-sm font-semibold rounded-md px-3 py-2 border border-[#ff0040be]"
                onClick={() => alert(branch.id)}
              >
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-3xl p-4 mx-auto bg-white rounded-md shadow-lg max-h-[80vh] overflow-auto scrollbar">
              <p className="font-semibold text-lg py-2 px-4">
                {action ? "Tạo mới chi nhánh" : "Cập nhật chi nhánh"}
              </p>
              <div className="dropdown inline-block relative w-full">
                <button className="bg-white shadow-2xl text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center w-full">
                  <span className="mr-1">
                    {city?.length > 0 ? city : "Tỉnh thành"}
                  </span>
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                  </svg>
                </button>
                <ul className="dropdown-menu absolute hidden rounded-lg text-gray-700 pt-1 z-10 shadow-lg w-full scrollbar overflow-y-scroll overscroll-x-none">
                  {cities.map((city, index) => (
                    <li
                      onClick={() => setCity(city)}
                      key={index}
                      className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Địa chỉ
                </label>
                <textarea
                  id="message"
                  rows={4}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
                  placeholder="Write your thoughts here..."
                  value={address}
                />
              </div>
              <div className="flex items-center justify-center py-3">
                {action ? (
                  <Button
                    onClick={() => handleCreate()}
                    className="bg-lightBlue-400 px-4 py-3 rounded-md text-white font-semibold"
                  >
                    Tạo
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUpdate()}
                    className="bg-lightBlue-400 px-4 py-3 rounded-md text-white font-semibold"
                  >
                    Cập nhật
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
const StaffTab = () => {
  const [staffs, setStaffs] = useState();
  const [invite, setInvite] = useState();
  const [showModal, setShowModal] = useState(false);
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

  const handleShowInvite = () => {
    setShowModal(() => {
      setInvite(staffs);
      return !showModal;
    });
  };
  const handleShowInvited = () => {
    setShowModal(() => {
      setInvite(staffs);
      return !showModal;
    });
  };

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
  const handleCancelInvite = async (id) => {
    alert(id);
    // const res = await vnfixerAPI.cancelInvite(id);
    // if (res.status == 200) {
    //   getManagerReq();
    //   toast.success("Đã huỷ lời mời");
    // }
  };
  const handleInvite = async (id) => {
    alert(id);
    // const res = await vnfixerAPI.cancelInvite(id);
    // if (res.status == 200) {
    //   getManagerReq();
    //   toast.success("Đã huỷ lời mời");
    // }
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <Button
          className="px-3 py-2 rounded-md bg-sky-400 mx-5 text-white flex items-center gap-3"
          type={"button"}
          alt={"Mời nhân viên"}
          onClick={() => handleShowInvite(!showModal)}
        >
          <FaPlus></FaPlus> Thêm nhân viên
        </Button>
        <Button
          className="px-3 py-2 rounded-md bg-green-400 mx-5 text-white flex items-center gap-3"
          type={"button"}
          alt={"Mời nhân viên"}
          onClick={() => handleShowInvited(!showModal)}
        >
          <FaCheck></FaCheck> Đã mời
        </Button>
      </div>
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
      {showModal ? (
        <>
          <Invite
            staffs={staffs}
            onInvite={handleInvite}
            setShowModal={setShowModal}
          ></Invite>
        </>
      ) : null}
    </>
  );
};

const Invite = (props) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => props.setShowModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-3xl p-4 mx-auto bg-white rounded-md shadow-lg max-h-[80vh] overflow-auto scrollbar">
          <div className="bg-gray-200 rounded-full flex items-center px-2 w-full">
            <FaMagnifyingGlass size={20} />
            <input
              className="bg-transparent p-2 w-full focus:outline-none"
              type="text"
              placeholder="Nhập email"
            />
          </div>
          <div className="mt-3 flex items-center justify-center">
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <ul>
                {props.staffs?.map((customer) => (
                  <li
                    key={customer.id}
                    className="shadow-lg rounded-md px-3 py-2"
                  >
                    <div className="w-full flex flex-col md:flex-row max-h-[100vh] overflow-auto scrollbar">
                      <div className="w-1/4 flex justify-center items-center">
                        <Image
                          loading="lazy"
                          src={
                            customer?.imageUrl?.length > 0
                              ? customer.imageUrl
                              : "/images/staff.png"
                          }
                          alt={customer.agencyRole}
                          width={0}
                          height={0}
                          sizes="20vw"
                          style={{
                            width: "50%",
                            height: "auto",
                            margin: "auto",
                          }}
                        ></Image>
                      </div>
                      <div className="text-[#484848] rounded-b-xl mt-3 px-5 pt-2 pb-5 w-2/4">
                        <ul>
                          <li className="text-sm font-semibold mb-2 flex flex-row items-center gap-3">
                            <FaAt className="text-gray-500"></FaAt>{" "}
                            {customer.email}
                          </li>
                          <li className="text-sm font-semibold mb-2 flex flex-row items-center gap-3">
                            <FaCircleUser className="text-gray-500"></FaCircleUser>
                            {customer.fullName}
                          </li>
                          <li className="text-sm font-semibold mb-2 flex flex-row items-center gap-3">
                            <FaMobileScreen className="text-gray-500"></FaMobileScreen>
                            {customer.phone}
                          </li>
                        </ul>
                      </div>
                      <div className="w-1/4 flex gap-3 items-center justify-center">
                        {typeof props.onInvite == "function" ? (
                          <button
                            type="button"
                            alt="Add"
                            className="bg-lightBlue-500 text-sm font-semibold rounded-md px-3 py-2 border text-white"
                            onClick={() => props.onInvite(customer.id)}
                          >
                            Mời
                          </button>
                        ) : (
                          <button
                            type="button"
                            alt="Remove"
                            className="text-[#ff0040be] text-sm font-semibold rounded-md px-3 py-2 border border-[#ff0040be]"
                            onClick={() => props.onCancelInvite(customer.id)}
                          >
                            Huỷ
                          </button>
                        )}
                        {/* <button
                        type="button"
                        alt="Remove"
                        className="text-[#ff0040be] text-sm font-semibold rounded-md px-3 py-2 border border-[#ff0040be]"
                        onClick={() => handleCancelInvite(customer.id)}
                      >
                        Huỷ
                      </button> */}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;

"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector } from "@/app/redux/selectors";
import { getCategories } from "@/app/redux/reducers/category";
import { unwrapResult } from "@reduxjs/toolkit";
import vnfixerAPI from "../api/vnfixerApi";
import { RequestItemManager } from "./RequestItem";
import toast, { Toaster } from "react-hot-toast";
import {
  FaAt,
  FaBuilding,
  FaCircleNodes,
  FaCircleNotch,
  FaCircleUser,
  FaHandHoldingHand,
  FaMagnifyingGlass,
  FaMobileScreen,
  FaPersonMilitaryRifle,
  FaPlus,
} from "react-icons/fa6";
import Image from "next/image";
import ReactTimeAgo from "react-time-ago";
import Button from "./Button";
import { agencyRole, cityDistrict } from "../constants";
import { debounce } from "lodash";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FilterSideManage from "./FilterSideManage";

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);
  const currentUser = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const [city, setCity] = useState(
    currentUser?.city?.length > 0 ? currentUser?.city : ""
  );
  const [selectedCheckbox, setSelectedCheckbox] = useState(
    currentUser?.categoryId > 0 ? currentUser?.categoryId : null
  );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                className={
                  openTab === 1
                    ? "flex gap-3 md:flex-row flex-col md:items-start items-center"
                    : "hidden"
                }
                id="link1"
              >
                <FilterSideManage
                  onchangeCity={handleChangeCity}
                  onchangeCategory={handleCheckboxChange}
                  city={city}
                  selectedCheckbox={selectedCheckbox}
                  status={status}
                  onChangeStatus={setStatus}
                  disabled={true}
                ></FilterSideManage>
                <RequestTab
                  city={city}
                  selectedCheckbox={selectedCheckbox}
                  branchId={currentUser.branchId}
                  status={status}
                ></RequestTab>
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <StaffTab></StaffTab>
              </div>
              <div
                className={
                  openTab === 3
                    ? "flex gap-3 justify-center items-center flex-wrap"
                    : "hidden"
                }
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
  const [forBranch, setForBranch] = useState(false);

  const getManagerReq = async () => {
    setForBranch(false);
    let data = {
      limit: "10",
      page: "1",
      category: props.selectedCheckbox,
      city: props.city,
      status: props.status,
    };
    if (props?.branchId) {
      data.branchId = props.branchId;
    }
    const res = await vnfixerAPI.getRequestManager(data);
    if (res.status == 200) {
      setRequests(res?.data?.data?.entries);
    }
  };
  const getManagerReq4Branch = async () => {
    setForBranch(true);
    let data = {
      limit: "10",
      page: "1",
      category: props.selectedCheckbox,
      city: props.city,
      status: props.status,
    };
    if (props?.branchId) {
      data.branchId = props.branchId;
    }
    const res = await vnfixerAPI.getRequestManagerForBranch(data);
    if (res.status == 200) {
      setRequests(res?.data?.data?.entries);
    }
  };

  useEffect(() => {
    if (forBranch) {
      getManagerReq4Branch();
    } else {
      getManagerReq();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, forBranch]);

  const handlePickRequest = async (id) => {
    const res = await vnfixerAPI.pickRequestManager(id);
    if (res.status == 200) {
      getManagerReq();
      toast.success("Đã nhận yêu cầu");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 items-center">
        <Button
          className="px-3 py-2 rounded-md bg-sky-400 mx-5 text-white flex items-center gap-3"
          type={"button"}
          alt={"Đang chờ"}
          onClick={() => getManagerReq()}
        >
          <FaCircleNotch></FaCircleNotch> Đang chờ
        </Button>
        <Button
          className="px-3 py-2 rounded-md bg-green-400 mx-5 text-white flex items-center gap-3"
          type={"button"}
          alt={"Chi nhánh"}
          onClick={() => getManagerReq4Branch()}
        >
          <FaCircleNodes></FaCircleNodes> Chi Nhánh
        </Button>
      </div>
      <div className="p-4 flex items-center gap-5">
        {forBranch ? <b>Yêu cầu của chi nhánh</b> : <b>Yêu cầu đang chờ</b>}
        <small> {` (${requests?.length} Yêu cầu)`}</small>
      </div>
      <div className="w-full flex flex-col gap-5 max-h-[100vh] overflow-auto scrollbar">
        {requests?.map((request) => (
          <RequestItemManager
            key={request.id}
            id={request.id}
            title={request.description}
            description={request.description}
            city={request.city}
            expectDate={request.expectDate}
            createdAt={request.createdAt}
            status={request.status}
            customerName={request.customerName}
            customerEmail={request.customerEmail}
            customerPhone={request.customerPhone}
            category={request.category}
            branch={request.branch}
            onPick={handlePickRequest}
          ></RequestItemManager>
        ))}
      </div>
    </div>
  );
};
const BranchTab = () => {
  const [branches, setBranches] = useState();
  const currentUser = useSelector(currentUserSelector);
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
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
      district: district,
      city: city,
    };
    const res = await vnfixerAPI.updateBranch(branchId, data);
    if (res.status == 200) {
      getManagerReq();
      toast.success("Đã cập nhật");
      setShowModal(false);
    }
  };

  const handleBranchUpdate = (id, address, city, district, agencyId) => {
    setBranchId(() => {
      setShowModal(!showModal);
      setAddress(address);
      setCity(city);
      setDistrict(district);
      setAgencyId(agencyId);
      setAction(true);
      return id;
    });
  };
  const handleShowCreateBranch = () => {
    setShowModal(() => {
      setAction(false);
      return !showModal;
    });
  };
  const handleCreate = async () => {
    const data = {
      city: city,
      address: address,
      district: district,
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
      setAddress("");
      setDistrict("");
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
      <div className="w-full grid md:grid-cols-2 gap-3 max-h-[100vh] overflow-auto scrollbar">
        {branches?.map((branch) => (
          <div
            className="rounded-md shadow-lg p-4 hover:shadow-md flex md:flex-row flex-col gap-2"
            key={branch.id}
          >
            <div className="md:w-2/3 w-full flex flex-col gap-3">
              <p className="text-lg flex items-center gap-2 flex-row">
                <FaBuilding className="text-[#4694EF]" />
                Thành phố: {branch.city}
              </p>
              <p className="text-lg flex items-start flex-row">
                Quận/Huyện: {branch.district}
              </p>
              <p className="text-lg flex items-start flex-row">
                Địa chỉ: {branch.address}
              </p>
            </div>
            <div className="md:w-1/3 w-full flex items-center gap-2">
              <button
                className="bg-[#FFD333] hover:bg-[#ac9132] text-black text-sx md:text-sm font-bold py-2 px-3 rounded"
                onClick={() =>
                  handleBranchUpdate(
                    branch.id,
                    branch.address,
                    branch.city,
                    branch.district,
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
              <div className="dropdown relative w-full flex md:flex-row flex-col gap-3">
                <FormControl fullWidth variant="standard" className={`w-1/2`}>
                  <InputLabel id="demo-simple-select-standard-label" required>
                    Tỉnh/Thành
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    label="city"
                  >
                    {cityDistrict &&
                      cityDistrict.map((city, index) => {
                        return (
                          <MenuItem key={index} value={city.city}>
                            {city.city}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="standard" className={`w-1/2`}>
                  <InputLabel id="demo-simple-select-standard-label" required>
                    Quận/Huyện
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    label="district"
                  >
                    {city &&
                      cityDistrict
                        ?.find((cityMap) => cityMap.city == city)
                        ?.districts?.map((district, index) => {
                          return (
                            <MenuItem key={index} value={district}>
                              {district}
                            </MenuItem>
                          );
                        })}
                  </Select>
                </FormControl>
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
                  placeholder="Địa chỉ chi nhánh..."
                  value={address}
                />
              </div>
              <div className="flex items-center justify-center py-3">
                {action ? (
                  <Button
                    onClick={() => handleUpdate()}
                    className="bg-lightBlue-400 px-4 py-3 rounded-md text-white font-semibold"
                  >
                    Cập nhật
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleCreate()}
                    className="bg-lightBlue-400 px-4 py-3 rounded-md text-white font-semibold"
                  >
                    Tạo
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
        {/* <Button
          className="px-3 py-2 rounded-md bg-green-400 mx-5 text-white flex items-center gap-3"
          type={"button"}
          alt={"Mời nhân viên"}
          onClick={() => handleShowInvited(!showModal)}
        >
          <FaCheck></FaCheck> Đã mời
        </Button> */}
      </div>
      <ul className="grid md:grid-cols-3 sm:grid-cols-2 grid-rows-1 gap-x-2 m-5">
        {staffs?.map((staff) => (
          <li key={staff.id} className="shadow-lg rounded-md px-3 py-2">
            <div className="w-full flex flex-col md:flex-row max-h-[100vh] flex-wrap overflow-auto scrollbar">
              <Image
                loading="lazy"
                src={
                  staff?.imageUrl?.length > 0
                    ? staff.imageUrl
                    : "/images/staff.png"
                }
                alt={staff.agencyRole ?? "title"}
                unoptimized={staff?.imageUrl?.length > 0}
                width={0}
                height={0}
                sizes="20vw"
                style={{ width: "20%", height: "auto", margin: "auto" }}
              ></Image>
              <div className="text-[#484848] rounded-b-xl mt-3 p-3">
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
          <Invite staffs={staffs} setShowModal={setShowModal}></Invite>
        </>
      ) : null}
    </>
  );
};

const Invite = (props) => {
  const [customers, setCustomers] = useState();
  const currentUser = useSelector(currentUserSelector);
  const [role, setRole] = useState("STAFF");
  const [branchId, setBranchId] = useState(currentUser?.branchId);
  const [branch, setBranch] = useState(currentUser?.city);
  const [branches, setBranches] = useState();

  const getManagerReq = async () => {
    const res = await vnfixerAPI.getBranches(currentUser.agencyId);
    if (res.status == 200) {
      setBranches(() => {
        return res?.data?.data?.branches;
      });
    }
  };

  useEffect(() => {
    getManagerReq();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (branches) {
      setBranchId(branches?.find((item) => item.city == branch)?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFindCustomer = useCallback(
    debounce(async (email) => {
      if (email?.length > 2) {
        const res = await vnfixerAPI.getCustomer(email);
        if (res.status == 200) {
          const filtered = res?.data?.data.filter(
            (user) => !user?.agencyRole > 0
          );
          setCustomers(filtered);
        }
      }
    }, 1000),
    []
  );

  const handleCancelInvite = async (id) => {
    alert(id);
    // const res = await vnfixerAPI.cancelInvite(id);
    // if (res.status == 200) {
    //   getManagerReq();
    //   toast.success("Đã huỷ lời mời");
    // }
  };
  const handleInvite = async (id) => {
    const data = {
      userId: id,
      role,
      branchId,
    };
    try {
      const res = await vnfixerAPI.inviteCustomer(data);
      if (res.status == 200) {
        toast.success("Đã gửi lời mời");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

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
              onChange={(e) => handleFindCustomer(e.target.value)}
            />
          </div>
          <div className="mt-3 flex items-center justify-center">
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <ul>
                {customers &&
                  customers?.map((customer) => (
                    <li
                      key={customer.id}
                      className="shadow-lg rounded-md px-3 py-2"
                    >
                      <div className="w-full flex md:flex-row flex-col justify-center items-center  max-h-[100vh] overflow-auto scrollbar">
                        <div className="w-1/4 flex justify-center items-center">
                          <Image
                            loading="lazy"
                            src={
                              customer?.imageUrl?.length > 0
                                ? customer.imageUrl
                                : "/images/staff.png"
                            }
                            alt={customer.agencyRole ?? "title"}
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
                        <div className="text-[#484848] rounded-b-xl mt-3 px-4 py-3 w-full">
                          <ul>
                            <li className="text-sm font-semibold mb-2 flex flex-row items-center gap-3">
                              <FaAt className="text-gray-500"></FaAt>
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
                        <div className="w-full flex gap-3 items-center justify-center">
                          <FormControl variant="standard" className="w-10/12">
                            <InputLabel id="demo-simple-select-standard-label">
                              Vai trò
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              label="role"
                            >
                              {agencyRole.map((role, index) => (
                                <MenuItem key={index} value={role}>
                                  {role}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl variant="standard" className="w-10/12">
                            <InputLabel id="demo-simple-select-standard-label">
                              Chi nhánh
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              value={branch}
                              onChange={(e) => setBranch(e.target.value)}
                              label="branchId"
                            >
                              {branches &&
                                branches?.map((branch, index) => (
                                  <MenuItem key={index} value={branch.city}>
                                    {branch.city}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                          <button
                            type="button"
                            alt="Add"
                            className="bg-lightBlue-500 text-sm font-semibold rounded-md px-3 py-2 border text-white"
                            onClick={() => handleInvite(customer.id)}
                          >
                            Mời
                          </button>

                          {/* <button
                              type="button"
                              alt="Remove"
                              className="text-[#ff0040be] text-sm font-semibold rounded-md px-3 py-2 border border-[#ff0040be]"
                              onClick={() => props.onCancelInvite(customer.id)}
                            >
                              Huỷ
                            </button> */}
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

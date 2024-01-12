"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { currentUserSelector, isLoggedInSelector } from "@/app/redux/selectors";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import vnfixerAPI from "@/app/api/vnfixerApi";
import { RequestItemStaff } from "@/app/components/RequestItem";
import toast, { Toaster } from "react-hot-toast";
import { FaRotateRight } from "react-icons/fa6";
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

export const metadata = {
  title: "VNFIXER | Request Management",
};

const Manager = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);
  const [open, setOpen] = useState(0);
  const [alwaysOpen, setAlwaysOpen] = useState(true);
  const [inf, setInf] = useState([]);

  const getMyRequest = async () => {
    try {
      const takeRes = await vnfixerAPI.getTakeRequest();
      if (takeRes.status == 200) {
        setInf(takeRes?.data?.data[0]?.branch);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyRequest();
  }, []);

  useEffect(() => {
    setUser(currentUser);
  }, [isLoggedIn, currentUser]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="w-full flex flex-row gap-5 max-h-[100vh] overflow-auto scrollbar">
      <Toaster position="top-center" />
      <div className="flex flex-col my-3 gap-3">
        <div className="bg-gray-50 p-5 min-h-[50vh] rounded-lg shadow-lg w-[20em]">
          <Image
            loading="lazy"
            src={
              inf?.agency?.logo?.length > 0
                ? inf.agency.logo
                : "/images/logo.png"
            }
            alt={"Agency logo"}
            unoptimized={inf?.agency?.logo?.length > 0}
            width={0}
            height={0}
            sizes="20vw"
            style={{ width: "50%", height: "auto", margin: "auto" }}
          ></Image>
          <ul className="flex flex-col justify-center-center gap-5">
            <li className="flex flex-row gap-4 items-start">
              <FaBuilding className="text-[#4694EF]"></FaBuilding>

              <p>{user?.agencyName}</p>
            </li>
            <li className="flex flex-row gap-4 items-center">
              <FaLocationDot className="text-[#4694EF]"></FaLocationDot>
              <p>{user?.city}</p>
            </li>
            <li className="flex flex-row gap-4 items-center">
              <p>{user?.branchAddress}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <div className="p-4 text-black flex flex-col gap-4">
          <Accordion
            open={alwaysOpen}
            className="border border-violet-300 p-3 rounded-md shadow-md"
          >
            <AccordionHeader onClick={handleAlwaysOpen}>
              ĐANG CHỜ
            </AccordionHeader>
            <AccordionBody>
              <Picked></Picked>
            </AccordionBody>
          </Accordion>
          <Accordion
            className="border border-sky-300 p-3 rounded-md shadow-md"
            open={open === 1}
          >
            <AccordionHeader onClick={() => handleOpen(1)}>
              ĐÃ CHẤP NHẬP
            </AccordionHeader>
            <AccordionBody>
              <Taken></Taken>
            </AccordionBody>
          </Accordion>
          <Accordion
            className="border border-green-300 p-3 rounded-md shadow-md"
            open={open === 2}
          >
            <AccordionHeader onClick={() => handleOpen(2)}>
              ĐÃ HOÀN THÀNH
            </AccordionHeader>
            <AccordionBody>
              <Done></Done>
            </AccordionBody>
          </Accordion>
          <Accordion
            className="border border-red-300 p-3 rounded-md shadow-md"
            open={open === 3}
          >
            <AccordionHeader onClick={() => handleOpen(3)}>
              ĐÃ HUỶ
            </AccordionHeader>
            <AccordionBody>
              <Cancel></Cancel>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

const Picked = () => {
  const [takeReq, setTakeReq] = useState([]);
  const getMyRequest = async () => {
    try {
      const takeRes = await vnfixerAPI.getTakeRequest();
      if (takeRes.status == 200) {
        setTakeReq(takeRes.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyRequest();
  }, []);

  const handlePickRequest = async (id) => {
    let res;
    try {
      const takenRes = await vnfixerAPI.getTakedRequest();
      if (takenRes.status == 200) {
        res = takenRes.data.data;
      }
    } catch (error) {
      console.log(error);
    }
    if (res == null) {
      const takedRequest = await vnfixerAPI.pickRequestStaff(id);
      if (takedRequest.status == 200) {
        getMyRequest();
        toast.success("Đã nhận yêu cầu");
      } else {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
      }
    } else {
      toast.error("Bạn phải hoàn thành yêu cầu đã nhận trước");
    }
  };

  return (
    <>
      <button
        type="button"
        className="px-3 py-2 rounded-md bg-slate-400"
        onClick={getMyRequest}
      >
        <FaRotateRight className="text-white"></FaRotateRight>
      </button>
      <div className="w-full flex flex-col gap-3 max-h-[100vh] overflow-auto scrollbar">
        {takeReq?.length !== 0 ? (
          takeReq?.map((request) => (
            <RequestItemStaff
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
            ></RequestItemStaff>
          ))
        ) : (
          <p>Bạn có chưa yêu cầu nào</p>
        )}
      </div>
    </>
  );
};
const Taken = () => {
  const [takenReq, setTakenReq] = useState();
  const getMyRequest = async () => {
    try {
      const takenRes = await vnfixerAPI.getTakedRequest();
      if (takenRes.status == 200) {
        setTakenReq(takenRes.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyRequest();
  }, []);

  const handleChangeStatus = async (id, status) => {
    const statusRes = await vnfixerAPI.changeStatusRequest(id, status);
    if (statusRes.status == 200) {
      getMyRequest();
      toast.success("Đã cập nhật trạng thái");
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <>
      <button
        type="button"
        className="px-3 py-2 rounded-md bg-slate-400"
        onClick={getMyRequest}
      >
        <FaRotateRight className="text-white"></FaRotateRight>
      </button>
      <div className="w-full flex flex-col gap-3 max-h-[100vh] overflow-auto scrollbar">
        {takenReq && takenReq.length !== 0 ? (
          <RequestItemStaff
            key={takenReq.id}
            id={takenReq.id}
            title={takenReq.description}
            description={takenReq.description}
            city={takenReq.city}
            expectDate={takenReq.expectDate}
            createdAt={takenReq.createdAt}
            status={takenReq.status}
            customerName={request.customerName}
            customerEmail={request.customerEmail}
            customerPhone={request.customerPhone}
            category={takenReq.category}
            branch={takenReq.branch}
            onChangeStatus={handleChangeStatus}
          ></RequestItemStaff>
        ) : (
          <p>Bạn chưa nhận yêu cầu nào</p>
        )}
      </div>
    </>
  );
};
const Done = () => {
  const [doneReq, setDoneReq] = useState();
  const currentUser = useSelector(currentUserSelector);

  const getMyRequest = async () => {
    try {
      const data = {
        staffId: currentUser?.id,
        branchId: currentUser?.branchId,
        status: "DONE",
      };
      const doneRes = await vnfixerAPI.getActionRequest(data);
      if (doneRes.status == 200) {
        setDoneReq(doneRes.data?.data?.entries);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyRequest();
  }, []);

  return (
    <>
      <button
        type="button"
        className="px-3 py-2 rounded-md bg-slate-400"
        onClick={getMyRequest}
      >
        <FaRotateRight className="text-white"></FaRotateRight>
      </button>
      <div className="w-full flex flex-col gap-3 max-h-[100vh] overflow-auto scrollbar">
        {doneReq && doneReq.length !== 0 ? (
          doneReq?.map((request) => (
            <RequestItemStaff
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
            ></RequestItemStaff>
          ))
        ) : (
          <p>Bạn chưa hoàn thành yêu cầu nào</p>
        )}
      </div>
    </>
  );
};
const Cancel = () => {
  const [cancelReq, setCancelReq] = useState();
  const currentUser = useSelector(currentUserSelector);

  const getMyRequest = async () => {
    try {
      const data = {
        staffId: currentUser?.id,
        branchId: currentUser?.branchId,
        status: "CANCEL",
      };
      const cancelRes = await vnfixerAPI.getActionRequest(data);
      if (cancelRes.status == 200) {
        setCancelReq(cancelRes.data?.data?.entries);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyRequest();
  }, []);

  return (
    <>
      <button
        type="button"
        className="px-3 py-2 rounded-md bg-slate-400"
        onClick={getMyRequest}
      >
        <FaRotateRight className="text-white"></FaRotateRight>
      </button>
      <div className="w-full flex flex-col gap-3 max-h-[100vh] overflow-auto scrollbar">
        {cancelReq && cancelReq.length !== 0 ? (
          cancelReq?.map((request) => (
            <RequestItemStaff
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
            ></RequestItemStaff>
          ))
        ) : (
          <p>Bạn chưa huỷ yêu cầu nào</p>
        )}
      </div>
    </>
  );
};

export default Manager;

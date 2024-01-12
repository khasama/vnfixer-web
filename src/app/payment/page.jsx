"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  categoriesSelector,
  currentUserSelector,
  isLoggedInSelector,
} from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import vnfixerAPI from "../api/vnfixerApi";
import { getCategories } from "../redux/reducers/category";
import { unwrapResult } from "@reduxjs/toolkit";
import { FaBuilding, FaUser } from "react-icons/fa6";
import { SkeletonLine } from "../components/SkeletonLine";
import { useRouter } from "next/navigation";
import moment from "moment";
import Link from "next/link";

const Payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);
  const categories = useSelector(categoriesSelector);
  const [requests, setRequests] = useState();
  const [requestsId, setRequestsId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState();

  const returnUrl = useMemo(() => {
    if (typeof window === "undefined" || !window.location.origin) {
      return null;
    }
    const origin = window.location.origin;
    return `${origin}/payment/status`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser?.agencyRole != "MANAGER") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

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
          <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
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
                    {selected?.customerEmail}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Email</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {selected?.customerEmail}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Tỉnh/Thành</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {selected?.city}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Số điện thoại</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {selected?.customerPhone}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small> Dịch vụ</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {categories &&
                      categories?.filter(
                        (item) => item.id === selected?.categoryId
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
                    {selected?.customerEmail?.pickerId}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small>Chi nhánh</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {selected?.branch?.city}
                  </div>
                </div>
                <div className="block">
                  <div className="w-full text-gray-500 dark:text-gray-400">
                    <small> Ngày nhận</small>
                  </div>
                  <div className="w-full text-sm font-semibold">
                    {selected?.updatedAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    if (isLoggedIn) {
      try {
        const res = await vnfixerAPI.getAgencyPayment(currentUser?.agencyId);
        if (res.status == 200) {
          setRequests(() => {
            setRequestsId(res?.data?.data?.requests?.map((id) => id.id));
            return res?.data?.data;
          });
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } else {
      toast.error("Vui lòng đăng nhập để gửi yêu cầu!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  const handlePayment = async () => {
    if (requestsId?.length * 2000 > 10000) {
      if (requestsId && returnUrl) {
        const data = {
          requestIds: [...requestsId],
          returnUrl,
        };
        try {
          const res = await vnfixerAPI.postAgencyPayment(
            currentUser?.agencyId,
            data
          );
          if (res.status == 200 && res.data?.message == "success") {
            router.push(res.data?.data);
          }
        } catch (error) {
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
      }
    } else {
      toast.error("Bạn chưa đủ chi phí tối thiểu (10.000VND)!");
    }
  };
  useEffect(() => {
    currentUser?.agencyId && handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="container">
      <Toaster position="top-center" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="px-3 py-5 bg-[#3484e0] rounded-lg">
          <ol className="flex items-center " aria-label="Breadcrumb">
            <li className="inline-flex items-center">
              <Link
                className="flex items-start text-base text-white"
                href="/"
                shallow
              >
                <svg
                  className="flex-shrink-0 me-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Trang chủ
              </Link>
              <svg
                className="flex-shrink-0 mx-2 overflow-visible h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </li>
            <li className="inline-flex items-center text-base text-white">
              <p>Thông tin thanh toán</p>
              <svg
                className="flex-shrink-0 mx-2 overflow-visible h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </li>
          </ol>
        </div>
        {requests && requests?.requests?.length > 0 ? (
          <div className="p-3 rounded-lg bg-gray-50 px-10">
            <span className="font-bold text-2xl py-1 flex justify-center items-center">
              THÔNG TIN THANH TOÁN CHI PHÍ DỊCH VỤ
            </span>
            <span className="font-semibold py-1">
              VNFIXER kính gửi Quý khách hàng,
            </span>
            <br />
            <p className="font-semibold py-1">
              Chúng tôi xin gửi đến Quý khách hàng bản báo cáo về chi phí cần
              thanh toán trong tháng này. Dưới đây là tổng hợp các khoản phí
              liên quan đến dịch vụ.
            </p>
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
              {showModal && <DetailRequest></DetailRequest>}
              <div className="w-full flex gap-5 items-center justify-between">
                <div className="flex gap-5 items-center">
                  <p className="font-semibold">Tổng:</p>
                  <b>
                    {requestsId && (requestsId?.length * 2000).toLocaleString()}
                    VNĐ
                  </b>
                </div>
                <button
                  onClick={handlePayment}
                  className="px-3 py-2 bg-blue-500 rounded-md text-white font-semibold"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center px-5 py-10">
            <b className="font-bold md:text-2xl text-lg">
              Bạn đã thanh toán hoặc chưa có yêu cầu hoàn thành
            </b>
          </div>
        )}
        {requests ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên khách hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Thành phố
                </th>
                <th scope="col" className="px-6 py-3">
                  Thời gian
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="h-[30vh] overflow-auto">
              {requests &&
                requests?.requests?.map((request, index) => (
                  <tr key={request?.id}>
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <span>{index}</span>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {request?.customerName}
                        </div>
                        <div className="font-normal text-gray-500">
                          {request?.customerEmail}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{request?.city}</td>
                    <td className="px-6 py-4">
                      {moment(request?.updatedAt).format("HH:mm:ss DD-MM-YYYY")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />{" "}
                        {request?.status && "Hoàn thành"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setSelected(request);
                          }}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        >
                          Chi tiết
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonLine key={i}></SkeletonLine>
          ))
        )}
      </div>
    </div>
  );
};

export default Payment;

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { cookies } from "next/headers";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../redux/selectors";
import vnfixerAPI from "../api/vnfixerApi";
import RequestItem from "../components/RequestItem";

// const getRequest = async () => {
//   const cookieStore = cookies();
//   const token = cookieStore.get("access_token");
//   const data = await fetch("http://localhost:5000/api/requests/me", {
//     headers: {
//       Authorization: `Bearer ${token.value}`,
//     },
//     cache: "no-store",
//   });

//   const res = await data.json();
//   return res.data;
// };

const MyRequest = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const [requests, setRequests] = useState();

  useEffect(() => {
    if (isLoggedIn) {
      const getMyRequest = async () => {
        try {
          const response = await vnfixerAPI.getMyRequests();
          if (response.status == 200) {
            setRequests(response.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getMyRequest();
    } else if (!isLoggedIn) {
      setRequests();
    }
  }, [isLoggedIn]);

  return (
    <div className="container mx-auto">
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
          <li className="inline-flex items-center">
            <p className="flex items-start text-base text-white" href="/agency">
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
                <rect width={7} height={7} x={14} y={3} rx={1} />
                <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
              </svg>
              Yêu cầu của tôi
            </p>
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
      <div className="flex flex-col gap-3 items-center justify-center my-3 max-h-[100vh] overflow-auto scrollbar">
        {requests && requests?.length > 0 ? (
          requests?.map((request) => (
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
            ></RequestItem>
          ))
        ) : (
          <p className="text-lg font-bold"> Bạn chưa có yêu cầu nào!</p>
        )}
      </div>
    </div>
  );
};

export default MyRequest;

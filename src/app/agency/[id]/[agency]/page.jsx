"use client";
import vnfixerAPI from "@/app/api/vnfixerApi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { categoriesSelector } from "@/app/redux/selectors";
import Link from "next/link";
import { FaListUl, FaLocationDot, FaMinus } from "react-icons/fa6";
import CardAgency from "@/app/components/CardAgency";
import FormRequest from "@/app/components/FormRequest";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "VNFIXER | Agency",
};

const Agency = ({ params }) => {
  const [agency, setAgency] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [id4Request, setId4Request] = useState("");
  const [city, setCity] = useState("");
  const title = decodeURIComponent((params.agency + "").replace(/\+/g, "%20"));
  const STAR_NUMBER = 5;

  const handleShowForm = (id, city) => {
    setShowForm((prevShowForm) => {
      setId4Request(id);
      setCity(city);
      return !prevShowForm;
    });
  };

  useEffect(() => {
    const getAgency = async () => {
      if (params.id.length > 0) {
        try {
          const res = await vnfixerAPI.getAgency(params.id);
          if (res.status == 200) {
            setAgency(res.data.data);
          } else {
            console.log("Error!");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getAgency();
  }, [params]);

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" />
      <div className="px-3 py-5 bg-[#3484e0] rounded-lg">
        <ol className="flex items-center " aria-label="Breadcrumb">
          <li className="inline-flex items-center">
            <Link className="flex items-start text-base text-white" href="/">
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
            <Link
              className="flex items-start text-base text-white"
              href="/agency"
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
                <rect width={7} height={7} x={14} y={3} rx={1} />
                <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
              </svg>
              Dịch vụ
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
            <p className="flex items-start text-base text-white">{title}</p>
          </li>
        </ol>
      </div>
      <div className="flex my-3 gap-3">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row bg-[#f7fbff] rounded-lg shadow-xl p-5">
            <div className="w-5/12 mx-auto">
              <Image
                className="rounded-md"
                src={require("../../../../../public/images/header.jpg")}
                height={0}
                width={500}
                alt="Agency"
              />
            </div>
            <div className="content w-7/12">
              <h5 className="text-2xl font-semibold text-2 text-gray-700 py-5">
                {agency.name}
              </h5>
              <div className="flex pb-3 gap-3">
                <div className="flex items-center justify-start">
                  {Array.from({ length: STAR_NUMBER }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ms-1 ${
                        i == 4
                          ? "text-gray-300 dark:text-gray-500"
                          : "text-yellow-300"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-base underline text-[#73777a] cursor-pointer">
                  (5 đánh giá)
                </span>
              </div>
              <div className="flex flex-col gap-2 items-start text-lg pb-2 justify-start">
                <div className="flex flex-row">
                  <FaLocationDot className="text-[#4694EF]" />
                  <b className="text-base">Chi nhánh:</b>
                </div>
                <div className="flex flex-row gap-3">
                  {agency?.branches?.map((e) => (
                    <div key={e.id} className="py-1">
                      <p className="px-2 py-1 shadow-lg bg-blue-300 rounded-xl text-sm">
                        {e.city}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center text-lg">
                <FaListUl className="text-[#4694EF]" />
                <b className="text-base">Lĩnh vực:</b>
                {agency?.category?.name}
              </div>
              <div>
                <b className="text-base">Mô tả đại lý:</b>
                <br />
                <div className="relative p-1 md:p-3 flex-auto overflow-auto max-h-80 text-base py-2 scrollbar">
                  {agency.description}
                </div>
              </div>
            </div>
          </div>
          <div className="agency p-3">
            <h2 className="text-2xl font-bold">Chi nhánh của {title}</h2>
            <div className="grid grid-cols-3 gap-3">
              {agency?.branches?.map((branch) => (
                <div
                  className="rounded-md shadow-lg p-4 hover:shadow-md flex flex-row"
                  key={branch.id}
                >
                  <div className="w-2/3">
                    <p className="text-lg flex items-center gap-2 flex-row">
                      <FaLocationDot className="text-[#4694EF]" />
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
                      onClick={() => handleShowForm(branch.id, branch.city)}
                    >
                      Tạo yêu cầu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="position ">
        {showForm ? (
          <>
            <div className="fixed inset-0 z-10">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setShowForm(false)}
              ></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative flex flex-col items-center justify-center z-1 w-full p-4 mx-auto rounded-md">
                  <div className="flex w-4/5 mx-5 md:mx-0 xl:w-1/2 justify-end items-end">
                    <button
                      className="w-fit mt-2 p-2.5 bg-[#3d2b2b5c] rounded-md outline-none ring-red-600 text-[#8f8e8edd]"
                      onClick={() => setShowForm(false)}
                    >
                      <FaMinus></FaMinus>
                    </button>
                  </div>
                  <FormRequest
                    id={id4Request}
                    cityBy={city}
                    onSubmit={setShowForm}
                  ></FormRequest>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Agency;

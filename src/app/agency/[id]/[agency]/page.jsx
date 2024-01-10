"use client";
import vnfixerAPI from "@/app/api/vnfixerApi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { FaBuilding, FaListUl, FaLocationDot, FaMinus } from "react-icons/fa6";
import FormRequest from "@/app/components/FormRequest";
import { Toaster } from "react-hot-toast";
import { unwrapResult } from "@reduxjs/toolkit";
import { getCategories } from "@/app/redux/reducers/category";
import CardAgency from "@/app/components/CardAgency";
import { ImagePlacehoderSkeleton } from "@/app/components/Skeleton";

export const metadata = {
  title: "VNFIXER | Agency",
};

const Agency = ({ params }) => {
  const [agency, setAgency] = useState({});
  const [agencies, setAgencies] = useState({});
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [id4Request, setId4Request] = useState("");
  const [city, setCity] = useState("");
  const title = decodeURIComponent((params.agency + "").replace(/\+/g, "%20"));
  const STAR_NUMBER = 5;

  const getAgencies = async () => {
    try {
      const response = await vnfixerAPI.getAgencies(3, 1);
      if (response.status == 200) {
        setAgencies(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowForm = (id, city, district) => {
    setShowForm((prevShowForm) => {
      setId4Request(id);
      setCity(city);
      return !prevShowForm;
    });
  };

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
  useEffect(() => {
    getAgency();
    getAgencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

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

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" />
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
            <Link
              className="flex items-start text-base text-white"
              href="/agency"
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
            <div className="md:w-5/12 w-full flex justify-center items-center">
              <Image
                className="rounded-md mx-auto"
                src={
                  agency?.logo ??
                  require("../../../../../public/images/logo.png")
                }
                unoptimized={agency?.logo?.length > 0}
                height={0}
                width={250}
                alt="Agency"
              />
            </div>
            <div className="content md:w-7/12 w-full">
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
                <b className="text-base">Dịch vụ:</b>
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
            <h2 className="text-xl font-bold py-2">Chi nhánh của {title}</h2>
            <div className="md:grid md:grid-cols-3 grid-cols-1 gap-3 ">
              {agency?.branches
                ? agency?.branches?.map((branch) => (
                    <div
                      className="rounded-md shadow-lg p-4 hover:shadow-md flex md:flex-row flex-col gap-2"
                      key={branch.id}
                    >
                      <div className="md:w-2/3 w-full">
                        <p className="font-semibold flex items-center gap-2 flex-row">
                          <FaBuilding className="text-[#4694EF]" />
                          {branch?.city}
                        </p>
                        <p className="flex items-center gap-2 flex-row">
                          {branch?.district}
                        </p>
                        <p className="flex items-center gap-2 flex-row">
                          {branch?.address}
                        </p>
                      </div>
                      <div className="md:w-1/3 w-full">
                        <button
                          className="bg-[#FFD333] hover:bg-[#ac9132] text-black text-sm font-bold p-2 rounded"
                          onClick={() =>
                            handleShowForm(
                              branch?.id,
                              branch?.city,
                              branch?.district
                            )
                          }
                        >
                          Tạo yêu cầu
                        </button>
                      </div>
                    </div>
                  ))
                : Array.from({ length: 3 }).map((_, i) => (
                    <ImagePlacehoderSkeleton key={i}></ImagePlacehoderSkeleton>
                  ))}
            </div>
          </div>
          <div className="agency p-3">
            <h2 className="text-xl font-bold py-2">Gợi ý cho bạn</h2>
            <div className="md:grid md:grid-cols-3 grid-cols-1 gap-3 ">
              {agencies && agencies.entries
                ? agencies?.entries?.map((agency, index) => (
                    <div
                      className="rounded-md shadow-lg py-2 hover:shadow-md"
                      key={index}
                    >
                      <CardAgency
                        title={agency.name}
                        branches={agency.branches.length}
                        description={agency.description}
                        city={agency.category.name}
                        star={5}
                        imgUrl={agency.logo}
                        id={agency.id}
                      />
                    </div>
                  ))
                : Array.from({ length: 3 }).map((_, i) => (
                    <ImagePlacehoderSkeleton key={i}></ImagePlacehoderSkeleton>
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
                  <FormRequest
                    id={id4Request}
                    cityBy={city}
                    categoryId={agency?.category?.id}
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

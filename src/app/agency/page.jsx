"use client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesSelector } from "../redux/selectors";
import { getCategories } from "../redux/reducers/category";
import { unwrapResult } from "@reduxjs/toolkit";
import { cities } from "../constants";
import vnfixerAPI from "../api/vnfixerApi";
import CardAgency from "../components/CardAgency";
import Image from "next/image";
import spinner from "../../../public/images/Spin-1s-200px.svg";

export const metadata = {
  title: "VNFIXER | Agency",
};

const Agencies = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const [city, setCity] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [title, setTitle] = useState("");
  const [agencies, setAgencies] = useState();

  const handleCheckboxChange = (id) => {
    setSelectedCheckbox(id === selectedCheckbox ? null : id);
    const titleFiltered = categories?.filter((item) => item.id === id);
    setTitle(titleFiltered[0].name);
  };

  useEffect(() => {
    const getAllCategory = () => {
      dispatch(getCategories())
        .then(unwrapResult)
        .catch((err) => {
          alert(err.message);
        });
    };
    getAllCategory();
    const getAgencies = async () => {
      try {
        const response = await vnfixerAPI.getAgenciesBy();
        console.log(response.data.data);
        if (response.status == 200) {
          setAgencies(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAgencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (city.length > 0 || selectedCheckbox > 0) {
      const getAgencies = async () => {
        try {
          const response = await vnfixerAPI.getAgenciesBy(
            city.length > 0 ? city : "Tiền Giang",
            selectedCheckbox,
            10,
            1
          );
          console.log(response.data.data);
          if (response.status == 200) {
            setAgencies(response.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getAgencies();
    }
  }, [city, selectedCheckbox]);

  const handleChangeCity = (city) => {
    setCity(city);
  };

  return (
    <div className="container mx-auto">
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
        </ol>
      </div>
      <div className="flex my-3 gap-3">
        <div className="bg-white p-4 h-[90vh] rounded-lg shadow-lg w-[20em]">
          <div className="mb-4">
            <div className="flex flex-col">
              <b className="px-3 text-gray-700">1. Thiết bị</b>
              {categories &&
                categories.map((category, index) => (
                  <div key={index}>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center p-3 rounded-full cursor-pointer"
                        htmlFor="ripple-off"
                      >
                        <input
                          id={category.id}
                          checked={category.id === selectedCheckbox}
                          onChange={() => handleCheckboxChange(category.id)}
                          type="checkbox"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth={1}
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </label>
                      <label
                        className="mt-px font-light text-gray-700 cursor-pointer select-none"
                        htmlFor={category.id}
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <hr className="bg-warmGray-600 my-5" />
          <b className="px-3 text-gray-700">2. Tỉnh thành</b>
          <div className="w-full my-3">
            <div className="dropdown inline-block relative w-full">
              <button className="bg-white shadow-2xl text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center w-full">
                <span className="mr-1">
                  {city && city.length > 0 ? city : "Tỉnh thành"}
                </span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                </svg>
              </button>
              <ul className="dropdown-menu absolute hidden rounded-lg text-gray-700 pt-1 z-10 shadow-lg h-[300px] w-full scrollbar overflow-y-scroll overscroll-x-none">
                {cities.map((city, index) => (
                  <li
                    onClick={() => handleChangeCity(city)}
                    key={index}
                    className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="result flex flex-row gap-5 items-center">
            <p className="font-bold text-lg text-gray-600">
              {city.length > 0 || selectedCheckbox > 0
                ? "Kết quả tìm kiếm"
                : "Đại lý đề xuất"}
            </p>

            {selectedCheckbox > 0 ? (
              <p className="rounded-2xl bg-[#499cfbc2] px-3 py-2 text-white">
                Thiết bị:{title}
              </p>
            ) : (
              ""
            )}
            {city.length > 0 ? (
              <p className="rounded-2xl bg-[#499cfbc2] px-3 py-2 text-white">
                Thành phố:{city}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <div className="grid grid-cols-2 gap-3">
              {agencies && agencies.entries ? (
                agencies?.entries?.map((agency, index) => (
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
              ) : (
                <li className="w-full flex justify-center items-center">
                  <Image
                    width={0}
                    height={0}
                    priority
                    src={spinner}
                    alt="Follow us on Twitter"
                  />
                </li>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agencies;

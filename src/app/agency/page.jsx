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
import FilterSide from "../components/FilterSide";

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
        const response = await vnfixerAPI.getAgencies(6, 1);
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

  const handleCheckboxChange = (id) => {
    setSelectedCheckbox(id === selectedCheckbox ? null : id);
    const titleFiltered = categories?.filter((item) => item.id === id);
    setTitle(titleFiltered[0].name);
  };

  const handleChangeCity = (city) => {
    setCity(city);
  };

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
        </ol>
      </div>
      <div className="flex my-3 gap-3">
        <FilterSide
          onchangeCity={handleChangeCity}
          onchangeCategory={handleCheckboxChange}
          city={city}
          selectedCheckbox={selectedCheckbox}
        ></FilterSide>
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

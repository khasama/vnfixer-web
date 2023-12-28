"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { categoriesSelector } from "../redux/selectors";
import { cities, requestStatus } from "../constants";

const FilterSide = (props) => {
  const categories = useSelector(categoriesSelector);

  return (
    <div className="bg-white p-4 h-[90vh] rounded-lg shadow-lg w-[20em]">
      <div className="mb-4">
        <div className="flex flex-col">
          <b className="px-3 text-gray-700">1. Dịch vụ</b>
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
                      checked={category.id == props.selectedCheckbox}
                      onChange={() => props.onchangeCategory(category.id)}
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
      {props.status && (
        <>
          <hr className="bg-warmGray-600 my-5" />
          <b className="px-3 text-gray-700">2. Trạng thái</b>
          <div className="w-full my-3">
            <div className="dropdown inline-block relative w-full">
              <button className="bg-white shadow-2xl text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center w-full">
                <span className="mr-1">{props.status}</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                </svg>
              </button>
              <ul className="dropdown-menu absolute hidden rounded-lg text-gray-700 pt-1 z-10 shadow-lg h-[300px] w-full scrollbar overflow-y-scroll overscroll-x-none">
                {requestStatus.map((item, index) => (
                  <li
                    onClick={() => props.onChangeStatus(item)}
                    key={index}
                    className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      <hr className="bg-warmGray-600 my-5" />
      <b className="px-3 text-gray-700">3. Tỉnh thành</b>
      <div className="w-full my-3">
        <div className="dropdown inline-block relative w-full">
          <button className="bg-white shadow-2xl text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center w-full">
            <span className="mr-1">
              {props?.city?.length > 0 ? props.city : "Tỉnh thành"}
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
                onClick={() => props.onchangeCity(city)}
                key={index}
                className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterSide;

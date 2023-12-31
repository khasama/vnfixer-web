import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaListUl, FaLocationDot } from "react-icons/fa6";
import TippyWrap from "./Tippy";

const CardAgency = ({
  imgUrl,
  title,
  description,
  id,
  city,
  star,
  branches,
}) => {
  const STAR_NUMBER = 5;
  return (
    <Link className="flex flex-row" href={`/agency/${id}/${title}`} shallow>
      <Image
        className="w-2/5 h-auto m-auto pl-2"
        src={imgUrl ? imgUrl : require("../../../public/images/logo.png")}
        alt={title}
        width={0}
        height={0}
        sizes="100vw"
        loading="lazy"
      ></Image>
      <div className="w-3/5 flex flex-col gap-1.5 text-[#484848] rounded-b-xl mt-3 px-5 pt-2 pb-5">
        <h5 className="text-base font-semibold text-2">{title}</h5>
        <TippyWrap content={description} placement="bottom">
          <p className="text-[#73777a] text-sm text">{description}</p>
        </TippyWrap>
        <div className="flex items-center justify-start">
          {Array.from({ length: STAR_NUMBER }).map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ms-1 ${
                i == star
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
        <span className="text-xs text-[#73777a]">({star} đánh giá)</span>
        <div className="flex flex-row gap-2 items-center text-xs">
          <FaListUl className="text-[#4694EF]" />
          {city}
        </div>
        <div className="flex flex-row gap-2 items-center text-xs">
          <FaLocationDot className="text-[#4694EF]" />
          Có {branches} chi nhánh
        </div>
      </div>
    </Link>
  );
};

export default CardAgency;

import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import TippyWrap from "./Tippy";

const CardCategory = ({ imgUrl, title, description, gitUrl }) => {
  return (
    <>
      {/* <Link href={`/category/${gitUrl}`} shallow> */}
      <Image
        loading="lazy"
        src={imgUrl}
        unoptimized={imgUrl?.length > 0}
        alt={title}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "30%", height: "auto", margin: "auto" }}
      ></Image>
      <div className="text-[#484848] rounded-b-xl mt-3 px-5 pt-2 pb-5">
        <h5 className="text-base font-semibold mb-2 text">{title}</h5>
        <TippyWrap content={description} placement="bottom">
          <p className="text-[#73777a] text">{description}</p>
        </TippyWrap>
      </div>
      {/* </Link> */}
    </>
  );
};

export default CardCategory;

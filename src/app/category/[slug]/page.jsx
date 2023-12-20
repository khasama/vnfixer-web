"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Category = ({ params }) => {
  const router = useRouter();

  console.log(params.slug);

  return (
    <div>
      <div className="bg-header"></div>
      <h1 className="text-black">oke categorys</h1>
      <h1 className="text-black">oke categorys</h1>
      <h1 className="text-black">oke categorys</h1>
      <h1 className="text-black">oke categorys</h1>
      <h1 className="text-black">oke categorys</h1>
      <h1 className="text-black">oke categorys</h1>
      <h1 className="text-black">oke categorys</h1>
    </div>
  );
};

export default Category;

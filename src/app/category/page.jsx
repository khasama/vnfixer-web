import { useRouter } from "next/navigation";
import React from "react";

async function getData() {
  const res = await fetch("http://localhost:5000/api/agencies?limit=2&page=1");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Category = async ({ params }) => {
  const data = await getData();

  console.log(data.data);

  return (
    <>
      <div className="bg-header">
        <h3 className="absolute text-white left-5 top-10 text-xl font-bold">
          &#10148; CÁC DỊCH VỤ CUNG CẤP /
        </h3>
      </div>
      <div>
        <div>
          <h1 className="text-black">oke categorys</h1>
          <h1 className="text-black">oke categorys</h1>
          <h1 className="text-black">oke categorys</h1>
          <h1 className="text-black">oke categorys</h1>
          <h1 className="text-black">oke categorys</h1>
          <h1 className="text-black">oke categorys</h1>
          <h1 className="text-black">oke categorys</h1>
        </div>
      </div>
    </>
  );
};

export default Category;

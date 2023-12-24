import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="bg-login"></div>
      <div className="flex flex-col items-center z-10 mx-auto my-auto bg-white p-5 opacity-90 rounded-lg w-1/2">
        <h1 className="text-[120px] font-extrabold text-black">404</h1>
        <p className="text-2xl font-medium text-black mb-6">Page Not Found</p>
        <a
          href="/"
          className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out"
        >
          Go Home
        </a>
      </div>
    </>
  );
};

export default NotFound;

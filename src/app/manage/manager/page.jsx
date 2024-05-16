"use client";
import React, { useEffect, useState } from "react";
import Tabs from "../../components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { isLoggedInSelector } from "@/app/redux/selectors";
import { getCategories } from "@/app/redux/reducers/category";
import { unwrapResult } from "@reduxjs/toolkit";

export const metadata = {
  title: "VNFIXER | Request Management",
};

const Manager = () => {
  const router = useRouter();
  const [login, setLogin] = useState();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn && !login) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  useEffect(() => {
    setLogin(isLoggedIn);
  }, [isLoggedIn]);

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
    <div className="p-4 text-black flex flex-row">
      <Tabs></Tabs>
    </div>
  );
};

export default Manager;

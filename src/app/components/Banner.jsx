"use client";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { categoriesSelector, isLoggedInSelector } from "../redux/selectors";
import { unwrapResult } from "@reduxjs/toolkit";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { getCategories } from "../redux/reducers/category";
import { cities } from "../constants";
import vnfixerAPI from "../api/vnfixerApi";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormRequest from "./FormRequest";

const Banner = () => {
  const dispatch = useDispatch();

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
    <div className="min-h-[50vh]">
      <Toaster position="top-center" />
      <div className="bg-banner z-1 bg-center"></div>
      <div className="w-full  relative flex flex-col items-center justify-center translate-y-24 z-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="z-20 pt-10 col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-xl sm:text-2xl lg:text-4xl lg:leading-normal font-extrabold">
            <TypeAnimation
              sequence={[
                "VNFIXER xin chào!",
                1000,
                "Sửa chữa miễn phí nếu nhân viên không liên hệ.",
                1000,
                "Mọi thắc mắc vui lòng liên hệ 1900 4343.",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
        </motion.div>
        <FormRequest></FormRequest>
      </div>
    </div>
  );
};

export default Banner;

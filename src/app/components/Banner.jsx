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

const Banner = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = useSelector(categoriesSelector);
  const [province, setProvince] = useState("");
  const [device, setDevice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(dayjs());
  const isLoggedIn = useSelector(isLoggedInSelector);

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

  const clearData = () => {
    setProvince("");
    setDevice("");
    setTitle("");
    setDescription("");
    setFullName("");
    setEmail("");
    setIsValidEmail(true);
    setPhone("");
    setDate(dayjs());
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(value));
  };

  const handleChangeProvince = (event) => {
    setProvince(event.target.value);
    // dispatch(getDistricts(event.target.value))
    //   .then(unwrapResult)
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  };

  const handleChangeDevice = (event) => {
    setDevice(event.target.value);
    const titleFiltered = categories?.filter(
      (item) => item.id === event.target.value
    );
    setTitle(titleFiltered[0].name);
  };

  const handleSubmit = () => {
    if (isLoggedIn) {
      if (
        fullName.length > 0 &&
        province.length > 0 &&
        phone.length > 0 &&
        dayjs(date).format("YYYY-MM-DD").length > 0
      ) {
        const data = {
          description: description,
          location: province,
          expectDate: [dayjs(date).format("YYYY-MM-DD")],
          categoryId: 3,
          city: province,
          customerPhone: phone,
          customerName: fullName,
          customerEmail: email,
          title: title,
        };
        try {
          vnfixerAPI.sendRequest(data);
          clearData();
        } catch (error) {
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
          throw rejectWithValue(error);
        }
        toast.success("Yêu cầu của bạn đã được gửi đi");
      } else {
        toast.error("Vui lòng nhập đủ thông tin cần thiết!");
      }
    } else {
      toast.error("Vui lòng đăng nhập để gửi yêu cầu!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

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
        <div className="bg-white p-5 rounded-md w-4/5 mx-5 md:mx-0 xl xl:w-1/2 shadow-xl">
          <div className="grid sm:grid-cols-2 sm:gap-10 sm:flex-col grid-cols-1 ">
            <div className="flex gap-3 flex-col justify-start items-center flex-wrap w-full">
              <div className="flex flex-row justify-between items-center flex-wrap w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 transform rotate-45 text-[#EB5757]"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                    clipRule="evenodd"
                  />
                </svg>
                <TextField
                  required
                  fullWidth
                  id="standard-basic"
                  label="Họ và tên"
                  helperText=""
                  variant="standard"
                  className="w-10/12"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="flex flex-row justify-between gap-5 w-full">
                <div className="w-1/2">
                  <TextField
                    required
                    fullWidth
                    id="standard-basic"
                    label="Số điện thoại"
                    helperText=""
                    variant="standard"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <FormControl fullWidth variant="standard" className="w-1/2">
                  <InputLabel id="demo-simple-select-standard-label" required>
                    Tỉnh/Thành
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={province}
                    onChange={handleChangeProvince}
                    label="province"
                  >
                    {cities &&
                      cities.map((city, index) => {
                        return (
                          <MenuItem key={index} value={city}>
                            {city}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
              <FormControl className="w-full" variant="standard">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Ngày dự kiến"
                      value={date}
                      onChange={(e) => setDate(e)}
                      minDate={dayjs()}
                      sx={{
                        width: "100%",
                        padding: 0,
                        height: "100%",
                        overflow: "hidden",
                      }}
                      slotProps={{ textField: { variant: "standard" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
            </div>
            <div className="flex gap-3 flex-col justify-start items-center flex-wrap w-full">
              <div className="flex flex-row justify-between items-center flex-wrap w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 transform rotate-45 text-[#2877E5]"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                    clipRule="evenodd"
                  />
                </svg>
                <FormControl variant="standard" className="w-10/12">
                  <InputLabel id="demo-simple-select-standard-label">
                    Thiết bị
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={device}
                    onChange={(e) => handleChangeDevice(e)}
                    label="device"
                  >
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <MenuItem key={index} value={category.id}>
                            {category.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>

              <div className="flex flex-row justify-between gap-5 w-full">
                <TextField
                  className="w-1/2"
                  fullWidth
                  id="standard-basic"
                  value={email}
                  onChange={handleChangeEmail}
                  label="Email"
                  variant="standard"
                  error={!isValidEmail}
                  helperText={!isValidEmail && "Định dạng email không đúng"}
                />
                <TextField
                  className="w-1/2"
                  fullWidth
                  id="standard-basic"
                  label="Mô tả"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  helperText=""
                  variant="standard"
                />
              </div>
              <div className="flex flex-row justify-between pt-5">
                <button
                  onClick={handleSubmit}
                  className="bg-[#FFD333] hover:bg-[#ac9132] text-black font-bold py-3 px-10 rounded"
                >
                  Yêu cầu
                </button>
                {/* <LoadingButton className="py-3 px-10" loading hidden variant="outlined">
                  Submit
                </LoadingButton> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

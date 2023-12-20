"use client";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import Link from "next/link";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { districtsSelector, provincesSelector } from "../redux/selectors";
import { getDistricts, getProvinces } from "../redux/reducers/location";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

const devices = [
  {
    name: "Xe máy",
    value: "xemay",
  },
  {
    name: "Thiết bị văn phòng",
    value: "vanphong",
  },
  {
    name: "Đồ gia dụng",
    value: "giadung",
  },
  {
    name: "Hệ thống an ninh",
    value: "anninh",
  },
];

const Banner = ({ repo }) => {
  const provinces = useSelector(provincesSelector);
  const districts = useSelector(districtsSelector);
  const dispatch = useDispatch();
  const [province, setProvince] = useState("");
  const [device, setDevice] = useState("");
  const [district, setDistrict] = useState("");
  const router = useRouter();
  useEffect(() => {
    const getLocations = () => {
      dispatch(getProvinces())
        .then(unwrapResult)
        .catch((err) => {
          alert(err.message);
        });
    };
    getLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeProvince = (event) => {
    setProvince(event.target.value);
    dispatch(getDistricts(event.target.value))
      .then(unwrapResult)
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
  };

  const handleChangeDevice = (event) => {
    setDevice(event.target.value);
  };

  const handleFind = () => {
    if (province != "" || district != "" || device != "") {
      router.push({
        pathname: `/category/${device}`,
        query: { name: "Someone" },
      });
    }
  };

  province && console.log(province, device);

  return (
    <div className="min-h-[50vh]">
      {repo?.map((i, e) => i)}
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
                />
              </div>
              <TextField
                required
                fullWidth
                id="standard-basic"
                label="Số điện thoại"
                helperText=""
                variant="standard"
              />
              <div className="flex flex-row justify-between gap-5 w-full">
                <FormControl fullWidth variant="standard" className="w-1/2">
                  <InputLabel id="demo-simple-select-standard-label">
                    Tỉnh/Thành
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={province}
                    onChange={handleChangeProvince}
                    label="province"
                  >
                    {provinces &&
                      provinces.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.code}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl variant="standard" className="w-1/2">
                  <InputLabel id="demo-simple-select-standard-label">
                    Quận/Huyện
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={district}
                    onChange={handleChangeDistrict}
                    label="district"
                  >
                    {districts &&
                      districts.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.codename}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
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
                    onChange={handleChangeDevice}
                    label="device"
                  >
                    {devices &&
                      devices.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.value}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                {/* <TextField
                  required
                  fullWidth
                  id="standard-basic"
                  label="Thiết bị"
                  helperText=""
                  variant="standard"
                  className="w-10/12"
                /> */}
              </div>

              <TextField
                fullWidth
                id="standard-basic"
                label="Mô tả"
                helperText=""
                variant="standard"
              />
              <div className="flex flex-row justify-between pt-5">
                <button
                  onClick={handleFind}
                  className="bg-[#FFD333] hover:bg-[#ac9132] text-black font-bold py-3 px-10 rounded"
                >
                  Tìm kiếm
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

export async function getStaticProps() {
  const res = await fetch("https://provinces.open-api.vn/api/p/");
  const repo = await res.json();
  return { props: { repo } };
}

// export async function getProvinces() {
//   const res = await fetch("https://provinces.open-api.vn/api/p/", {
//     cache: "force-cache",
//   });
//   const repo = await res.json();
//   return { repo };
// }

// export default async function Banner() {
//   const province = await getProvinces();
//   console.log(province);
//   return <h1>oke</h1>;
// }

"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cityDistrict } from "../constants";
import {
  FaBuilding,
  FaLocationDot,
  FaMapLocationDot,
  FaUsers,
} from "react-icons/fa6";
import {
  categoriesSelector,
  currentUserSelector,
  isLoggedInSelector,
} from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/reducers/category";
import { unwrapResult } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import vnfixerAPI from "../api/vnfixerApi";
import { logout } from "../redux/reducers/auth";
import { useRouter } from "next/navigation";

const AgencyCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = useSelector(categoriesSelector);
  const [agencyName, setAgencyName] = useState("");
  const [checked, setChecked] = useState(false);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [agencyAddress, setAgencyAddress] = useState("");
  const [agencyDescription, setAgencyDescription] = useState("");
  const [agencyCategory, setAgencyCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const isLoggedIn = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);

  const handleChangeCategory = (event) => {
    setAgencyCategory(event.target.value);
    const titleFiltered = categories?.filter(
      (item) => item.id === event.target.value
    );
    setCategoryId(titleFiltered[0].id);
  };

  const clearData = () => {
    setAgencyName(() => {
      setCity("");
      setAgencyAddress("");
      setAgencyDescription("");
      setAgencyCategory("");
      setCategoryId("");
      return "";
    });
  };

  const handleCreateAgency = async () => {
    if (!currentUser?.agencyRole) {
      if (isLoggedIn) {
        if (
          agencyName.length > 0 &&
          agencyDescription.length > 0 &&
          agencyAddress.length > 0 &&
          district.length > 0 &&
          categoryId > 0 &&
          city?.length > 0
        ) {
          const data = {
            branch: {
              city: city,
              // district: district,
              address: agencyAddress,
            },
            name: agencyName,
            description: agencyDescription,
            categoryId: categoryId,
          };
          try {
            const res = await vnfixerAPI.createAgency(data);
            if (res.status == 201) {
              clearData();
              toast.success("Yêu cầu đã được gửi đi và bạn cần đăng nhập lại");
              dispatch(logout())
                .then(unwrapResult)
                .catch((err) => console.log(err));
              setTimeout(() => {
                router.push("/login");
              }, 1000);
            }
          } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
          }
        } else {
          toast.error("Vui lòng nhập đủ thông tin cần thiết!");
        }
      } else {
        toast.error("Vui lòng đăng nhập để gửi yêu cầu!");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } else {
      toast.error("Bạn không thể tạo đại lý trong khi đang ở một đại lý khác");
    }
  };

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
    <div>
      <Toaster position="bottom-center" />
      <div>
        <div className="pt-9 pb-7 vxr-banner-bg">
          <div className="container pr-lg-2">
            <div className="text-center">
              <h1 className="h1 h1-lg font-weight-bold pt-4 pb-5 text-light">
                Thương hiệu tiên phong trong gắn kết dịch vụ người dùng
              </h1>
              <div className="row">
                <div className="col-6 col-lg-3 pb-4 pb-lg-0">
                  <div className="card">
                    <div className="card-body">
                      <div className="flex flex-row items-center justify-center gap-3">
                        <div className="">
                          <FaMapLocationDot
                            className="text-[#c39636]"
                            size={50}
                          ></FaMapLocationDot>
                        </div>
                        <div className="">
                          <div className="h4 font-weight-bold m-0"> 100+ </div>
                          <div className="pb-0 pb-lg-2" /> Dịch vụ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 pb-4 pb-lg-0">
                  <div className="card">
                    <div className="card-body">
                      <div className="flex flex-row items-center justify-center gap-3">
                        <div className="">
                          <FaBuilding
                            className="text-[#47e8fd]"
                            size={50}
                          ></FaBuilding>
                        </div>
                        <div className="">
                          <div className="h4 font-weight-bold m-0"> 200+ </div>
                          <div className="pb-0 pb-lg-2" /> Đại lý
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 pb-4 pb-lg-0">
                  <div className="card">
                    <div className="card-body">
                      <div className="flex flex-row items-center justify-center gap-3">
                        <div className="">
                          <FaLocationDot
                            className="text-[#fdee47]"
                            size={50}
                          ></FaLocationDot>
                        </div>
                        <div className="col-12 col-lg-8 font-weight-bold text-center text-lg-left text-nowrap h6 h5-xl">
                          <div className="h4 font-weight-bold m-0"> 300+ </div>
                          <div className="pb-0 pb-lg-2" /> Chi nhánh
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 pb-4 pb-lg-0">
                  <div className="card">
                    <div className="card-body">
                      <div className="flex flex-row items-center justify-center gap-3">
                        <div className="">
                          <FaUsers size={50}></FaUsers>
                        </div>
                        <div className="">
                          <div className="h4 font-weight-bold m-0"> 800+ </div>
                          <div className="pb-0 pb-lg-2" /> Người dùng
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="h3 h2-lg pb-4 pt-5 font-weight-bold text-light">
                Hệ thống gắn kết người dùng và doanh nghiệp tiên phong tại Việt
                Nam
              </h2>
              <div className="pb-5 pb-lg-0">
                <a href="#formCreate" className="btn-vxr-yellow btn btn-lg">
                  Đăng kí ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="formCreate"
        className="bg-white shadow-xl w-full rounded-xl flex flex-col p-10 lg:flex-row items-center flex-wrap lg:max-w-[80%] mx-auto lg:gap-0 gap-5"
      >
        <div className="w-3/6 flex flex-col items-start justify-center gap-5 rounded-md shadow-md px-3">
          <div className="flex flex-col md:flex-row justify-center gap-3">
            <Image
              src={"/images/qr.jpg"}
              width={150}
              height={0}
              className="card-review-img-lg"
              alt="..."
            />
            <div className="flex flex-col gap-3 items-start justify-start">
              <b className="text-lg font-bold">Ms.Lê Kim Hà</b>
              <p>
                <b className="text-sm">Khu vực miền Nam</b>
              </p>
              <p>
                <a
                  className="text-blue-700"
                  href="mailto:totrongphung@vnfixer.com"
                >
                  lekimha@vnfixer.com
                </a>
              </p>
              <p>
                <a className="text-blue-700" href="tel:0922 456 665">
                  0922 456 665
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-3">
            <Image
              src={"/images/qr.jpg"}
              width={150}
              height={0}
              className="card-review-img-lg"
              alt="..."
            />
            <div className="flex flex-col gap-3 items-start justify-start">
              <b className="text-lg font-bold">Mr.Tô Trọng Phụng</b>
              <p>
                <b className="text-sm">Khu vực miền Bắc</b>
              </p>
              <p>
                <a
                  className="text-blue-700"
                  href="mailto:totrongphung@vnfixer.com"
                >
                  totrongphung@vnfixer.com
                </a>
              </p>
              <p>
                <a className="text-blue-700" href="tel:0922 456 664">
                  0922 456 664
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="w-3/6 flex flex-col gap-4 justify-start items-center shadow-md rounded-md p-3">
          <p className="font-bold lg:text-xl">
            Vui lòng cung cấp một số thông tin sau
          </p>

          <TextField
            required
            fullWidth
            id="standard-basic"
            label="Tên đại lý"
            helperText=""
            variant="standard"
            className="w-10/12"
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
          />
          <FormControl fullWidth variant="standard" className="w-10/12">
            <InputLabel id="demo-simple-select-standard-label" required>
              Tỉnh/Thành
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              label="city"
            >
              {cityDistrict &&
                cityDistrict.map((city, index) => {
                  return (
                    <MenuItem key={index} value={city.city}>
                      {city.city}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard" className="w-10/12">
            <InputLabel id="demo-simple-select-standard-label" required>
              Quận/Huyện
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              label="district"
            >
              {city &&
                cityDistrict
                  ?.find((cityMap) => cityMap.city == city)
                  ?.districts?.map((district, index) => {
                    return (
                      <MenuItem key={index} value={district}>
                        {district}
                      </MenuItem>
                    );
                  })}
            </Select>
          </FormControl>
          <TextField
            required
            fullWidth
            id="standard-basic"
            label="Địa chỉ"
            helperText=""
            variant="standard"
            className="w-10/12"
            multiline
            maxRows={4}
            value={agencyAddress}
            onChange={(e) => setAgencyAddress(e.target.value)}
          />
          <FormControl fullWidth variant="standard" className="w-10/12">
            <InputLabel id="demo-simple-select-standard-label">
              Dịch vụ
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={agencyCategory}
              onChange={(e) => handleChangeCategory(e)}
              label="category"
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
          <div className="relative w-full md:w-10/12 bg-slate-100 rounded-md">
            <textarea
              value={agencyDescription}
              onChange={(e) => setAgencyDescription(e.target.value)}
              className="peer px-4 h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            ></textarea>
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Mô tả
            </label>
          </div>
          <div className="w-10/12">
            <div className="flex items-center justify-start mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={checked}
                onClick={() => setChecked(!checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tôi đã đọc các điều khoản dưới và đồng ý.
              </label>
            </div>
            <p className="text-sm font-medium">Điều khoản tóm tắt:</p>
            <div className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">
              <ul className="gap-3">
                <li>
                  1. Cam kết sẽ thực hiện cung cấp dịch vụ chất lượng và trung
                  thực.
                </li>
                <li>2. Đảm bảo về bảo mật thông tin khách hàng và dữ liệu.</li>
                <li>
                  3. Mỗi yêu cầu với trạng thái hoàn thành sẽ được tính phí{" "}
                  <span className="text-blue-400">2.000vnđ.</span>
                </li>
                <li>
                  4. Giới hạn tối đa cho thanh toán là 300 yêu cầu với trạng
                  thái hoàn thành.
                </li>
                <li>
                  5. Đại lý không tuân thủ các quy tắc trên sẽ nhận hình phạt từ
                  VNFIXER.
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex items-end justify-center">
            <button
              onClick={
                checked
                  ? handleCreateAgency
                  : () => toast.error("Vui lòng đồng ý các điều khoản!")
              }
              className="px-4 py-3 bg-blue-500 rounded-md shadow-sm mx-auto"
            >
              <p className="text-sm font-semibold text-white hover:text-gray-200">
                Đăng ký
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyCreate;

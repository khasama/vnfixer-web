"use client";
import React, { useEffect } from "react";
import { currentUserSelector, isLoggedInSelector } from "../redux/selectors";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import vnfixerAPI from "../api/vnfixerApi";

const Payment = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);

  const handleSubmit = async () => {
    if (isLoggedIn) {
      try {
        const res = await vnfixerAPI.getAgencyPayment(currentUser?.agencyId);
        console.log(res);
      } catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } else {
      toast.error("Vui lòng đăng nhập để gửi yêu cầu!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  const handlePayment = async () => {
    if (isLoggedIn) {
      const data = {
        requestIds: [1, 2, 3, 4],
      };
      try {
        const res = await vnfixerAPI.postAgencyPayment(
          currentUser?.agencyId,
          data
        );
        console.log(res);
        if (res.status == 200) {
          toast.success("Yêu cầu của bạn đã được gửi đi");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } else {
      toast.error("Vui lòng đăng nhập để gửi yêu cầu!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  useEffect(() => {
    currentUser?.agencyId && handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="container">
      <Toaster position="top-center" />
      abc
      <button onClick={handlePayment} className="p-2 bg-blue-500 rounded-md">
        Submit
      </button>
    </div>
  );
};

export default Payment;

"use client";

import vnfixerAPI from "@/app/api/vnfixerApi";
import { currentUserSelector, isLoggedInSelector } from "@/app/redux/selectors";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spinner from "../../../../public/images/Spin-1s-200px.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Status = () => {
  const router = useRouter();
  const currentUser = useSelector(currentUserSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const searchParams = useSearchParams();
  const [returned, setReturned] = useState(null);

  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_CardType = searchParams.get("vnp_CardType");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TmnCode = searchParams.get("vnp_TmnCode");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const vnp_SecureHash = searchParams.get("vnp_SecureHash");

  useEffect(() => {
    if (
      !vnp_Amount ||
      !vnp_OrderInfo ||
      !vnp_BankCode ||
      !vnp_BankTranNo ||
      !vnp_CardType ||
      !vnp_PayDate ||
      !vnp_ResponseCode ||
      !vnp_TmnCode ||
      !vnp_TransactionNo ||
      !vnp_TransactionStatus ||
      !vnp_TxnRef ||
      !vnp_SecureHash
    ) {
      router.push("/");
    }
  }, []);

  const query = {
    vnp_OrderInfo,
    vnp_Amount,
    vnp_BankCode,
    vnp_BankTranNo,
    vnp_CardType,
    vnp_PayDate,
    vnp_ResponseCode,
    vnp_TmnCode,
    vnp_TransactionNo,
    vnp_TransactionStatus,
    vnp_TxnRef,
    vnp_SecureHash,
  };

  const sendQuery = async () => {
    if (isLoggedIn) {
      try {
        const res = await vnfixerAPI.getAgencyPaymentStatus(
          currentUser?.agencyId,
          query
        );
        if (res.status == 200) {
          setReturned(res.data?.data);
        }
      } catch (error) {
        console.log("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } else {
      console.log("Vui lòng đăng nhập để gửi yêu cầu!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  useEffect(() => {
    currentUser?.agencyId && sendQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (returned?.paymentStatus == "failed") {
      setTimeout(() => {
        router.push("/payment");
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returned]);

  return (
    <div className="container min-h-[70vh]">
      {returned == null ? (
        <div className="w-full flex justify-center items-center">
          <Image src={spinner} alt="loading.." height={0} width={200}></Image>
        </div>
      ) : (
        <div className="max-w-2xl min-h-[70vh] mx-auto flex lg:flex-row flex-col p-1 md:p-5 rounded-lg gap-5 my-auto">
          <div className="lg:w-5/6 mx-auto w-full bg-[#F6FFFF] rounded-2xl p-1 lg:p-5 shadow-custom shadow-[#c5c3a3] flex flex-col gap-5 justify-center items-center">
            <Image
              height={0}
              width={100}
              alt="status"
              src={
                returned?.paymentStatus == "success"
                  ? require("../../../../public/images/success.png")
                  : require("../../../../public/images/failed.png")
              }
            ></Image>
            <p className="p-5 border-gray-200 rounded-lg">
              {returned?.message}
            </p>
            <span
              className={`px-5 py-2 text-center ${
                returned?.paymentStatus == "success"
                  ? "bg-[#21bcd8fd]"
                  : "bg-[#d82d21fd]"
              } text-white font-bold rounded`}
            >
              {returned?.paymentStatus == "success"
                ? "Thanh toán thành công"
                : "Thanh toán thất bại"}
            </span>
            <Link href="/" className="text-gray-800 font-semibold">
              <u>Trang chủ</u>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;

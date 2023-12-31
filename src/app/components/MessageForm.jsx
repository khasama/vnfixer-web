"use client";
import { useEffect, useState } from "react";
import vnfixerAPI from "../api/vnfixerApi";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import ReactTimeAgo from "react-time-ago";
import { logout } from "../redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";

export default function MessageForm({ onClose }) {
  const dispatch = useDispatch();
  const [invites, setInvites] = useState();
  const [showModal, setShowModal] = useState(true);
  const currentUser = useSelector(currentUserSelector);

  const handleShowMessage = () => {
    setShowModal(() => {
      onClose(false);
      return !showModal;
    });
  };

  const handleAccept = async (id) => {
    const data = {
      requestId: id,
    };
    try {
      const res = await vnfixerAPI.replyInvite("ACCEPT", data);
      if (res.status == 200) {
        getInvite();
        dispatch(logout())
          .then(unwrapResult)
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async (id) => {
    const data = {
      requestId: id,
    };
    try {
      const res = await vnfixerAPI.replyInvite("REJECT", data);
      if (res.status == 200) {
        getInvite();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInvite = async () => {
    if (currentUser && !currentUser?.agencyRole) {
      try {
        const res = await vnfixerAPI.getMyInvite();
        console.log(res.data.data);
        if (res.status == 200) {
          const filtered = res?.data?.data?.filter(
            (item) => item.status == "PENDING"
          );
          console.log(filtered);
          setInvites(filtered);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getInvite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full"
              onClick={() => handleShowMessage()}
            ></div>
            <div className="flex items-center justify-end min-h-screen py-8 h-full">
              <div className="relative w-full max-w-sm p-4 bg-white rounded-md shadow-lg h-full">
                <button
                  className="absolute top-2 left-2"
                  onClick={() => handleShowMessage()}
                >
                  <b>&#10006;</b>
                </button>
                <div className="mt-3 sm:flex">
                  <div className="mt-2 text-center sm:text-left">
                    <h4 className="text-lg font-bold text-gray-800">
                      Thông báo
                    </h4>
                    {invites?.map((invite) => (
                      <div key={invite.id}>
                        <div className="bg-[#cecfd030] p-2 rounded-md">
                          <div className="text-[15px] leading-relaxed text-gray-600 grid gap-3 text-sm">
                            <b>{`Đại lý ${invite?.branch?.agency?.name}`}</b>
                            <div>
                              {`Chúng tôi xin mời bạn tham gia vào chi nhánh ${invite?.branch?.city} trực thuộc đại lý của chúng tôi với vai trò ${invite?.role}.`}
                              <br />
                              Xin chân thành cảm ơn.
                              <p className="text-xs text-black text-right">
                                <ReactTimeAgo
                                  date={Date.parse(invite?.createdAt)}
                                  locale="EN-US"
                                />
                              </p>
                            </div>
                          </div>
                          <div className="items-center gap-2 sm:flex">
                            <button
                              className="w-full mt-2 py-2 flex-1 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2"
                              onClick={() => handleAccept(invite?.id)}
                            >
                              Chấp nhận
                            </button>
                            <button
                              className="w-full mt-2 py-2 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                              onClick={() => handleReject(invite?.id)}
                            >
                              Từ chối
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="bg-[#cecfd030] p-2 rounded-md mt-3">
                      <div className="mt-2 text-[15px] leading-relaxed text-gray-600">
                        Xin chào thành viên mới, VNFIXER xin cảm ơn bạn đã tin
                        tưởng vào chúng tôi, hi vọng bạn sẽ có những trải nghiệm
                        tốt trên nền tảng của chúng tôi.
                        <br />
                        Thân ái.
                        <div className="text-xs text-black text-right">
                          <ReactTimeAgo
                            date={Date.parse("2023-12-31T11:30:21.000Z")}
                            locale="EN-US"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#cecfd030] p-2 rounded-md mt-3">
                      <div className="mt-2 text-[15px] leading-relaxed text-gray-600">
                        Xin chào thành viên mới, VNFIXER xin cảm ơn bạn đã tin
                        tưởng vào chúng tôi, hi vọng bạn sẽ có những trải nghiệm
                        tốt trên nền tảng của chúng tôi.
                        <br />
                        Thân ái.
                        <div className="text-xs text-black text-right">
                          <ReactTimeAgo
                            date={Date.parse("2023-12-31T11:30:21.000Z")}
                            locale="EN-US"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

"use client";
// import moment from "moment";
import moment from "moment-timezone";
import Image from "next/image";
// import { OpenAIApi } from "openai";
const { OpenAI } = require("openai");
import React, { useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import ReactTimeAgo from "react-time-ago";
import vnfixerAPI from "../api/vnfixerApi";
import toast from "react-hot-toast";
import Link from "next/link";
import CardAgency from "./CardAgency";
require("dotenv").config();

export const Chat = () => {
  const messagesEndRef = useRef(null);
  moment.tz.setDefault("UCT");
  const currentTime = moment();
  const [show, setShow] = useState(false);
  const [compos, setCompos] = useState(false);
  const [data, setData] = useState();
  const openai = new OpenAI({
    apiKey: process.env.customKey,
    dangerouslyAllowBrowser: true,
  });

  const formattedTime = currentTime.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      time: formattedTime,
      user: "bot",
      message: "Trợ lý VNFIXER xin chào, tôi có thể giúp gì cho bạn?",
    },
  ]);

  const handleAfter = (user, message) => {
    const data = {
      time: formattedTime,
      user: user,
      message: message,
    };
    setMessages((prevMessages) => {
      setInput("");
      return [...prevMessages, data];
    });
    // if (messagesEndRef.current) {
    //   messagesEndRef?.current.scrollIntoView({ behavior: "smooth" });
    // }
  };

  const sendMess = async () => {
    if (input.length > 0) {
      handleAfter("me", input);
      setCompos(() => {
        setData();
        return true;
      });
      const data = {
        question: input,
      };
      try {
        const responseAPI = await vnfixerAPI.chatBot(data);
        if (responseAPI.status == 200 && responseAPI?.data?.canDetect) {
          setCompos(false);
          handleAfter("bot", responseAPI?.data?.answer);
          setData(responseAPI?.data?.data);
        } else if (responseAPI.status == 200 && !responseAPI?.data?.canDetect) {
          const responseGPT = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: responseAPI?.data?.question }],
            max_tokens: 256,
          });
          if (responseGPT?.choices[0]?.message) {
            handleAfter("bot", responseGPT?.choices[0]?.message?.content);
            setCompos(false);
          }
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    }
  };

  return (
    <div>
      <div className="relative">
        <button
          className="fixed bottom-5 right-3 p-2 rounded-full bg-blue-100 opacity-80"
          type="button"
          onClick={() => setShow(!show)}
        >
          <div className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"></div>
          <Image
            width={0}
            height={50}
            alt="chatbot"
            src={require("../../../public/images/chatbot.png")}
          ></Image>
        </button>
      </div>
      {show && (
        <div className="flex flex-col items-center justify-center w-screen bg-gray-100 text-gray-800">
          <div className="flex flex-col flex-grow w-full max-w-sm bg-white shadow-xl rounded-lg min-h-[60vh] overflow-hidden fixed bottom-5 right-3">
            <div className="flex flex-row items-center h-12 bg-blue-600 w-full px-4">
              <div>
                <button
                  onClick={() => setShow(false)}
                  className="flex items-center justify-center text-gray-600 hover:text-gray-600 bg-white p-1.5 rounded-full"
                >
                  <FaXmark />
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="flex justify-start items-center w-full font-semibold text-white">
                  <p>Trợ lý ảo VNFIXER</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-grow h-0 overflow-auto scrollbar px-3">
              {messages?.map((message, index) => (
                <React.Fragment key={index}>
                  {message?.user == "bot" ? (
                    <div className="flex flex-col w-full mt-2 space-x-3 max-w-xs">
                      <div>
                        <div className="bg-gray-100 p-3 rounded-r-lg rounded-bl-lg">
                          <p className="text-sm">{message?.message}</p>
                        </div>
                        <span className="text-xs text-gray-500 leading-none">
                          <ReactTimeAgo
                            date={Date.parse(message?.time)}
                            locale="EN-US"
                          />
                        </span>
                      </div>
                      {data && (
                        <div className="flex flex-col w-full mt-2 space-x-3 max-w-xs flex-wrap gap-2">
                          {data?.map((item) => (
                            <div
                              key={item?.id}
                              className="flex flex-row bg-gray-100 p-3 rounded-r-lg rounded-bl-lg"
                            >
                              <Link
                                className="flex flex-row"
                                href={`/agency/${item?.id}/${item?.name}`}
                                shallow
                              >
                                <Image
                                  className="w-2/5 h-auto m-auto pl-2"
                                  src={
                                    item?.logo
                                      ? item?.logo
                                      : require("../../../public/images/logo.png")
                                  }
                                  alt={item?.name}
                                  width={0}
                                  height={0}
                                  unoptimized={item?.logo?.length > 0}
                                  sizes="10vw"
                                  loading="lazy"
                                ></Image>
                                <div className="w-3/5 flex flex-col gap-1.5 text-[#484848] rounded-b-xl">
                                  <h5 className="text-sm font-semibold text-2">
                                    {item?.name}
                                  </h5>

                                  <div className="flex items-center justify-start">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <svg
                                        key={i}
                                        className={`w-4 h-4 ms-1 ${
                                          i == 4
                                            ? "text-gray-300 dark:text-gray-500"
                                            : "text-yellow-300"
                                        }`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                      >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                      </svg>
                                    ))}
                                  </div>
                                  <span className="text-xs text-[#73777a]">
                                    ({5} đánh giá)
                                  </span>
                                  <div className="flex flex-row gap-2 items-center text-xs flex-wrap">
                                    {item?.branches?.map((branch) => (
                                      <div
                                        className="p-1 rounded-md bg-blue-100"
                                        key={branch?.id}
                                      >
                                        {branch.city}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                      <div>
                        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                          <p className="text-sm">{message?.message}</p>
                        </div>
                        <span className="text-xs text-gray-500 leading-none">
                          <ReactTimeAgo
                            date={Date.parse(message?.time)}
                            locale="EN-US"
                          />
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
              {/* <div ref={messagesEndRef} /> */}

              {compos && (
                <div className="flex w-full mt-2 space-x-3 max-w-xs">
                  <Image
                    width={0}
                    height={50}
                    src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif"
                    unoptimized={true}
                    alt="..."
                    className="w-16 ml-6"
                  ></Image>
                </div>
              )}
            </div>

            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    onKeyDown={
                      (evt) => {
                        if (evt.key == "Enter") {
                          sendMess();
                        }
                      }
                      // const keyCode = evt.keyCode;
                      // if (keyCode === 8) sendMess();
                    }
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  type="submit"
                  onClick={sendMess}
                  className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span className="py-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

"use client";
import moment from "moment";
import Image from "next/image";
import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import ReactTimeAgo from "react-time-ago";
require("dotenv").config();

export const Chat = () => {
  const currentTime = moment();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      time: currentTime.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      user: "bot",
      message: "Trợ lý VNFIXER xin chào, tôi có thể giúp gì cho bạn",
    },
  ]);
  const [show, setShow] = useState(false);
  const [compos, setCompos] = useState(false);
  const config = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(config);
  const formattedTime = currentTime.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const handleAfter = (user, message) => {
    const data = {
      time: formattedTime,
      user: user,
      message: message,
    };
    setMessages((prevMessages) => {
      setCompos(false);
      setInput("");
      return [...prevMessages, data];
    });
  };

  const sendMess = async () => {
    setCompos(true);
    handleAfter("me", input);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 256,
    });
    if (response.status == 200 && response?.data?.choices) {
      handleAfter("bot", response?.data.choices[0]?.text);
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
          <div className="flex flex-col flex-grow w-full max-w-sm bg-white shadow-xl rounded-lg min-h-[70vh] overflow-hidden fixed bottom-5 right-3">
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
                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                      <div>
                        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
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

              {compos && (
                <div className="flex w-full mt-2 space-x-3 max-w-xs">
                  <Image
                    width={0}
                    height={50}
                    src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif"
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

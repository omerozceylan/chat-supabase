"use client";

import { MyContext } from "@/Context";
import { useContext, useEffect, useRef, useState } from "react";

export default function MessageView({ currentUserName = "", messages = [] }) {
  const messageContainerRef = useRef(null);
  const { user } = useContext(MyContext);

  console.log(messages);
  useEffect(() => {
    const scrollToBottom = () => {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    };
    scrollToBottom();
  }, [messages]);

  return (
    <div
      ref={messageContainerRef}
      className="flex flex-col gap-4 p-4 pl-7 h-full overflow-y-auto transition-all"
    >
      {messages.map((data) => {
        const isOwner = data.user_name == user.user_metadata.username;

        return (
          <div
            key={data.user_name}
            className={`flex items-end pr-6 ${isOwner ? "justify-end" : ""}`}
          >
            <div
              className={`text-white bg-black rounded-2xl w-8 h-8 flex justify-center items-center ${
                isOwner ? "hidden" : ""
              }`}
            >
              {data.user_name.charAt(0)}
            </div>
            <span className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl text-wrap whitespace-normal break-words max-w-[500px] scroll-mb-80	">
              {data.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}

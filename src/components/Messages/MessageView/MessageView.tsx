"use client";

import { MainContext } from "@/Context";
import { useContext, useEffect, useRef, useState } from "react";

export default function MessageView({ currentUserName = "", messages = [] }) {
  const messageContainerRef = useRef(null);
  const { user } = useContext(MainContext);

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
      className="flex flex-col gap-4 p-4 pt-1  h-full overflow-y-auto transition-all"
    >
      {messages.map((data) => {
        const userName =
          user.app_metadata.provider === "google"
            ? user.user_metadata.full_name
            : user.user_metadata.username;

        const messageOwnerName = data.user_name;

        const isOwner = userName == messageOwnerName;

        return (
          <div
            key={data.user_name}
            className={`flex items-end pr-2 ${isOwner ? "justify-end" : ""}`}
          >
            <div
              className={`  dark:bg-secondary bg-secondary-foreground text-white rounded-2xl w-8 h-8 flex justify-center items-center ${
                isOwner ? "hidden" : ""
              }`}
            >
              {data.user_name ? data.user_name.charAt(0) : ""}
            </div>
            <span
              className={`relative ml-3 text-sm  py-2 px-4 shadow rounded-xl text-wrap whitespace-normal break-words max-w-[500px] scroll-mb-80 font-light	${
                isOwner
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted dark:text-white"
              }`}
            >
              {data.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}

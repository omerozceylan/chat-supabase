"use client";

import { MainContext } from "@/MainContext";
import { useContext, useEffect, useRef } from "react";
import { VList } from "virtua";
import NoneParticipantUserView from "../NoneParticipantUserView/NoneParticipantUserView";

export default function MessageView({ messages = [] }) {
  const messageContainerRef = useRef(null);

  const {
    user,
    roomId,
    currentParticipants,
    isUserParticipant,
    currentRoomName,
  } = useContext(MainContext);

  useEffect(() => {
    if (!messageContainerRef.current) return;
    const scrollToBottom = () => {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    };
    scrollToBottom();
  }, [messages]);

  if (!isUserParticipant) return <NoneParticipantUserView />;

  return (
    <div
      ref={messageContainerRef}
      className="flex flex-col gap-3 pt-3 p-4   h-full overflow-y-auto transition-all"
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
              {data.user_name ? data.user_name.charAt(0).toUpperCase() : ""}
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
      })}{" "}
    </div>
  );
}

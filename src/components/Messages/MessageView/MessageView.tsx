"use client";

import { MainContext } from "@/MainContext";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useRef, useState } from "react";
import { supabase } from "@/supabase/client";

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
    const scrollToBottom = () => {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    };
    scrollToBottom();
  }, [messages]);

  const relationUserToTheRoom = async () => {
    const { data, error } = await supabase
      .from("participants")
      .insert([{ room_id: roomId, user_id: user.id }])
      .select();
    console.log(roomId, user.id);

    console.log("data: ", data, " error ", error);
  };

  if (!isUserParticipant)
    return (
      <div
        ref={messageContainerRef}
        className="flex flex-col  items-center h-full justify-center "
      >
        <span className="dark:text-white font-semibold">{currentRoomName}</span>
        <span className="dark:text-white/40 text-black/40">
          Submit a request to enter the room
        </span>
        <Button
          onClick={() => {
            relationUserToTheRoom();
          }}
          className="dark:bg-[#0f0f0f] dark:text-white dark:hover:bg-white/5 border border-[var(--border-primary)] px-3 h-8 mt-2"
        >
          Request
        </Button>
      </div>
    );

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

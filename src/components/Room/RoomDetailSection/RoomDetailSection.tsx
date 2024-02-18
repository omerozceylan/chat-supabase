"use client";

import { PiDotsThreeBold } from "react-icons/pi";
import { MainContext } from "@/MainContext";
import { useContext } from "react";
import { InvitesPopOver } from "@/components";
import { RoomName } from "@/components";

export default function RoomDetailSection({ currentRoomName, roomId }) {
  const { isUserParticipant } = useContext(MainContext);

  return (
    <div className="z-20 px-6 font-semibold  text-md p-4">
      <div className="flex items-center justify-between">
        <RoomName />
        <div className="flex gap-12 items-center">
          <div className={`${isUserParticipant ? "" : "hidden"}`}>
            <InvitesPopOver />
          </div>
          <PiDotsThreeBold className="cursor-pointer dark:text-white w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

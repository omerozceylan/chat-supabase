"use client";

import { useState } from "react";
import RoomListContainer from "@/components/Room/RoomListContainer/RoomListContainer";
import { MessageContainer } from "@/components";
import ParticipantsContainer from "@/components/Room/ParticipantsContainer/ParticipantsContainer";
import { MyContext } from "@/Context";

export default function Room() {
  const [activeTabId, setActiveTabId] = useState<number | undefined>();
  const [roomId, setRoomId] = useState();

  return (
    <div className="flex  min-h-screen">
      <MyContext.Provider value={{ activeTabId, setActiveTabId }}>
        <div className=" min-h-screen">
          <RoomListContainer />
        </div>
        <div className="w-full">
          <MessageContainer activeTabId={activeTabId} />
        </div>
        <div>
          <ParticipantsContainer />
        </div>
      </MyContext.Provider>
    </div>
  );
}

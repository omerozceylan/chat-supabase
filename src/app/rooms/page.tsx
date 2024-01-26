"use client";

import { useState } from "react";
import RoomListContainer from "@/components/Room/RoomListContainer/RoomListContainer";
import { MessageContainer } from "@/components";
import ParticipantsContainer from "@/components/Room/ParticipantsContainer/ParticipantsContainer";

export default function Room() {
  const [activeTabId, setActiveTabId] = useState<number | undefined>();

  return (
    <div className="flex  min-h-screen">
      <div className=" min-h-screen">
        <RoomListContainer
          onItemClick={(id: number) => {
            setActiveTabId(id);
          }}
          activeTabId={activeTabId}
        />
      </div>
      <div className="w-full">
        <MessageContainer activeTabId={activeTabId} />
      </div>
      <div>
        <ParticipantsContainer />
      </div>
    </div>
  );
}

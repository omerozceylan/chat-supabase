"use client";

import { useState } from "react";
import RoomListContainer from "@/components/Room/RoomListContainer/RoomListContainer";
import { MessageContainer } from "@/components";

export default function Room() {
  const [activeTabId, setActiveTabId] = useState();
  return (
    <div className="flex  min-h-screen">
      <div className=" min-h-screen">
        <RoomListContainer
          onItemClick={(id) => {
            setActiveTabId(id);
          }}
          activeTabId={activeTabId}
        />
      </div>
      <div className="w-full">
        <MessageContainer activeTabId={activeTabId} />
      </div>
    </div>
  );
}

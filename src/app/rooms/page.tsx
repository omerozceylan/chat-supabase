"use client";

import { useEffect, useState } from "react";
import RoomListContainer from "@/components/Room/RoomListContainer/RoomListContainer";
import { MessageContainer } from "@/components";
import ParticipantsContainer from "@/components/Room/ParticipantsContainer/ParticipantsContainer";
import { MyContext } from "@/Context";
import { supabase } from "@/supabase/client";

export default function Room() {
  const [activeTabId, setActiveTabId] = useState<number | undefined>();
  const [roomId, setRoomId] = useState();
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      const { user } = data;
      setUser(user);
      setUserLoading(false);
    };
    getUser();
  }, []);

  return (
    <div className="flex  min-h-screen">
      <MyContext.Provider
        value={{
          activeTabId,
          setActiveTabId,
          roomId,
          setRoomId,
          user,
          userLoading,
          setUserLoading,
        }}
      >
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

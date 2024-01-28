"use client";

import { useEffect, useState } from "react";
import { MessageContainer } from "@/components";
import ParticipantsContainer from "@/components/Room/ParticipantsContainer/ParticipantsContainer";
import { MainContext } from "@/Context";
import { supabase } from "@/supabase/client";
import { RoomListContainer, CreateRoomButton } from "@/components";

export default function Room() {
  const [activeTabId, setActiveTabId] = useState<number | undefined>(0);
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
      <MainContext.Provider
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
          <MessageContainer />
        </div>
        <div>
          <ParticipantsContainer />
        </div>
      </MainContext.Provider>
    </div>
  );
}

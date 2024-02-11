"use client";

import { useEffect, useState } from "react";
import { MessageContainer } from "@/components";
import ParticipantsContainer from "@/components/Room/ParticipantsContainer/ParticipantsContainer";
import { MainContext } from "@/Context";
import { supabase } from "@/supabase/client";
import { RoomListContainer } from "@/components";
import ColorThemeContext from "@/Context/ColorThemeProvider";
import { useRouter } from "next/navigation";

export default function Room({ params }) {
  const router = useRouter();
  const activeTabId = params.activeTabId;
  const [roomId, setRoomId] = useState();
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const [roomLoading, setRoomLoading] = useState(true);
  const [userAttendedRooms, setUserAttendedRooms] = useState([]);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    const { user } = data;

    setUser(user);
    setUserLoading(false);
  };

  const getRooms = async (user) => {
    setRoomLoading(true);
    if (!user) {
      setRoomLoading(false);
      return;
    }
    const { data: rooms, error } = await supabase
      .from("participants")
      .select("*, rooms(*)")
      .eq("user_id", user.id);
    setUserAttendedRooms(rooms);
    setRoomLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getRooms(user);
  }, [user]);

  const setActiveTabId = (id: number) => {
    router.push(`/rooms/${id}`);
  };

  return (
    <div className="flex min-h-screen">
      <MainContext.Provider
        value={{
          activeTabId,
          setActiveTabId,
          roomId,
          getRooms,
          roomLoading,
          setRoomId,
          user,
          userAttendedRooms,
          userLoading,
          setUserLoading,
        }}
      >
        <ColorThemeContext>
          <div className=" min-h-screen">
            <RoomListContainer />
          </div>
          <div className="w-full">
            <MessageContainer />
          </div>
          <div>
            <ParticipantsContainer />
          </div>
        </ColorThemeContext>
      </MainContext.Provider>
    </div>
  );
}

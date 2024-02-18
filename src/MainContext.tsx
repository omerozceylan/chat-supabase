import { createContext } from "react";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";
import { useSearchParams } from "next/navigation";

export const MainContext = createContext("");

export default function MainContextProvider({ children }) {
  const router = useRouter();
  const [roomId, setRoomId] = useState();
  const [user, setUser] = useState();
  const [currentRoomName, setCurrentRoomName] = useState();
  const [isUserParticipant, setIsUserParticipant] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [roomLoading, setRoomLoading] = useState(true);
  const [userAttendedRooms, setUserAttendedRooms] = useState([]);
  const [currentParticipants, setCurrentParticipants] = useState();
  const searchParams = useSearchParams();
  const activeTabId = searchParams.get("id");

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
      .select("*,rooms!inner(*)")
      .eq("user_id", user.id)
      .eq("is_invite_accepted", true);

    console.log(rooms);

    setUserAttendedRooms(rooms ? rooms : []);
    setRoomLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!currentParticipants) return;
    for (let i = 0; i < currentParticipants.length; i++) {
      if (currentParticipants[i].user_id == user.id) setIsUserParticipant(true);
    }
  }, [currentParticipants]);

  useEffect(() => {
    getRooms(user);
  }, [user]);

  const setActiveTabId = (id: number) => {
    router.replace(`/rooms?id=${id}`);
  };

  return (
    <MainContext.Provider
      value={{
        activeTabId,
        currentRoomName,
        setCurrentRoomName,
        isUserParticipant,
        setActiveTabId,
        currentParticipants,
        setCurrentParticipants,
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
      {children}
    </MainContext.Provider>
  );
}

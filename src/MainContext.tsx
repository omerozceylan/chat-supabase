"use client";

import { createContext } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";
import { useSearchParams } from "next/navigation";

export const MainContext = createContext("");

export default function MainContextProvider({ children }) {
  const router = useRouter();
  const [roomId, setRoomId] = useState(null);
  const [user, setUser] = useState(null);
  const [currentRoomName, setCurrentRoomName] = useState(null);
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
  console.log(currentParticipants);

  useEffect(() => {
    getRooms(user);
  }, [user, currentParticipants]);

  const setActiveTabId = (id: number) => {
    router.replace(`/rooms?id=${id}`);
  };

  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "participants",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => {
        if (payload.eventType == "INSERT") {
          const userId = payload.new.user_id;

          const getUserById = async () => {
            let { data: profile, error } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", userId);
            const payloadWithProfile = [
              ...currentParticipants,
              { ...payload.new, profiles: profile[0] },
            ];
            console.log(payloadWithProfile);
            setCurrentParticipants(payloadWithProfile);
          };
          getUserById();
        }
      }
    )
    .subscribe();

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

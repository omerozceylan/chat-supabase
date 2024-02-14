import { createContext } from "react";

export const MainContext = createContext("");
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";

export default function MainContextProvider({ params, children }) {
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
      .select("*,rooms!inner(*)")
      .eq("user_id", user.id);

    setUserAttendedRooms(rooms ? rooms : []);
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
      {children}
    </MainContext.Provider>
  );
}

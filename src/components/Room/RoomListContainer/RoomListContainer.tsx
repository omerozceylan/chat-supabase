"use client";

import { RoomCard } from "@/components";
import { supabase } from "@/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChatContainer } from "@/components";

export default function RoomListContainer() {
  const [user, setUser] = useState();
  const [userAttendedRooms, setUserAttendedRooms] = useState([]);

  useEffect(() => {
    const getUserAndRooms = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user); //contextttt
      // setIsLoading(false);

      const { data: rooms, error } = await supabase
        .from("participants")
        .select("*, rooms(*)")
        .eq("user_id", user.id);
      setUserAttendedRooms(rooms);
    };
    getUserAndRooms();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 p-3">
      <div className="">
        <div className="">
          {userAttendedRooms.map((room) => {
            console.log(room);
            return <RoomCard roomName={room.rooms.room_name} id={room.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

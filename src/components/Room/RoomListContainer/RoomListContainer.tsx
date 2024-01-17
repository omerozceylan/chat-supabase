"use client";

import { RoomCard } from "@/components";
import { supabase } from "@/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChatContainer } from "@/components";

export default function RoomListContainer({ onItemClick }) {
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
    <div className=" bg-zinc-50 p-3 min-h-screen">
      <div className="">
        <div className="">
          {userAttendedRooms.map((room) => {
            return (
              <div
                className="cursor-pointer"
                onClick={() => {
                  onItemClick(room.id);
                }}
              >
                <RoomCard roomName={room.rooms.room_name} id={room.id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

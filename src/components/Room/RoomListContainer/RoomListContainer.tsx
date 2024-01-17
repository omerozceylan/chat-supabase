"use client";

import { RoomCard } from "@/components";
import { supabase } from "@/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChatContainer } from "@/components";

export default function RoomListContainer({ onItemClick, activeTabId }) {
  const [user, setUser] = useState();
  const [userAttendedRooms, setUserAttendedRooms] = useState([]);

  console.log("active tabbbbb", activeTabId);
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
    <div className="bg-zinc-50 text-black min-h-screen scrollable-area relative w-full hidden  lg:flex lg:flex-col lg:border-r lg:w-60 xl:w-72">
      {/* <div className=" font-bold text-lg p-3 pb-1 pl-4">Rooms</div> */}

      <div className=" p-3 ">
        {userAttendedRooms.map((room) => {
          return (
            <div
              className="cursor-pointer"
              onClick={() => {
                onItemClick(room.id);
              }}
            >
              <RoomCard
                activeTabId={activeTabId}
                roomName={room.rooms.room_name}
                id={room.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

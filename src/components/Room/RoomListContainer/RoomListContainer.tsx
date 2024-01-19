"use client";

import { RoomCard, Spin } from "@/components";
import { supabase } from "@/supabase/client";
import { CiSquarePlus } from "react-icons/ci";
import Link from "next/link";
import { useEffect, useState } from "react";

import { UserCard } from "@/components";

export default function RoomListContainer({ onItemClick, activeTabId }) {
  const [user, setUser] = useState();
  const [userAttendedRooms, setUserAttendedRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("active tabbbbb", activeTabId);
  useEffect(() => {
    const getUserAndRooms = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user); //contextttt
      if (!user) {
        setIsLoading(false);
        return;
      }
      const { data: rooms, error } = await supabase
        .from("participants")
        .select("*, rooms(*)")
        .eq("user_id", user.id);
      setUserAttendedRooms(rooms);
      setIsLoading(false);
    };
    getUserAndRooms();
  }, []);

  return (
    <div className="bg-zinc-50 text-black min-h-screen scrollable-area relative w-full hidden  lg:flex lg:flex-col lg:border-r lg:w-60 xl:w-72">
      <div className=" font-semibold text-lg p-4 pb-1 flex justify-between items-center">
        <span>Rooms You Attended</span>

        <CiSquarePlus className="cursor-pointer" />
      </div>
      {!user && !isLoading && (
        <div>You must be logged in to reach your rooms.</div>
      )}
      <Spin isLoading={isLoading} />
      {!isLoading && (
        <div className="p-3 flex flex-col">
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
      )}

      <div className="mt-auto p-3">
        <UserCard />
      </div>
    </div>
  );
}

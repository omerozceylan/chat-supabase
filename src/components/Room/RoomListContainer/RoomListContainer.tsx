"use client";

import { RoomCard, Spin } from "@/components";
import { supabase } from "@/supabase/client";
import { CiSquarePlus } from "react-icons/ci";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";

import { UserCard } from "@/components";

export default function RoomListContainer({ onItemClick, activeTabId }: any) {
  const [user, setUser] = useState();
  const [userAttendedRooms, setUserAttendedRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserAndTheirRooms = async () => {
    setIsLoading(true);
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

  async function addRoom(roomName) {
    const { data, error } = await supabase
      .from("rooms")
      .insert([{ room_name: roomName }])
      .select();
    const idOfTheCreatedRoom = data[0].id;
    relationUserToRoom(idOfTheCreatedRoom);
  }

  async function relationUserToRoom(roomId) {
    const { data, error } = await supabase
      .from("participants")
      .insert([{ room_id: roomId, user_id: user.id }]);
    getUserAndTheirRooms();
  }

  useEffect(() => {
    getUserAndTheirRooms();
  }, []);

  return (
    <div className="bg-zinc-50 text-black h-screen scrollable-area relative w-full hidden  lg:flex lg:flex-col lg:border-r lg:w-60 xl:w-72">
      <div className=" font-semibold text-lg p-4 pb-1 flex justify-between items-center">
        <span>Rooms You Attended</span>
        <FiPlusSquare
          onClick={() => {
            const userName = user.user_metadata.username;
            addRoom(`${userName}'s room`);
          }}
          className="cursor-pointer"
        />
      </div>
      {!user && !isLoading && (
        <div>
          You must be logged in to reach your rooms. Or check your connection.
        </div>
      )}
      <Spin isLoading={isLoading} />
      {!isLoading && (
        <div className="p-3 flex flex-col overflow-y-auto">
          {userAttendedRooms.map((room) => {
            return (
              <div
                key={room.id}
                className="cursor-pointer"
                onClick={() => {
                  onItemClick(room.id);
                }}
              >
                <RoomCard
                  activeTabId={activeTabId}
                  onLeave={async (participantsId) => {
                    const { error } = await supabase
                      .from("participants")
                      .delete()
                      .eq("id", participantsId);

                    if (error) console.error(error);
                    getUserAndTheirRooms();
                  }}
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

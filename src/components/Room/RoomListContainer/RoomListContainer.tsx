"use client";

import { RoomCard, Spin, UserCard, CreateRoomButton } from "@/components";
import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { MainContext } from "@/Context";
import { useContext } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function RoomListContainer() {
  const {
    activeTabId,
    setActiveTabId,
    user,
    userAttendedRooms,
    roomLoading,
    userLoading,
    getRooms,
  } = useContext(MainContext);

  if (userLoading)
    return (
      <div className="dark:bg-black bg-white text-black h-screen scrollable-area relative w-full hidden  lg:flex lg:flex-col lg:border-r lg:border-input lg:w-60 xl:w-72">
        {" "}
        <Spin isLoading={userLoading} />
      </div>
    );

  return (
    <div className=" dark:bg-black bg-white text-black h-screen scrollable-area relative w-full hidden  lg:flex lg:flex-col lg:border-r lg:border-input dark:text-foreground lg:w-60 xl:w-72">
      <div className=" font-semibold text-lg p-4 pb-1 flex justify-between items-center">
        <span>Rooms You Attended</span>
        <CreateRoomButton />
      </div>

      {!user && !roomLoading && (
        <div className="flex justify-center flex-col items-center gap-4 mt-3">
          <div className="bg-red-400 rounded-lg text-sm mx-4 p-2">
            You must be logged in to reach your rooms. Or check your connection.
          </div>
          <Link href={"/auth"}>
            <button className="bg-black text-white w-24 px-2 py-1 rounded-md hover:bg-slate-800">
              Login
            </button>
          </Link>
        </div>
      )}

      {user && !roomLoading && !userAttendedRooms.length > 0 && (
        <div className="text-sm text-gray-500/75 mx-4 mt-4">
          There are no rooms you have joined or created.
        </div>
      )}

      <Spin isLoading={roomLoading} />

      {!roomLoading && (
        <div className="p-3 flex flex-col overflow-y-auto gap-0.5">
          {userAttendedRooms.map((room) => {
            return (
              <div
                key={room.id}
                className="cursor-pointer"
                onClick={() => {
                  setActiveTabId(room.id);
                }}
              >
                <RoomCard
                  onLeave={async (participantsId) => {
                    const { error } = await supabase
                      .from("participants")
                      .delete()
                      .eq("id", participantsId);

                    if (error) console.error(error);
                    getRooms(user);
                    setActiveTabId(0);
                  }}
                  roomName={room.rooms.room_name}
                  id={room.id}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-auto p-3 ">
        <UserCard />
      </div>
    </div>
  );
}

"use client";

import { RoomCard, Spin } from "@/components";
import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { MyContext } from "@/Context";
import { useContext } from "react";
import { UserCard } from "@/components";

export default function RoomListContainer() {
  const { activeTabId, setActiveTabId, user, userLoading } =
    useContext(MyContext);

  const [userAttendedRooms, setUserAttendedRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRooms = async () => {
    setIsLoading(true);

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
    getRooms();
  }

  useEffect(() => {
    getRooms();
  }, [user]);

  if (userLoading)
    return (
      <div className="bg-zinc-50 text-black h-screen scrollable-area relative w-full hidden  lg:flex lg:flex-col lg:border-r lg:w-60 xl:w-72">
        {" "}
        <Spin isLoading={userLoading} />
      </div>
    );

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
        <div className="bg-red-400 rounded-lg text-sm mx-4 p-2">
          You must be logged in to reach your rooms. Or check your connection.
        </div>
      )}
      {user && !isLoading && !userAttendedRooms.length > 0 && (
        <div className="text-sm text-gray-500/75 mx-4 mt-4">
          There are no rooms you have joined or created.
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
                    getRooms();
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
      <div className="mt-auto p-3">
        <UserCard />
      </div>
    </div>
  );
}

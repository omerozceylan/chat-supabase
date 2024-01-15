"use client";

import { supabase } from "@/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Room() {
  const [user, setUser] = useState();
  const [userAttendedRooms, setUserAttendedRooms] = useState([]);

  useEffect(() => {
    const getUserAndRooms = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      // setIsLoading(false);

      const { data: rooms, error } = await supabase
        .from("participants")
        .select("*")
        .eq("user_id", user.id);
      setUserAttendedRooms(rooms);
    };
    getUserAndRooms();
  }, []);

  const createRoomAndInsertOwner = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .insert([{ some_column: "someValue", other_column: "otherValue" }])
      .select();
  };

  return (
    <div className="min-h-screen">
      <button onClick={createRoomAndInsertOwner} className="">
        Create a Room Just for You and Friends
      </button>
      <div className="flex">
        {userAttendedRooms.map((room) => (
          <Link
            key={room.id}
            href={`/rooms/${room.id}`}
            className="p-12 bg-slate-300 rounded-2xl cursor-pointer "
          >
            {room.id}
          </Link>
        ))}
      </div>
    </div>
  );
}

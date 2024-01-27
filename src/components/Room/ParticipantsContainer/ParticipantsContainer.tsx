import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";

export default function ParticipantsContainer() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function getParticipants() {
      const { data: participants, error } = await supabase
        .from("participants")
        .select("*")
        .eq("room_id", roomId);
    }
  }, []);

  return (
    <div className="bg-zinc-50 border-l text-black h-screen scrollable-area relative w-full hidden lg:flex lg:flex-col lg:border-r lg:w-60 xl:w-72 p-4 gap-6">
      <div className="">
        <span className="font-semibold">Participants - 12</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="bg-black w-8 h-8 flex items-center justify-center text-md text-white rounded-full">
          o
        </div>
        Omer Ozceylan
      </div>
    </div>
  );
}

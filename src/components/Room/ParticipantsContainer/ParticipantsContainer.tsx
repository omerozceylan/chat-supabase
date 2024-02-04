import { MainContext } from "@/Context";
import { supabase } from "@/supabase/client";
import { useContext, useEffect, useState } from "react";

export default function ParticipantsContainer() {
  const { roomId } = useContext(MainContext);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function getParticipants() {
      const { data: participants, error } = await supabase
        .from("participants")
        .select("*, profiles(*)")
        .eq("room_id", roomId);
      setParticipants(participants);
      console.log(participants);
    }
    getParticipants();
  }, [roomId]);

  if (!participants)
    return (
      <div className="bg-[var(--bg-main-secondary)] border-l text-black h-screen scrollable-area relative w-full hidden lg:flex lg:flex-col lg:border-r lg:w-60 xl:w-72 p-4 gap-6">
        Participants
      </div>
    );

  return (
    <div className="bg-[var(--bg-main-secondary)] border-l text-black h-screen scrollable-area relative w-full hidden lg:flex lg:flex-col lg:border-r lg:w-60 xl:w-72 p-4 gap-6">
      <div className="">
        <span className="font-semibold">
          Participants - {participants.length}
        </span>
      </div>
      {participants.map((participant) => {
        const userName = participant.profiles.username
          ? participant.profiles.username
          : participant.profiles.full_name;
        return (
          <div className="flex gap-3 items-center">
            <div className="bg-[var(--bg-main)] w-8 h-8 flex items-center justify-center text-md text-white rounded-full">
              {userName.charAt(0).toUpperCase()}
            </div>
            {userName}
          </div>
        );
      })}
    </div>
  );
}

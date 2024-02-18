import { MainContext } from "@/MainContext";
import { supabase } from "@/supabase/client";
import { useContext, useEffect, useState } from "react";

export default function ParticipantsContainer() {
  const { roomId, currentParticipants, setCurrentParticipants } =
    useContext(MainContext);

  async function getParticipants() {
    const { data: participants, error } = await supabase
      .from("participants")
      .select("*, profiles(*)")
      .eq("room_id", roomId)
      .eq("is_invite_accepted", true);
    setCurrentParticipants(participants);
  }

  useEffect(() => {
    if (!roomId) return;
    getParticipants();
  }, [roomId]);

  if (!currentParticipants)
    return (
      <div className="dark:bg-[#0f0f0f] bg-white  dark:border-[var(--border-primary)] dark:text-white text-black h-screen scrollable-area relative w-full hidden lg:flex lg:flex-col font-semibold lg:w-60 xl:w-72 p-4 gap-6">
        Participants
      </div>
    );

  return (
    <div className=" dark:bg-[#0f0f0f] bg-white border-l  dark:border-[var(--border-primary)]  text-black h-screen scrollable-area relative w-full hidden lg:flex lg:flex-col  lg:w-60 xl:w-72 p-4 gap-6">
      <div className="">
        <span className="font-semibold text-secondary-foreground">
          Participants - {currentParticipants.length}
        </span>
      </div>
      {currentParticipants.map((participant) => {
        const userName = participant.profiles.username
          ? participant.profiles.username
          : participant.profiles.full_name;
        return (
          <div className="flex gap-3 items-center">
            <div className=" dark:bg-secondary bg-black w-8 h-8 flex items-center text-white justify-center text-md  rounded-full">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-secondary-foreground">{userName}</span>
          </div>
        );
      })}
    </div>
  );
}

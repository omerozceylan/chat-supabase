"use client";

import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { supabase } from "@/supabase/client";

export default function UserInviteCard({
  userName,
  userId,
  roomId,
  participantId,
}) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  if (!userName) return <div></div>;

  const handleAcceptInvite = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("participants")
      .update({ is_invite_accepted: true })
      .eq("id", participantId)
      .select();
    if (!error) setIsAccepted(true);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <div className="w-9 h-9 flex items-center justify-center text-white bg-black dark:bg-secondary rounded-full">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="w-32 truncate overflow-hidden">{userName}</span>
      </div>
      <button
        className={`dark:bg-[#0f0f0f] bg-secondary  border w-20 h-9 flex items-center justify-center transition-all dark:border-[var(--border-primary)] py-1 px-2 rounded-md relative  ${
          isAccepted ? " dark:bg-zinc-200 dark:text-black " : ""
        }`}
      >
        {isAccepted ? (
          <MdOutlineDone className="w-5 h-5" />
        ) : (
          <div onClick={handleAcceptInvite}>
            <span className={` ${isLoading ? "blur-md" : ""}`}>Accept</span>
            {isLoading && (
              <div className="inline-block m-auto w-5 h-5  border-[3px] md:border-[4px] border-t-zinc-300 absolute border-zinc-500 dark:border-white/100 dark:border-t-zinc-600 rounded-full animate-spin inset-0"></div>
            )}
          </div>
        )}
      </button>
    </div>
  );
}

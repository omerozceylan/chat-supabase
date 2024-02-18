"use client";

import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { supabase } from "@/supabase/client";

export default function UserInviteCard({ userName }) {
  const [isAccepted, setIsAccepted] = useState(false);
  if (!userName) return <div></div>;

  const handleAcceptInvite = async () => {
    const { data, error } = await supabase.from("participants").update([]);
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
        onClick={() => {
          setIsAccepted(!isAccepted);
        }}
        className={`dark:bg-[#0f0f0f] bg-secondary  border w-20 h-9 flex items-center justify-center transition-all dark:border-[var(--border-primary)] py-1 px-2 rounded-md ${
          isAccepted ? " dark:bg-zinc-200 dark:text-black " : ""
        }`}
      >
        {isAccepted ? <MdOutlineDone className="w-5 h-5" /> : <div>Accept</div>}
      </button>
    </div>
  );
}

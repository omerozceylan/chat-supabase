import { useContext, useState } from "react";
import { supabase } from "@/supabase/client";

import { Button } from "@/components/ui/button";
import { MainContext } from "@/MainContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function RequestButton({
  isRequested,
  onClick,
  setIsRequested,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    user,
    roomId,
    currentParticipants,
    isUserParticipant,
    currentRoomName,
  } = useContext(MainContext);

  const relationUserToTheRoom = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("participants")
      .insert([{ room_id: roomId, user_id: user.id }])
      .select();

    setIsLoading(false);

    if (error) return;

    setIsRequested(true);
  };

  const buttonsByIfRequested = {
    false: (
      <Button
        className="dark:hover:bg-white/5 border border-[var(--border-primary)] bg-[#0f0f0f]
      dark:text-white  relative px-3 h-8 mt-2 "
        onClick={() => relationUserToTheRoom()}
      >
        <div className={`${isLoading ? "blur-sm" : ""} `}>Request</div>

        {isLoading && (
          <div className="inline-block m-auto w-5 h-5  border-[3px] md:border-[4px] border-t-zinc-300 absolute border-zinc-500 dark:border-white/100 dark:border-t-zinc-600 rounded-full animate-spin inset-0"></div>
        )}
      </Button>
    ),
    true: (
      <Button className="bg-zinc-800 opacity-50 cursor-default border-zinc-800 hover:bg-zinc-800 dark:text-white  relative px-3 h-8 mt-2">
        Requested
      </Button>
    ),
  };

  return <div>{buttonsByIfRequested[isRequested]}</div>;
}

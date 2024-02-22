import { MainContext } from "@/MainContext";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useRef, useState } from "react";
import { supabase } from "@/supabase/client";

export default function NoneParticipantUserView() {
  const [isRequested, setIsRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    user,
    roomId,
    currentParticipants,
    isUserParticipant,
    currentRoomName,
  } = useContext(MainContext);

  const infoTextByRequestState = {
    true: (
      <div className="dark:text-white/40 text-black/40">
        Awaiting acceptance; anyone in the room may accept.{" "}
      </div>
    ),
    false: (
      <span className="dark:text-white/40 text-black/40">
        Submit a request to enter the room
      </span>
    ),
  };

  useEffect(() => {
    const checkIfRequested = async () => {
      const { data, error } = await supabase
        .from("participants")
        .select()
        .eq("room_id", roomId)
        .eq("user_id", user.id);

      if (data.length <= 0) {
        setIsRequested(false);
        return;
      }
      setIsRequested(true);
    };

    checkIfRequested();
  }, []);

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
  return (
    <div className="flex flex-col  items-center h-full justify-center ">
      <span className="dark:text-white font-semibold">{currentRoomName}</span>
      {infoTextByRequestState[isRequested]}
      <Button
        onClick={() => {
          relationUserToTheRoom();
        }}
        className={`${
          isRequested
            ? "bg-zinc-800 cursor-default border-zinc-800 hover:bg-zinc-800"
            : "dark:hover:bg-white/5 border border-[var(--border-primary)] bg-[#0f0f0f]"
        }  dark:text-white  relative px-3 h-8 mt-2`}
      >
        {isRequested ? (
          <div>Requested</div>
        ) : (
          <>
            <div className={`${isLoading ? "blur-sm" : ""} `}>Request</div>
            {isLoading && (
              <div className="inline-block m-auto w-5 h-5  border-[3px] md:border-[4px] border-t-zinc-300 absolute border-zinc-500 dark:border-white/100 dark:border-t-zinc-600 rounded-full animate-spin inset-0"></div>
            )}
          </>
        )}
      </Button>
    </div>
  );
}

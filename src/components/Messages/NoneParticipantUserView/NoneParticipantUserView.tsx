"use client";

import { MainContext } from "@/MainContext";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useRef, useState } from "react";
import { supabase } from "@/supabase/client";
import RequestButton from "../RequestButton/RequestButton";
import { Skeleton } from "@/components/ui/skeleton";

export default function NoneParticipantUserView() {
  const [isRequested, setIsRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      const { data, error } = await supabase
        .from("participants")
        .select()
        .eq("room_id", roomId)
        .eq("user_id", user.id);

      if (data.length <= 0) {
        setIsRequested(false);
        setIsLoading(false);
        return;
      }
      setIsRequested(true);
      setIsLoading(false);
    };

    checkIfRequested();
  }, []);

  return (
    <div className="flex flex-col  items-center h-full justify-center ">
      {isLoading ? (
        <div className="flex flex-col gap-5 items-center">
          <Skeleton className="w-[300px] h-[20px] rounded-full" />
          <Skeleton className="w-[350px] h-[20px] rounded-full" />
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </div>
      ) : (
        <>
          <span className="dark:text-white font-semibold transition-all">
            {currentRoomName}
          </span>
          {infoTextByRequestState[isRequested]}
          <RequestButton
            isRequested={isRequested}
            setIsRequested={setIsRequested}
          />
        </>
      )}
    </div>
  );
}

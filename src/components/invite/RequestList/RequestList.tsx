import UserInviteCard from "@/components/invite/UserInviteCard/UserInviteCard";
import { useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import { MainContext } from "@/MainContext";

export default function RequestList() {
  const { roomId } = useContext(MainContext);
  const [enterRequests, setEnterRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataStatus, setDataStatus] = useState("empty");

  const getEnterRequests = async () => {
    setIsLoading(true);

    const { data } = await supabase
      .from("participants")
      .select("*,profiles(*)")
      .eq("room_id", roomId)
      .eq("is_invite_accepted", false);

    setEnterRequests(data);
    if (data.length > 0) setDataStatus("notEmpty");
    setIsLoading(false);
  };

  useEffect(() => {
    getEnterRequests();
  }, []);

  const viewsByDataStatus = {
    empty: (
      <div className="w-full flex justify-start dark:text-white/40 text-black/40">
        Empty (No one wants to chat with you lol)
      </div>
    ),
    notEmpty: (
      <div>
        <div>
          {isLoading && (
            <div className="dark:text-white/40 text-black/40">loading...</div>
          )}
          {enterRequests &&
            enterRequests.map((req) => {
              return (
                <UserInviteCard
                  userName={
                    req.profiles.username
                      ? req.profiles.username
                      : req.profiles.full_name
                  }
                  roomId={req.room_id}
                  userId={req.user_id}
                  participantId={req.id}
                />
              );
            })}
        </div>
      </div>
    ),
  };

  return <>{viewsByDataStatus[dataStatus]}</>;
}

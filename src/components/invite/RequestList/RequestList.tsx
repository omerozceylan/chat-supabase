import UserInviteCard from "@/components/invite/UserInviteCard/UserInviteCard";
import { useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import { MainContext } from "@/MainContext";

export default function RequestList() {
  const { roomId } = useContext(MainContext);
  const [enterRequests, setEnterRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getEnterRequests = async () => {
    setIsLoading(true);

    const { data } = await supabase
      .from("participants")
      .select("*,profiles(*)")
      .eq("room_id", roomId)
      .eq("is_invite_accepted", false);

    setEnterRequests(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getEnterRequests();
  }, []);

  return (
    <div>
      <div>
        {isLoading && (
          <div className="text-slate-500 dark:text-slate-400">loading...</div>
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
  );
}

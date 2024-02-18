import UserInviteCard from "@/components/invite/UserInviteCard/UserInviteCard";
import { useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import { MainContext } from "@/MainContext";

export default function RequestList() {
  const { roomId } = useContext(MainContext);
  const [enterRequest, setEnterRequest] = useState([]);

  const getEnterRequests = async () => {
    const { data } = await supabase
      .from("participants")
      .select("*,profiles(*)")
      .eq("room_id", roomId)
      .eq("is_invite_accepted", false);

    setEnterRequest(data);
  };

  useEffect(() => {
    getEnterRequests();
  }, []);

  return (
    <div>
      {" "}
      {enterRequest &&
        enterRequest.map((req) => {
          return (
            <UserInviteCard
              userName={
                req.profiles.username
                  ? req.profiles.username
                  : req.profiles.full_name
              }
            />
          );
        })}
    </div>
  );
}

"use client";

import { supabase } from "@/supabase/client";
import { useEffect } from "react";

async function fetchMessagesByRoomId(roomId: any) {
  let { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("room_id", roomId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching messages", error);
    return [];
  }

  return messages;
}

export default function Room() {
  useEffect(() => {
    async function someFunction() {
      try {
        const messages = await fetchMessagesByRoomId(
          "cea9d03d-5812-4e36-80a3-82a5fdc7287f"
        );
        return messages;
      } catch (error) {
        console.error("Error fetching messages", error);
        return [];
      }
    }
    const data = someFunction();
    console.log(data);
  }, []);
  return <div></div>;
}

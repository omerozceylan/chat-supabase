"use client";

import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";
import { ChatContainer } from "@/components";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

async function fetchMessagesByRoomId(roomId: any) {
  const { data: messages, error } = await supabase
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

export default function RoomById() {
  const [messages, setMessages] = useState([]);

  async function setFetchedMessages() {
    try {
      const messages = await fetchMessagesByRoomId(
        "cea9d03d-5812-4e36-80a3-82a5fdc7287f"
      );
      setMessages(messages);
      return messages;
    } catch (error) {
      console.error("Error fetching messages", error);
      return [];
    }
  }
  useEffect(() => {
    setFetchedMessages();
  }, []);

  const pathName = usePathname();
  const slug = pathName.split("/").reverse()[0];

  return <div>{/* <ChatContainer messages={messages} /> */}</div>;
}

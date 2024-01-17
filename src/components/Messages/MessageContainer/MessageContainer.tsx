"use client";

import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";
import { ChatContainer } from "@/components";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function MessageContainer({ activeTabId }) {
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState();
  const pathName = usePathname();
  // const id = pathName.split("/").reverse()[0];

  const fetchMessagesByParticipantsId = async (id) => {
    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .eq("id", id);
    fetchMessages(data[0].room_id);
    // setRoomId(data[0].room_id);
  };

  const fetchMessages = async (roomId: any) => {
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching messages", error);
      return [];
    }
    console.log(messages);
    setMessages(messages);
  };

  useEffect(() => {
    fetchMessagesByParticipantsId(activeTabId);
  }, [activeTabId]);

  return (
    <div className="bg-white min-h-screen text-black">
      <div>fadsfs</div>
      {<ChatContainer messages={messages} />}
    </div>
  );
}

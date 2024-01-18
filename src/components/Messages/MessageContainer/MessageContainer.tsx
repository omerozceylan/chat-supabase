"use client";

import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";
import { ChatContainer } from "@/components";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function MessageContainer({ activeTabId }) {
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  useEffect(() => {
    if (activeTabId) {
      fetchMessagesByParticipantsId(activeTabId);
    } else {
      setIsLoading(false);
    }
  }, [activeTabId]);

  return (
    <div>
      {isLoading ? (
        <div className="flex w-full h-screen items-center justify-center bg-white">
          <div className="inline-block w-7 h-7 border-4 border-white/30 border-t-black rounded-full animate-spin duration-200"></div>
        </div>
      ) : (
        <div className="bg-white min-h-screen text-black ">
          {activeTabId ? (
            <ChatContainer messages={messages} />
          ) : (
            <div>Start talking !</div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";
import { MessageView, Spin } from "@/components";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function MessageContainer({ activeTabId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState();

  const fetchMessagesByParticipantsId = async (id) => {
    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .eq("id", id);
    setCurrentRoomId(data[0].room_id);
    fetchMessages(data[0].room_id);
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
    setMessages(messages);
    setIsLoading(false);
  };
  console.log("current room id " + currentRoomId);
  supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${currentRoomId}`,
      },
      ({ new: data }) => {
        setMessages([...messages, data]);
        console.log(messages);
      }
    )
    .subscribe();

  useEffect(() => {
    if (activeTabId) {
      fetchMessagesByParticipantsId(activeTabId);
    } else {
      setIsLoading(false);
    }
  }, [activeTabId]);

  return (
    <div>
      <Spin isLoading={isLoading} bgColor="bg-white" />

      {!isLoading && (
        <div className="bg-white min-h-screen text-black p-6 pt-4 ">
          {activeTabId ? (
            <MessageView messages={messages} />
          ) : (
            <div>Start talking !</div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";
// import { css } from '@emotion/react'
// import ScrollToBottom from "react-scroll-to-bottom";
import { supabase } from "@/supabase/client";
import { useContext, useEffect, useState } from "react";
import { MessageView, MessageInputContainer, Spin } from "@/components";
import RoomDetailSection from "@/components/Room/RoomDetailSection/RoomDetailSection";
import { MyContext } from "@/Context";

export default function MessageContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const [currentRoomName, setCurrentRoomName] = useState();

  const { activeTabId, user, roomId, setRoomId } = useContext(MyContext);

  const fetchRoomByParticipantsId = async (id: any) => {
    const { data, error } = await supabase
      .from("participants")
      .select("*,rooms(*)")
      .eq("id", id);
    setCurrentRoomName(data[0].rooms.room_name);
    setRoomId(data[0].room_id);
    fetchMessages(data[0].room_id);
  };

  const fetchMessages = async (roomId: any) => {
    setIsLoading(true);
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", roomId);
    if (error) {
      console.error("Error fetching messages", error);
      return [];
    }

    setMessages(messages);
    setIsLoading(false);
  };

  supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${roomId}`,
      },
      ({ new: data }) => {
        setMessages([...messages, data]);
      }
    )
    .subscribe();

  useEffect(() => {
    if (activeTabId) {
      fetchRoomByParticipantsId(activeTabId);
    } else {
      setIsLoading(false);
    }
  }, [activeTabId]);

  if (activeTabId === 0)
    return <div className="h-screen bg-white text-black"></div>;

  return (
    <div className="bg-white h-full">
      {!isLoading && (
        <div className="bg-white text-black h-screen flex flex-col">
          <Spin isLoading={isLoading} bgColor="bg-white" />

          <div className="h-24">
            {currentRoomName && (
              <RoomDetailSection
                roomId={roomId}
                currentRoomName={currentRoomName}
              />
            )}
          </div>
          <div className=" py-1  h-full overflow-hidden">
            <MessageView messages={messages} />
          </div>

          <div className="bg-white p-6 pt-1 mt-2">
            <MessageInputContainer
              onSubmit={(message) => {
                handleMessageSending(message);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

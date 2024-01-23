"use client";
// import { css } from '@emotion/react'
// import ScrollToBottom from "react-scroll-to-bottom";
import { supabase } from "@/supabase/client";
import { useEffect, useRef, useState } from "react";
import { MessageView, MessageInputContainer, Spin } from "@/components";
import RoomDetailSection from "@/components/Room/RoomDetailSection/RoomDetailSection";

export default function MessageContainer({ activeTabId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState();
  const [currentRoomName, setCurrentRoomName] = useState();

  const messageContainerRef = useRef(null);

  const fetchRoomByParticipantsId = async (id) => {
    const { data, error } = await supabase
      .from("participants")
      .select("*,rooms(*)")
      .eq("id", id);
    setCurrentRoomName(data[0].rooms.room_name);
    setCurrentRoomId(data[0].room_id);
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
    // console.log(messages);
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
        filter: `room_id=eq.${currentRoomId}`,
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

  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleMessageSending = async (message) => {
    const currentUserName = await user?.user_metadata.username;
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          message: message,
          user_name: currentUserName,
          room_id: currentRoomId,
        },
      ])
      .select();
    if (error) alert(error);
  };

  function scrollToBottom() {
    window.scrollTo({
      top: messageContainerHeight(),
      behavior: "smooth",
    });
    // console.log("scroll edildi");
  }

  useEffect(() => {
    scrollToBottom();

    console.log("scroll edildi: ", messageContainerHeight());
  }, [messages]);

  const messageContainerHeight = () => {
    if (!messageContainerRef.current) return 0;
    return messageContainerRef.current.scrollHeight;
  };

  return (
    <div className="bg-white h-full">
      {!isLoading && (
        <div className="bg-white text-black h-screen flex flex-col">
          <Spin isLoading={isLoading} bgColor="bg-white" />

          <div className="h-24">
            {currentRoomName && (
              <RoomDetailSection
                roomId={currentRoomId}
                currentRoomName={currentRoomName}
              />
            )}
          </div>
          <div className=" py-1  h-full overflow-hidden">
            {activeTabId ? (
              <MessageView user={user} messages={messages} />
            ) : (
              <div>Start talking !</div>
            )}{" "}
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

{
  /* <div className="  text-black  pt-0 bg-white flex h-screen flex-col justify-between">
      <div ref={messageContainerRef} className="overflow-auto pb-6 h-full">
        <Spin isLoading={isLoading} bgColor="bg-white" />
        {!isLoading && (
          <div className="flex justify-between flex-col">
            <div className="h-24 ">
              {currentRoomName && (
                <RoomDetailSection currentRoomName={currentRoomName} />
              )}
            </div>
            <div className="flex  justify-center py-3 text-sm font-light h-[60px]"></div>
            <div className="px-6 pb-0 h-full">
              {activeTabId ? (
                <MessageView user={user} messages={messages} />
              ) : (
                <div>Start talking !</div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 pt-1">
        <MessageInputContainer
          onSubmit={(message) => {
            handleMessageSending(message);
          }}
        />
      </div>
    </div> */
}

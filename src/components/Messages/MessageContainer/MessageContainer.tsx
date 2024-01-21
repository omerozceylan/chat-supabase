"use client";
// import { css } from '@emotion/react'
// import ScrollToBottom from "react-scroll-to-bottom";
import { supabase } from "@/supabase/client";
import { useEffect, useRef, useState } from "react";
import { MessageView, MessageInputContainer, Spin } from "@/components";

export default function MessageContainer({ activeTabId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState();
  const messageContainerRef = useRef(null);

  const fetchRoomByParticipantsId = async (id) => {
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
    <div className="  text-black p-6 pt-0 bg-white flex h-screen flex-col justify-between">
      <div ref={messageContainerRef} className="overflow-auto pb-6 h-full">
        <Spin isLoading={isLoading} bgColor="bg-white" />
        {!isLoading && (
          <div>
            <div className="flex  justify-center py-3 text-sm font-light"></div>

            {activeTabId ? (
              <MessageView user={user} messages={messages} />
            ) : (
              <div>Start talking !</div>
            )}
          </div>
        )}
      </div>
      <div className="">
        <MessageInputContainer
          onSubmit={(message) => {
            handleMessageSending(message);
          }}
        />
      </div>
    </div>
  );
}

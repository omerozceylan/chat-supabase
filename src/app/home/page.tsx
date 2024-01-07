"use client";

import { supabase } from "@/supabase/client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [user, setUser] = useState();
  const [allMessages, setAllMessages] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };
    getUser();

    const getAllMessages = async () => {
      let { data: messages, error } = await supabase
        .from("messages")
        .select("*");
      console.log(messages);
      setAllMessages(messages ? messages : error);
    };
    getAllMessages();
  }, []);

  // const handleLogOut = async () => {

  // };

  const authActionButtons = {
    loggedIn: (
      <button
        onClick={() => supabase.auth.signOut()}
        className="bg-red-700  px-4 py-1 hover:bg-red-900 hover:transition-all "
      >
        Sign Out
      </button>
    ),
    loggedOut: (
      <div className="flex gap-2">
        <Link href={"/auth/login"}>
          <button className="bg-red-700  px-4 py-1 hover:bg-red-900 hover:transition-all ">
            Log in
          </button>
        </Link>
        <Link href={"/auth/register"}>
          <button className="bg-red-700  px-4 py-1 hover:bg-red-900 hover:transition-all ">
            Register
          </button>
        </Link>
      </div>
    ),
  };
  const status = useMemo(() => {
    return user
      ? authActionButtons["loggedIn"]
      : authActionButtons["loggedOut"];
  }, [user]);

  const handleInserts = (payload) => {
    const { new: message, errors } = payload;
    if (errors) {
      alert(errors);
      return;
    }

    setAllMessages([...allMessages, message]);
  };

  supabase
    .channel("messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      handleInserts
    )
    .subscribe();

  return (
    <>
      {isLoading && (
        <div className="flex w-full h-screen items-center justify-center">
          <div className="inline-block w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin duration-200"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex justify-between p-6">
            Home
            {status}
          </div>
          <div className="px-6">
            {user ? <div>{user.email}</div> : <div>user not found</div>}
            <div className="mt-20 flex flex-col items-center gap-2 justify-center">
              {allMessages &&
                allMessages.map((message) => {
                  return (
                    <div key={message.id}>
                      {message.user_name}:{message.message}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

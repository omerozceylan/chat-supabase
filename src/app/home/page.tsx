"use client";

import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [user, setUser] = useState();
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

  return (
    <>
      {isLoading && (
        <div className="flex w-full h-screen items-center justify-center">
          <div className="inline-block w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin duration-500"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex justify-between p-6">
            Home
            {user
              ? authActionButtons["loggedIn"]
              : authActionButtons["loggedOut"]}
          </div>
          <div className="px-6">
            {user ? <div>{user.email}</div> : <div>user not found</div>}
          </div>
        </>
      )}
    </>
  );
}

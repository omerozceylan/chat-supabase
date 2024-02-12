"use client";

import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { MainContext, UserCardContext } from "@/Context";
import { Separator } from "@/components/ui/separator";
import { IoMdSettings } from "react-icons/io";
import { ToggleTheme } from "@/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ColorPicker } from "@/components";
import { useTheme } from "next-themes";

import { supabase } from "@/supabase/client";

export default function UserCard() {
  const { user } = useContext(MainContext);
  const router = useRouter();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  }

  if (!user) return <div></div>;

  const userName =
    user.app_metadata.provider === "google"
      ? user.user_metadata.full_name
      : user.user_metadata.username;

  return (
    <div className="w-full outline-none border-none">
      <Popover>
        <PopoverTrigger className="w-full outline-none">
          <div className="flex items-center justify-between gap-3 border  dark:border-[var(--border-primary)]  relative p-2 cursor-pointer text-sm dark:bg-black bg-white shadow rounded-lg mb-2">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 bg-black dark:bg-secondary rounded-full text-white flex text-base items-center justify-center">
                {userName.charAt(0).toUpperCase()}
              </span>
              {userName}
            </div>
            <IoMdSettings className="mr-1 text-foreground/50 w-4 h-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={8}
          className="dark:bg-black bg-white flex w-64 flex-col border  dark:border-[var(--border-primary)] p-0 select-none"
        >
          <div className="p-1 px-3 flex flex-col gap-y-2 mb-2">
            <span className="font-semibold py-1">User Settings</span>
            <div className="w-7 h-7 text-white bg-slate-800 flex items-center justify-center rounded-md">
              <ToggleTheme />
            </div>
            <span className="text-sm">Choose Your Theme.</span>
            <ColorPicker />
            <span className="text-sm"> </span>
          </div>

          <Separator />
          <div className="flex w-full p-1">
            <div
              className="dark:bg-black bg-white py-2 px-3  hover:bg-zinc-100 text-red-400 transition-all w-full rounded-md cursor-pointer "
              onClick={() => {
                signOut();
                localStorage.clear();
                document.documentElement.className = "light gray";
              }}
            >
              Log out
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

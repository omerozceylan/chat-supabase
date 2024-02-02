import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { MainContext } from "@/Context";
import { Switch } from "@/components/ui/switch";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { supabase } from "@/supabase/client";

export default function UserCard() {
  const { user } = useContext(MainContext);
  const router = useRouter();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  }

  if (!user) return <div></div>;

  return (
    <div className="w-full outline-none border-none">
      <Popover>
        <PopoverTrigger className="w-full outline-none">
          <div className="flex gap-3 items-center relative p-2 cursor-pointer text-sm bg-white shadow rounded-lg mb-2">
            <FaUserCircle className="w-8 h-8" />
            {user.app_metadata.provider === "google" ? (
              user.user_metadata.full_name
            ) : (
              <div> @{user.user_metadata.username}</div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-zinc-50 flex w-64 flex-col gap-3 py-2 px-2">
          <span className="font-semibold">User Settings</span>
          <div className="flex items-center gap-1 ">
            <div className="bg-blue-500  h-6 w-6 hover:bg-blue-400 transition-all cursor-pointer "></div>
            <div className="bg-pink-500  h-6 w-6 hover:bg-pink-400 transition-all cursor-pointer "></div>
            <div className="bg-slate-800  h-6 w-6 hover:bg-slate-600 transition-all cursor-pointer "></div>
          </div>
          <span className="flex items-center">
            Use my profile color as theme. <Switch />{" "}
          </span>

          <div
            className="bg-white border p-1 px-3 hover:text-red-400 hover:bg-zinc-50 transition-all rounded-md cursor-pointer "
            onClick={() => {
              signOut();
            }}
          >
            Log out
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

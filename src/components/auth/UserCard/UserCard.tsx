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

import { ColorPicker } from "@/components";

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
          <div className="flex gap-3 items-center relative p-2 cursor-pointer text-sm bg-[var(--bg-main-primary)] shadow rounded-lg mb-2">
            <span className="h-8 w-8 bg-[var(--bg-main)] rounded-full text-white flex text-base items-center justify-center">
              {userName.charAt(0).toUpperCase()}
            </span>
            {userName}
          </div>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={8}
          className="bg-[var(--bg-main-secondary)] flex w-64 flex-col gap-3 py-2 px-2"
        >
          <span className="font-semibold">User Settings</span>
          Set your avatar color.
          <ColorPicker />
          <span className="flex items-center">
            Use my avatar color as theme. <Switch />{" "}
          </span>
          <div
            className="bg-[var(--bg-main-primary)] border p-1 px-3 hover:text-red-400 hover:bg-[var(--bg-main-secondary)] transition-all rounded-md cursor-pointer "
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

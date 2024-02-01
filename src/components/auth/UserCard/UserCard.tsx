import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { MainContext } from "@/Context";

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
        <PopoverContent className="bg-zinc-50 px-2 py-2">
          <div>selam</div>
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

import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { MainContext } from "@/Context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full outline-none">
          <div className="flex gap-3 items-center relative p-2 cursor-pointer text-sm bg-white shadow rounded-lg mb-2">
            <FaUserCircle className="w-8 h-8" />
            {user.app_metadata.provider === "google" ? (
              user.user_metadata.full_name
            ) : (
              <div> @{user.user_metadata.username}</div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}
            className="text-red-500 hover:text-red-500 "
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

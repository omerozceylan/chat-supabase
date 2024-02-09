import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";
import { PiDotsThreeBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useContext, useState } from "react";
import { MainContext } from "@/Context";

const theme = "greenTheme";

const classByTheme = {
  greenTheme: {
    button: "",
    activeButton: "bg-[#22C55F] hover:bg-green-600",
  },
};

export default function RoomCard({ roomName, id, onLeave }) {
  const { activeTabId } = useContext(MainContext);

  const isActive = id == activeTabId;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      className={`flex items-center text-black gap-3  group rounded-lg p-2 transition-all overflow-hidden whitespace-nowrap ${
        isActive
          ? "bg-primary dark:bg-primary/80 text-primary-foreground hover:bg-primary/90"
          : "hover:bg-primary/80  dark:text-foreground hover:text-primary-foreground"
      }`}
    >
      <div className="flex justify-between  w-full px-2 pr-1">
        <div className={`overflow-hidden`}>{roomName}</div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <div className="hidden group-hover:block ">
              <PiDotsThreeBold className="w-6 h-6" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" border border-input">
            <DropdownMenuItem
              onClick={() => {
                onLeave(id);
              }}
              className="text-red-500 cursor-pointer hover:text-red-500"
            >
              Leave
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

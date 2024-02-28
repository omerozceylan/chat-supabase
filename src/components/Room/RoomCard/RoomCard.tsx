import { PiDotsThreeBold } from "react-icons/pi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useContext, useEffect, useState } from "react";
import { MainContext } from "@/MainContext";

export default function RoomCard({ roomName, id, onLeave }) {
  const { activeTabId } = useContext(MainContext);
  const [isActive, setIsActive] = useState(id == activeTabId);

  // useEffect(() => {
  //   setIsActive
  // }, [activeTabId]);

  return (
    <div
      className={`flex items-center text-black gap-3  group rounded-lg p-2 transition-all overflow-hidden whitespace-nowrap ${
        isActive
          ? "bg-neutral-800 dark:bg-neutral-800 text-white hover:bg-neutral-700"
          : "hover:bg-neutral-700  dark:text-white hover:text-white"
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
          <DropdownMenuContent className="dark:bg-[#0f0f0f] border dark:border-[var(--border-primary)]  ">
            <DropdownMenuItem
              onClick={() => {
                onLeave(id);
              }}
              className="text-red-500 dark:bg-[#0f0f0f] hover:dark:bg-[#0f0f0f] cursor-pointer "
            >
              Leave
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

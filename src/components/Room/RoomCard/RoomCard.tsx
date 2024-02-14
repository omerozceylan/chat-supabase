import { PiDotsThreeBold } from "react-icons/pi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useContext } from "react";
import { MainContext } from "@/MainContext";

export default function RoomCard({ roomName, id, onLeave }) {
  const { activeTabId } = useContext(MainContext);

  const isActive = id == activeTabId;

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
          <DropdownMenuContent className=" border dark:border-[var(--border-primary)]  ">
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

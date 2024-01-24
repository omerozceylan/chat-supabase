import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";
import { PiDotsThreeBold } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function RoomCard({ roomName, id, activeTabId, onLeave }) {
  const isActive = id == activeTabId;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      className={`flex items-center text-black gap-3 group rounded-lg p-2  hover:bg-gray-200 ${
        isActive
          ? "bg-black text-white transition-all hover:bg-slate-800"
          : "hover:bg-gray-200"
      }`}
    >
      <div className="flex justify-between  w-full">
        <div className="flex items-center gap-3">
          <FaRegMessage />
          <div>{roomName}</div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <div className="hidden group-hover:block ">
              <PiDotsThreeBold className="w-6 h-6" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                onLeave(id);
              }}
              className="text-red-500 hover:text-red-500"
            >
              Leave
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-3">
              <span>Edit Title</span> <Badge variant="outline">Owner</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem>Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

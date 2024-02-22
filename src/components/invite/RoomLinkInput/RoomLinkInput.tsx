"use client";

import { MainContext } from "@/MainContext";
import { useContext } from "react";
import { MdCopyAll } from "react-icons/md";
import { toast } from "sonner";

export default function RoomLinkInput() {
  const { activeTabId } = useContext(MainContext);

  const link = `https://chat-xi-rose.vercel.app/rooms?id=${activeTabId}`;

  return (
    <div className="border dark:border-[var(--border-primary)] px-2 rounded flex justify-between items-center select-text">
      {link}
      <MdCopyAll
        onClick={() => {
          navigator.clipboard.writeText(link);
          toast.success("Link Copied To Clipboard!", {
            className: "dark:bg-[#0f0f0f] bg-white",
          });
        }}
        className="active:text-black  hover:text-zinc-400 dark:active:text-white select-none text-foreground/50 w-5 h-5 cursor-pointer"
      />
    </div>
  );
}

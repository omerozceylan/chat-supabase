import { MainContext } from "@/MainContext";
import { useContext } from "react";
import { MdCopyAll } from "react-icons/md";

export default function RoomLinkInput() {
  const { activeTabId } = useContext(MainContext);

  return (
    <div className="border dark:border-[var(--border-primary)] px-2 rounded flex justify-between items-center select-text">
      https://chat-xi-rose.vercel.app/rooms?id={activeTabId}
      <MdCopyAll className=" text-foreground/50 w-4 h-4 cursor-pointer" />
    </div>
  );
}

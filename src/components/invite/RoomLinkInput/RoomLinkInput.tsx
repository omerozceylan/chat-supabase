import { MainContext } from "@/MainContext";
import { useContext } from "react";
import { MdCopyAll } from "react-icons/md";

export default function RoomLinkInput() {
  const { activeTabId } = useContext(MainContext);

  const link = `https://chat-xi-rose.vercel.app/rooms?id=${activeTabId}`;

  return (
    <div className="border dark:border-[var(--border-primary)] px-2 rounded flex justify-between items-center select-text">
      {link}
      <MdCopyAll
        onClick={() => {
          navigator.clipboard.writeText(link);
        }}
        className="active:text-black dark:active:text-white select-none text-foreground/50 w-4 h-4 cursor-pointer"
      />
    </div>
  );
}

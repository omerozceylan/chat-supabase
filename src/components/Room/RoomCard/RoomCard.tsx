import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";

export default function RoomCard({ roomName, id, activeTabId }) {
  const isActive = id == activeTabId;

  return (
    <div
      className={`flex items-center text-black gap-3  rounded-lg p-2 hover:bg-gray-200 ${
        isActive
          ? "bg-black text-white transition-all hover:bg-slate-800"
          : "hover:bg-gray-200"
      }`}
    >
      <FaRegMessage />
      <div>{roomName}</div>
    </div>
  );
}

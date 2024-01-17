import Link from "next/link";

export default function RoomCard({ roomName, id, activeTabId }) {
  const isActive = id == activeTabId;
  console.log(isActive);
  console.log("id : ", id, "activeTabId: ", activeTabId);
  return (
    <div
      className={`flex items-center text-black justify-between rounded-lg p-2 hover:bg-gray-200 ${
        isActive
          ? "bg-black text-white transition-all hover:bg-slate-800"
          : "hover:bg-gray-200"
      }`}
    >
      <div>{roomName}</div>
    </div>
  );
}

import Link from "next/link";

export default function RoomCard({ roomName, id }) {
  return (
    <Link
      className="flex items-center text-black justify-between rounded-lg p-2 hover:bg-gray-200"
      href={`/rooms/${id}`}
    >
      <div>{roomName}</div>
    </Link>
  );
}

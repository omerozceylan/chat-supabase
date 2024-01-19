import { FaUserCircle } from "react-icons/fa";

export default function UserCard() {
  return (
    <div className="flex gap-3 items-center relative p-2 cursor-pointer text-sm bg-white shadow rounded-lg mb-2">
      <FaUserCircle className="w-8 h-8" />
      Omer Ozceylan
    </div>
  );
}

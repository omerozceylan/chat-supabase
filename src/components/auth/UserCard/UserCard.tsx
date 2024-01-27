import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { MyContext } from "@/Context";

export default function UserCard({ userName }) {
  return (
    <div className="flex gap-3 items-center relative p-2 cursor-pointer text-sm bg-white shadow rounded-lg mb-2">
      <FaUserCircle className="w-8 h-8" />@{userName}
    </div>
  );
}

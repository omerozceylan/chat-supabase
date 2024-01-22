import { useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

export default function RoomDetailSection({ currentRoomName }) {
  const [isEditing, setIsEditing] = useState(false);

  const isEditingButtonVariants = {
    false: (
      <TbEdit
        onClick={() => {
          setIsEditing(!isEditing);
        }}
        className="hidden group-hover:block text-black/35"
      />
    ),
    true: (
      <div contentEditable="false" className="flex items-center gap-2">
        <FaCheckCircle
          className="text-green-500 hover:text-green-700"
          onClick={() => {
            setIsEditing(false);
          }}
        />
        <div
          onClick={() => {
            setIsEditing(false);
          }}
          className="flex items-center text-sm rounded-lg border px-2"
        >
          <IoClose className="text-md" />
          Cancel
        </div>
      </div>
    ),
  };

  return (
    <div className=" border-b  z-20 px-6 font-semibold text-md bg-white p-4">
      <div className="flex items-center justify-between">
        <span
          contentEditable={isEditing}
          className={` ${
            isEditing ? "hover:bg-white" : "hover:bg-zinc-100"
          } group transition-all flex gap-2 items-center cursor-pointer focus:border-none outline-none rounded-xl px-2 p-1`}
        >
          <span>{currentRoomName}</span>

          <span> {isEditingButtonVariants[isEditing]}</span>
        </span>
        <PiDotsThreeBold className="cursor-pointer w-6 h-6" />
      </div>
    </div>
  );
}

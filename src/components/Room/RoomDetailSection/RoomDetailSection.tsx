import { useContext, useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useRef } from "react";
import { supabase } from "@/supabase/client";
import { MainContext } from "@/Context";

export default function RoomDetailSection({ currentRoomName, roomId }) {
  const { getRooms, user } = useContext(MainContext);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(currentRoomName);
  const editableAreaRef = useRef(null);

  const isEditingButtonVariants = {
    false: (
      <TbEdit
        onClick={() => {
          setIsEditing(true);
          editableAreaRef.current.focus();
        }}
        className="hidden group-hover:block text-black/35"
      />
    ),
    true: (
      <div contentEditable="false" className="flex items-center gap-2">
        <FaCheckCircle
          className="hover:text-green-900 text-green-700"
          onClick={() => {
            handleSubmitNewRoomName();
          }}
        />
        <div
          onClick={() => {
            setIsEditing(false);
          }}
          className="flex items-center text-sm select-none rounded-lg border px-2"
        >
          <IoClose className="text-md" />
          Cancel
        </div>
      </div>
    ),
  };

  const handleSubmitNewRoomName = async () => {
    if (!editableAreaRef.current) return;
    const text = editableAreaRef.current.innerText;
    setValue(text);
    const trimmedText = text.trim();

    if (!trimmedText) {
      console.error("bos title gonderilemez ! <3");
      return;
    }

    setIsEditing(false);
    const { data, error } = await supabase
      .from("rooms")
      .update({ room_name: trimmedText })
      .eq("id", roomId)
      .select();

    getRooms(user);
  };

  return (
    <div className=" border-b  z-20 px-6 font-semibold text-md bg-white p-4">
      <div className="flex items-center justify-between">
        <span
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmitNewRoomName();
              setIsEditing(false);
            }
          }}
          className={` ${
            isEditing ? "hover:bg-white" : "hover:bg-zinc-100"
          } group transition-all flex gap-2 items-center cursor-pointer focus:border-none outline-none rounded-xl px-2 p-1`}
        >
          <span
            ref={editableAreaRef}
            contentEditable={isEditing}
            className={` outline-none max-w-44 min-w-12  ${
              isEditing ? `border-b-2 border-black` : ``
            }`}
          >
            {currentRoomName}
          </span>

          <span> {isEditingButtonVariants[isEditing]}</span>
        </span>
        <PiDotsThreeBold className="cursor-pointer w-6 h-6" />
      </div>
    </div>
  );
}

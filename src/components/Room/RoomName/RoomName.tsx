import { useContext, useEffect, useState } from "react";
import { MainContext } from "@/MainContext";
import { FaCheckCircle } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useRef } from "react";
import { supabase } from "@/supabase/client";

export default function RoomName() {
  const [isEditing, setIsEditing] = useState(false);
  const { getRooms, currentRoomName, user, roomId, isUserParticipant } =
    useContext(MainContext);
  const [value, setValue] = useState(currentRoomName);
  const editableAreaRef = useRef(null);

  const isEditingButtonVariants = {
    false: (
      <TbEdit
        onClick={() => {
          setIsEditing(true);
          editableAreaRef.current.focus();
        }}
        className="hidden group-hover:block cursor-pointer text-black/35"
      />
    ),
    true: (
      <div contentEditable="false" className="flex items-center gap-2">
        <FaCheckCircle
          className="hover:text-green-900 text-green-700 cursor-pointer"
          onClick={() => {
            handleSubmitNewRoomName();
          }}
        />
        <div
          onClick={() => {
            setIsEditing(false);
          }}
          className="flex items-center text-sm select-none rounded-lg bg-white dark:bg-secondary border dark:border-[var(--border-primary)] px-2 cursor-pointer"
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
    <div>
      <span
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmitNewRoomName();
            setIsEditing(false);
          }
        }}
        className={` ${
          isEditing || !isUserParticipant
            ? "hover:"
            : "hover:bg-zinc-100 hover:text-slate-800 dark:hover:bg-primary/80"
        }  group transition-all text-slate-800 dark:text-secondary-foreground dark:duration-300 flex gap-2 items-center focus:border-none outline-none rounded-xl px-2 p-1`}
      >
        <span
          ref={editableAreaRef}
          contentEditable={isEditing}
          className={` outline-none max-w-44 whitespace-nowrap overflow-hidden ${
            isEditing
              ? `border-b-2 border-black dark:border-white min-w-12`
              : ``
          }`}
        >
          {currentRoomName}
        </span>

        <span className={`${isUserParticipant ? "" : "hidden"}`}>
          {" "}
          {isEditingButtonVariants[isEditing]}
        </span>
      </span>
    </div>
  );
}

import { useContext, useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useRef } from "react";
import { supabase } from "@/supabase/client";
import { TiPlus } from "react-icons/ti";
import { MdContentCopy } from "react-icons/md";
import { MainContext } from "@/Context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <div className=" border-b  z-20 px-6 font-semibold text-md bg-[var(--bg-main-primary)] p-4">
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
            isEditing
              ? "hover:bg-[var(--bg-main-primary)]"
              : "hover:bg-zinc-100"
          } group transition-all flex gap-2 items-center cursor-pointer focus:border-none outline-none rounded-xl px-2 p-1`}
        >
          <span
            ref={editableAreaRef}
            contentEditable={isEditing}
            className={` outline-none max-w-44 whitespace-nowrap overflow-hidden ${
              isEditing ? `border-b-2 border-black min-w-12` : ``
            }`}
          >
            {currentRoomName}
          </span>

          <span> {isEditingButtonVariants[isEditing]}</span>
        </span>
        <div className="flex gap-12 items-center">
          <div>
            <Dialog>
              <DialogTrigger>
                {" "}
                <div className="inline-flex gap-x-2 items-center justify-between rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-8 px-4 py-2 relative transition-colors overflow-hidden before:content-[''] before:absolute before:top-0 before:bottom-0 before:w-1/2 before:bg-gray-50/30 before:blur before:select-none before:translate-x-[-170%] before:skew-x-[-20deg] before:transition-transform before:duration-500 before:ease-in-out hover:before:translate-x-[220%] hover:before:skew-x-[-20deg] bg-[var(--bg-main)] ">
                  <TiPlus />
                  Invite People
                </div>
              </DialogTrigger>
              <DialogContent className="text-black dark:text-white gap-6">
                <DialogHeader>
                  <DialogTitle>
                    Here is your invite code. It will expire in 30 minutes.
                  </DialogTitle>
                  <DialogDescription>
                    <div className=" flex justify-between items-center mt-1 border rounded-md px-2 py-1">
                      <span>zamazingozamazingozamazingozamazingo</span>{" "}
                      <MdContentCopy className="h-4 w-4 cursor-pointer" />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <PiDotsThreeBold className="cursor-pointer w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

import { useContext, useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useRef } from "react";
import { supabase } from "@/supabase/client";
import { TiPlus } from "react-icons/ti";
import { MainContext } from "@/Context";
import { MdCopyAll } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import UserInviteCard from "@/components/invite/UserInviteCard/UserInviteCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
          className="flex items-center text-sm select-none rounded-lg bg-white dark:bg-secondary dark:border dark:border-[var(--border-primary)] px-2"
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
    <div className="z-20 px-6 font-semibold  text-md p-4">
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
              ? "hover:"
              : "hover:bg-zinc-100 hover:text-slate-800 dark:hover:bg-primary/80"
          } group transition-all text-slate-800 dark:text-secondary-foreground dark:duration-300 flex gap-2 items-center cursor-pointer focus:border-none outline-none rounded-xl px-2 p-1`}
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
            <Popover>
              <PopoverTrigger>
                {" "}
                <div className="inline-flex gap-x-2 items-center justify-between rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  h-8 px-4 py-2 relative transition-colors overflow-hidden before:content-[''] before:absolute before:top-0 before:bottom-0 before:w-1/2 before:bg-gray-50/30 before:blur before:select-none before:translate-x-[-170%] before:skew-x-[-20deg] before:transition-transform before:duration-500 before:ease-in-out hover:before:translate-x-[220%] hover:before:skew-x-[-20deg] bg-primary/80 hover:bg-primary  text-primary-foreground ">
                  <TiPlus />
                  Invite People
                </div>
              </PopoverTrigger>
              <PopoverContent
                sideOffset={8}
                className="text-black dark:bg-[#0f0f0f] dark:text-white max-h-96 overflow-y-auto w-96 px-6 py-6 select-none gap-6 dark:border-[var(--border-primary)] "
              >
                <span className=" flex flex-col gap-6">
                  <span className="font-semibold">Invite Link</span>
                  <div className="border dark:border-[var(--border-primary)] px-2 rounded flex justify-between items-center">
                    <span className="">zamazingzamazingzamazingo</span>{" "}
                    <MdCopyAll className=" text-foreground/50 w-4 h-4 cursor-pointer" />
                  </div>
                  <Separator />
                  <span className="font-semibold ">
                    People who request to enter this room
                  </span>
                  <UserInviteCard /> <UserInviteCard />
                  <UserInviteCard /> <UserInviteCard />
                </span>
              </PopoverContent>
            </Popover>
          </div>
          <PiDotsThreeBold className="cursor-pointer dark:text-white w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

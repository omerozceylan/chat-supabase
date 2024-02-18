import { MdCopyAll } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { TiPlus } from "react-icons/ti";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MainContext } from "@/MainContext";
import RequestList from "../RequestList/RequestList";
import { useContext } from "react";

export default function InvitesPopOver() {
  const { activeTabId } = useContext(MainContext);

  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <div className="inline-flex gap-x-2 items-center justify-between rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  h-8 px-4 py-2 relative transition-colors overflow-hidden before:content-[''] before:absolute before:top-0 before:bottom-0 before:w-1/2 before:bg-gray-50/30  before:blur before:select-none before:translate-x-[-170%] before:skew-x-[-20deg] before:transition-transform before:duration-500 before:ease-in-out hover:before:translate-x-[220%] hover:before:skew-x-[-20deg] bg-primary/95 hover:bg-primary  text-primary-foreground ">
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
          <div className="border dark:border-[var(--border-primary)] px-2 rounded flex justify-between items-center select-text">
            https://chat-xi-rose.vercel.app/rooms?id={activeTabId}
            <MdCopyAll className=" text-foreground/50 w-4 h-4 cursor-pointer" />
          </div>
          <Separator className="dark:bg-[var(--border-primary)]" />
          <span className="font-semibold pb-2">
            People who request to enter this room
          </span>
          <RequestList />
        </span>
      </PopoverContent>
    </Popover>
  );
}

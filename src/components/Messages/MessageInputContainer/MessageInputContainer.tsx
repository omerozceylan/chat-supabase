import { Input } from "@/components/ui/input";
import { RiSendPlaneFill } from "react-icons/ri";

export default function MessageInputContainer() {
  return (
    <>
      <div className="flex gap-2 items-cente h-10">
        <Input placeholder="your message" />

        <button className="text-white focus:outline-none   font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 hover:bg-gray-700  border-gray-700 h-full">
          <RiSendPlaneFill className="" />
        </button>
      </div>
    </>
  );
}

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

export default function MessageInputContainer({ onSubmit }: any) {
  const [message, setMessage] = useState(null);
  const [inputValue, setInputValue] = useState();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return;
        onSubmit(message);
        setInputValue("");
        setMessage("");
      }}
    >
      <div className="flex gap-2 items-cente h-10">
        <Input
          value={inputValue}
          placeholder="your message"
          onChange={(event) => {
            const message = event.target.value;
            setInputValue(event.target.value);
            setMessage(message);
          }}
        />

        <button
          type="submit"
          className="text-white focus:outline-none   font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 hover:bg-gray-700  border-gray-700 h-full"
        >
          <RiSendPlaneFill />
        </button>
      </div>
    </form>
  );
}

import { useEffect, useRef } from "react";

export default function MessageView({ user, messages = [] }) {
  const currentUserName = user.user_metadata.username;
  const messageContainerRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    };
    scrollToBottom();
  }, [messages]);

  return (
    <div
      ref={messageContainerRef}
      className="flex flex-col gap-4 p-4 pl-7 h-full overflow-y-auto transition-all"
    >
      {messages.map((data) => {
        const isOwner = data.user_name == currentUserName;

        return (
          <div
            key={data.user_name}
            className={`flex items-end pr-6 ${isOwner ? "justify-end" : ""}`}
          >
            <div
              className={`text-white bg-black rounded-2xl w-8 h-8 flex justify-center items-center ${
                isOwner ? "hidden" : ""
              }`}
            >
              {data.user_name.charAt(0)}
            </div>
            <span className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl text-wrap whitespace-normal break-words max-w-[500px] scroll-mb-80	">
              {data.message}
            </span>
          </div>
        );
      })}
      {/* <div className="h-4 w-4 bg-white p-2"></div> */}
    </div>
  );
}

export default function MessageView({ messages = [] }) {
  return (
    <div className="flex flex-col gap-4 ">
      {messages.map((data) => {
        return (
          <div className="flex items-center">
            <div className="text-white bg-black rounded-2xl w-8 h-8 flex justify-center items-center">
              {data.user_name.charAt(0)}
            </div>
            <span className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl max-w-[50%] whitespace-normal break-words">
              {data.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}

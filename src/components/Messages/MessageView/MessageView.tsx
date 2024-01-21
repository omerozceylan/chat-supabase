export default function MessageView({ user, messages = [] }) {
  const currentUserName = user.user_metadata.username;

  return (
    <div className="flex flex-col gap-4 ">
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
            <span className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl text-wrap whitespace-normal break-words max-w-[500px]">
              {data.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}

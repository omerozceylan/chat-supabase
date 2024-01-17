export default function ChatContainer({ messages = [] }) {
  return (
    <div>
      {messages.map((data) => (
        <div className="flex flex-col gap-2s">
          {data.user_name} : {data.message}
        </div>
      ))}
    </div>
  );
}

export default function ChatContainer({ messages }) {
  return (
    <div>
      {messages.map((data) => (
        <>
          {data.user_name} : {data.message}
        </>
      ))}
    </div>
  );
}

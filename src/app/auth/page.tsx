export default function Auth() {
  return (
    <div className="bg-zinc-50 flex justify-center  items-center h-screen text-black">
      <div className="bg-white p-4 flex flex-col gap-4 rounded-md border">
        To reach chats you have to login.
        <div className="flex justify-end gap-4">
          <button className="">login</button>
          <button className="bg-black text-white px-2 py-1 rounded-md">
            register
          </button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6">
        <div className="text-xl ">You have to register first</div>
        <Link href="/auth/register">
          <button className="bg-red-500 px-1 py-1 text-lg hover:bg-red-200 hover:text-red-500 w-full">
            Auth
          </button>
        </Link>
      </div>
    </div>
  );
}

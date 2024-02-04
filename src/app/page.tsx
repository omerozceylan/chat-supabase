import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[var(--bg-main-primary)] text-black">
      <div className="flex flex-col gap-6">
        <div className="text-xl ">You have to register first</div>
        <Link href="/auth/login">
          <button className="bg-red-500 px-1 py-1 text-lg hover:bg-red-200 hover:text-red-500 w-full transition-all duration-400">
            Auth
          </button>
        </Link>
      </div>
    </div>
  );
}

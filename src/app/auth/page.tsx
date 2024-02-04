"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login");
  }, []);

  return (
    <div className="bg-[var(--bg-main-secondary)] flex justify-center  items-center h-screen text-black"></div>
  );
}

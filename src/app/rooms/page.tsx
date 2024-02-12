"use client";

import { useRouter } from "next/navigation";

export default function Room() {
  const router = useRouter();
  router.push("/rooms/0");

  return <div></div>;
}

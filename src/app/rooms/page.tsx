"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Room() {
  const router = useRouter();

  useEffect(() => {
    router.push("/rooms/0");
  }, []);

  return <div></div>;
}

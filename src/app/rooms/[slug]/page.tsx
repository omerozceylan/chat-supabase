"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function RoomById() {
  const pathName = usePathname();
  const slug = pathName.split("/").reverse()[0];

  return <div></div>;
}

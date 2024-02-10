"use client";
// import { useRouter } from "next/navigation";

export default function hello({ params }) {
  //   const router = useRouter();
  console.log(params.slug);
  return <div className="text-black">{params.slug}fsdfads</div>;
}

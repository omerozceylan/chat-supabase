"use client";

import { RoomCard } from "@/components";
import { supabase } from "@/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChatContainer } from "@/components";
import RoomListContainer from "@/components/Room/RoomListContainer/RoomListContainer";

export default function Room() {
  return (
    <div className="min-h-screen">
      <RoomListContainer />
    </div>
  );
}

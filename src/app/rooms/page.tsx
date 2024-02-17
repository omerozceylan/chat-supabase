"use client";

import { RoomListContainer } from "@/components";
import { useSearchParams } from "next/navigation";
import ColorThemeContext from "@/Context/ColorThemeProvider";
import { MessageContainer } from "@/components";
import ParticipantsContainer from "@/components/Room/ParticipantsContainer/ParticipantsContainer";
import MainContextProvider from "@/MainContext";

export default function Room({ params }) {
  return (
    <div className="flex min-h-screen">
      <MainContextProvider>
        <ColorThemeContext>
          <div className=" min-h-screen">
            <RoomListContainer />
          </div>
          <div className="w-full">
            <MessageContainer />
          </div>
          <div>
            <ParticipantsContainer />
          </div>
        </ColorThemeContext>
      </MainContextProvider>
    </div>
  );
}

"use client";

import { RoomListContainer } from "@/components";
import ColorThemeContext from "@/Context/ColorThemeProvider";
import { MessageContainer } from "@/components";
import ParticipantsContainer from "@/components/Room/ParticipantsContainer/ParticipantsContainer";
import MainContextProvider from "@/MainContext";
import { Suspense } from "react";

export default function Room() {
  return (
    <div className="flex min-h-screen">
      <Suspense fallback={<LoadingFallBack />}>
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
      </Suspense>
    </div>
  );
}

function LoadingFallBack() {
  return <div>loading</div>;
}

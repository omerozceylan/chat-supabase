"use client";

import { ColorContext } from "@/Context/ColorThemeProvider";
import { useTheme } from "next-themes";
import { use, useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

export default function ColorPicker() {
  const { colors, checkedBoxId, setCheckedBoxId } = useContext(ColorContext);

  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-1 ">
      {colors.map(({ color, name, id }) => {
        return (
          <Box
            id={id}
            color={color}
            name={name}
            checkedBoxId={checkedBoxId}
            onClick={(color, id) => {
              document.documentElement.className = `${color} ${theme}`;
              setCheckedBoxId(id);
              localStorage.setItem("colorThemeId", id);
            }}
            key={id}
          />
        );
      })}
    </div>
  );
}

const Box = ({ id, color, onClick, checkedBoxId, name }) => {
  const isCheck = id == checkedBoxId;

  return (
    <div>
      <div
        onClick={() => {
          onClick(name, id);
        }}
        className={`rounded-sm ${color}  border-[2px] shadow-lg h-7 w-7 flex justify-center items-center active:scale-95  transition-all cursor-pointer select-none`}
      >
        <span className={`${isCheck ? "" : "hidden"}`}>
          <FaCheck className="w-3 h-3 text-white " />
        </span>
      </div>
    </div>
  );
};

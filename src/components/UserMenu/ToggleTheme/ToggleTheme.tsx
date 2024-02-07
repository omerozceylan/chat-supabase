import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoSunny } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";

export default function ToggleTheme() {
  const { setTheme } = useTheme();
  const theme = localStorage.getItem("theme");

  const svgByTheme = {
    dark: (
      <IoSunny
        className="w-5 h-5 text-white cursor-pointer"
        onClick={() => {
          setTheme("light");
        }}
      />
    ),
    light: (
      <MdDarkMode
        className="w-5 h-5 text-white cursor-pointer"
        onClick={() => {
          setTheme("dark");
        }}
      />
    ),
  };

  return <div>{svgByTheme[theme]}</div>;
}

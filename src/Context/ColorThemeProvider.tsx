"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createContext } from "react";

const colors = [
  {
    id: 4,
    name: "gray",
    color: "bg-gray-500",
  },
  {
    id: 1,
    name: "red",
    color: "bg-red-500",
  },

  {
    id: 3,
    name: "green",
    color: "bg-green-500",
  },
];

export const ColorContext = createContext("");

export default function ColorThemeContext({ children }) {
  const { theme } = useTheme();
  const [checkedBoxId, setCheckedBoxId] = useState();

  useEffect(() => {
    const id = localStorage.getItem("colorThemeId")
      ? localStorage.getItem("colorThemeId")
      : 4;

    const colorById = colors.find((color) => color.id == id).name;

    setCheckedBoxId(id);
    document.documentElement.className = `${colorById} ${theme}`;
  }, []);

  return (
    <ColorContext.Provider value={{ colors, checkedBoxId, setCheckedBoxId }}>
      {children}
    </ColorContext.Provider>
  );
}

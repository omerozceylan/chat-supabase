import { useTheme } from "next-themes";
import { useState } from "react";
import { IoSunny } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";

export default function ToggleTheme() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  setTheme(isDark ? "dark" : "light");

  const svgByTheme = {
    true: (
      <IoSunny
        className="w-5 h-5 text-white cursor-pointer"
        onClick={() => setIsDark(!isDark)}
      />
    ),
    false: (
      <MdDarkMode
        className="w-5 h-5 text-white cursor-pointer"
        onClick={() => setIsDark(!isDark)}
      />
    ),
  };

  return <div>{svgByTheme[isDark]}</div>;
}

import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const colors = [
  {
    id: 1,
    hexColor: "#0f172a",
    hover: "#334155",
    tailwindStyles: { color: "bg-[#0f172a]", hover: "bg-[#334155]" },
    name: "deafultTheme",
  },
  {
    id: 2,
    hexColor: "#f74d2c",
    hover: "#f74d2c",
    tailwindStyles: { color: "bg-[#f74d2c]", hover: "bg-[#f74d2c]" },
    name: "orangeTheme",
  },
];

// bg-main: #0f172a;
//     --bg-main-hover: #334155;

export default function ColorPicker() {
  const [state, setState] = useState(false);

  const changeGlobalTheme = (hexCode) => {
    if (!hexCode) return;
    document.documentElement.style.setProperty("--bg-main", hexCode);
  };

  return (
    <div className="flex items-center gap-1 ">
      {colors.map(({ hexColor, tailwindStyles }) => {
        return (
          <Box
            color={hexColor}
            tailwindStyles={tailwindStyles}
            onClick={(color) => {
              changeGlobalTheme(color);
            }}
          />
        );
      })}
    </div>
  );
}

const Box = ({ onClick, isChecked, tailwindStyles, color }) => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <div
      onClick={() => {
        onClick(color);
      }}
    >
      <div
        onClick={() => {
          setIsCheck(!isCheck);
        }}
        className={`${tailwindStyles.color} rounded-sm border border-input shadow-lg h-7 w-7 flex justify-center items-center active:scale-95  transition-all cursor-pointer select-none`}
      >
        <span className={`${isCheck ? "" : "hidden"}`}>
          <FaCheck className="w-3 h-3 text-white" />
        </span>
      </div>
    </div>
  );
};

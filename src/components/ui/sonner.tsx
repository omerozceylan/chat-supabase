"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "bg-white text-black w-[356px] rounded-md  dark:text-white dark:bg-[#0f0f0f] dark:border-[var(--border-primary)] flex gap-2 shadow-xl items-center px-4 py-[14px] border",
          title: "text-red-400 whitespace w-full text-sm ",
          description: "text-red-400",
          actionButton: "bg-zinc-400",
          cancelButton: "bg-orange-400",
          closeButton: "bg-lime-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

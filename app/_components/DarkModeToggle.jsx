"use client";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-2xl p-2 rounded-full hover:bg-zinc-200/30 dark:hover:bg-zinc-700/40 transition-colors"
      aria-label="다크모드 토글"
      type="button"
    >
      {resolvedTheme === "dark" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
}

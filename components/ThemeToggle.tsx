"use client";

import { useEffect, useRef, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const initialized = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved === "dark" || (!saved && prefersDark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    setIsDark(dark);
  });

  function toggle() {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.dataset.theme = newDark ? "dark" : "light";
    localStorage.setItem("theme", newDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle dark mode"
      onClick={toggle}
    >
      {isDark ? (
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none">
          <circle cx="8" cy="8" r="3" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M3.4 12.6l1.3-1.3M11.3 4.7l1.3-1.3" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none">
          <path
            d="M13 9.5A5 5 0 016.5 3a.5.5 0 00-.7-.6A6 6 0 1013.6 10.2a.5.5 0 00-.6-.7z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}

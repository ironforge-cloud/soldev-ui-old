import { useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export default function useTheme() {
  let [setting, setSetting] = useState("system");
  let initial = useRef(true);
  let [mode, setMode] = useState("");

  useIsomorphicLayoutEffect(() => {
    let theme = localStorage.theme;
    if (theme === "light" || theme === "dark") {
      setSetting(theme);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (setting === "system") {
      localStorage.removeItem("theme");
    } else if (setting === "light" || setting === "dark") {
      localStorage.theme = setting;
    }
    if (initial.current) {
      initial.current = false;
      setMode(update());
    } else {
      setMode(update());
    }
  }, [setting]);

  useEffect(() => {
    let mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", update);

    function onStorage() {
      setMode(update());
      let theme = localStorage.theme;
      if (theme === "light" || theme === "dark") {
        setSetting(theme);
      } else {
        setSetting("system");
      }
    }
    window.addEventListener("storage", onStorage);

    return () => {
      mediaQuery.removeEventListener("change", update);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return { mode, setSetting };
}

function update() {
  let theme = "";
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark", "changing-theme");
    theme = "dark";
  } else {
    document.documentElement.classList.remove("dark", "changing-theme");
    theme = "light";
  }

  window.setTimeout(() => {
    document.documentElement.classList.remove("changing-theme");
  });

  return theme;
}

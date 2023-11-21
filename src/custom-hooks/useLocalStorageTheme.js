import { useEffect, useState } from "react";

export function useLocalStorageTheme() {
  const [mode, setMode] = useState(function () {
    const savedMode = localStorage.getItem("mode");

    if (savedMode) {
      return "dark";
    } else {
      return "default";
    }
  });

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("mode", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.removeItem("mode");
    }
  }, [mode]);

  return [setMode];
}

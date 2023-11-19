import { useEffect, useState } from "react";

export default function Header() {
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

  return (
    <header>
      <div className="container">
        <h1>Where is the world?</h1>
        <div
          className="color-theme"
          onClick={() =>
            setMode((mode) => (mode === "default" ? "dark" : "default"))
          }
        >
          Dark Mode
        </div>
      </div>
    </header>
  );
}

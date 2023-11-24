import { useEffect, useState } from "react";

export default function Filter({ region, onSetRegion, onSetQuery }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSetRegion(el) {
    onSetQuery("");

    if (el.matches("ul")) return;

    if (el.textContent === "America") {
      onSetRegion("Americas");
    } else {
      onSetRegion(el.textContent);
    }

    setIsOpen(false);
  }

  useEffect(() => {
    function toggleMenu(e) {
      if (e.target.matches(".dropdown")) {
        setIsOpen((open) => !open);
        return;
      }

      setIsOpen(false);
    }

    document.addEventListener("click", toggleMenu);

    return () => document.removeEventListener("click", toggleMenu);
  }, [isOpen]);

  return (
    <div className="filter">
      <button className="dropdown">{region}</button>

      {isOpen && (
        <ul onClick={(e) => handleSetRegion(e.target)}>
          <li>All</li>
          <li>Africa</li>
          <li>America</li>
          <li>Asia</li>
          <li>Europe</li>
          <li>Oceania</li>
        </ul>
      )}
    </div>
  );
}

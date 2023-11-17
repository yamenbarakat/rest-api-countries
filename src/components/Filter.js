import { useEffect, useState } from "react";

export default function Filter({ region, onSetRegion }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSetRegion(el) {
    if (el.matches("ul")) return;

    onSetRegion(el.textContent);
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

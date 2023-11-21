export default function Header({ onSetMode }) {
  return (
    <header>
      <div className="container">
        <h1>Where is the world?</h1>
        <div
          className="color-theme"
          onClick={() =>
            onSetMode((mode) => (mode === "default" ? "dark" : "default"))
          }
        >
          Dark Mode
        </div>
      </div>
    </header>
  );
}

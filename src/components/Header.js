export default function Header() {
  function handleSetMode() {
    document.body.classList.toggle("dark");
  }

  return (
    <header>
      <div className="container">
        <h1>Where is the world?</h1>
        <div className="color-theme" onClick={handleSetMode}>
          Dark Mode
        </div>
      </div>
    </header>
  );
}

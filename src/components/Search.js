export default function Search({ query, onSetQuery }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={(e) => onSetQuery(e.target.value)}
      />
    </div>
  );
}

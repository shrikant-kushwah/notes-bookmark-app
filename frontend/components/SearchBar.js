export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search notes..."
      className="w-44 px-3 py-2 rounded border border-blue-400 bg-blue-900/80 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
    />
  );
}
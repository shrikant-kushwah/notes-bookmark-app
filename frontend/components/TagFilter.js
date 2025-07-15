export default function TagFilter({ tags, onChange }) {
  return (
    <input
      type="text"
      value={tags}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Tags (comma separated)"
      className="w-56 px-3 py-2 rounded border border-blue-400 bg-[rgba(30,41,59,0.85)] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  );
}
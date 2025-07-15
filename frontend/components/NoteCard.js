import { FiStar, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function NoteCard({ note, onDelete, onToggleFavorite, onEdit }) {
  return (
    <div className="card w-full max-w-xl p-6 mb-8 rounded-lg bg-blue-950/80 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform group">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-blue-200 group-hover:text-blue-300 transition">
          {note.title}
        </h3>
        <div className="flex gap-2 items-center">
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(note._id)}
              className={`text-xl ${
                note.favorite ? 'text-yellow-400' : 'text-slate-400'
              } hover:text-yellow-500 transition`}
              title={note.favorite ? 'Unmark Favorite' : 'Mark as Favorite'}
            >
              <FiStar fill={note.favorite ? '#facc15' : 'none'} />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(note)}
              title="Edit"
              className="p-1 text-blue-200 bg-blue-800 hover:bg-blue-700 rounded transition"
            >
              <FiEdit2 size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(note._id)}
              title="Delete"
              className="p-1 text-white bg-red-600 hover:bg-red-700 rounded transition"
            >
              <FiTrash2 size={16} />
            </button>
          )}
        </div>
      </div>

      <p className="text-gray-100 whitespace-pre-line mb-3">{note.content}</p>

      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {note.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-700 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

import { FiStar, FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';

export default function BookmarkCard({ bookmark, onDelete, onToggleFavorite, onEdit }) {
  return (
    <div className="card mb-8 transition-transform hover:scale-[1.02] hover:shadow-2xl group relative p-8 flex flex-col gap-4 w-full max-w-xl">
      <div className="flex items-center justify-between mb-4">
        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg font-bold" style={{color:'#38bdf8'}}>
          {bookmark.title || bookmark.url}
          <FiExternalLink className="text-green-400 text-base" />
        </a>
        <div className="flex items-center gap-2">
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(bookmark._id)}
              className={`text-xl ${bookmark.favorite ? 'text-yellow-400' : 'text-slate-500'} hover:text-yellow-500 transition`}
              title={bookmark.favorite ? 'Unmark Favorite' : 'Mark as Favorite'}
            >
              <FiStar fill={bookmark.favorite ? '#facc15' : 'none'} />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(bookmark)}
              className="ml-1 p-1 bg-green-900 text-green-200 rounded hover:bg-green-800 transition text-xs font-medium"
              title="Edit"
            >
              <FiEdit2 />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(bookmark._id)}
              className="ml-1 p-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs font-medium"
              title="Delete"
            >
              <FiTrash2 />
            </button>
          )}
        </div>
      </div>
      {bookmark.description && <p className="text-gray-100 mb-4 whitespace-pre-line">{bookmark.description}</p>}
      {bookmark.tags && bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 items-center">
          {bookmark.tags.map((tag, idx) => (
            <span key={idx} className="bg-green-700 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
} 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import {
  fetchBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  toggleBookmarkFavorite,
} from '../utils/api';
import Layout from '../components/Layout';
import BookmarkCard from '../components/BookmarkCard';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';

export default function Bookmarks() {
  const router = useRouter();
  const { token } = useAuth();

  const [bookmarks, setBookmarks] = useState([]);
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const [form, setForm] = useState({ url: '', title: '', description: '', tags: '' });
  const [editForm, setEditForm] = useState({ url: '', title: '', description: '', tags: '' });
  const [editId, setEditId] = useState(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token]);

  useEffect(() => {
    if (token) loadBookmarks();
  }, [query, tags, showFavorites, token]);

  const loadBookmarks = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      let q = '?';
      if (query) q += `q=${encodeURIComponent(query)}`;
      if (tags) q += `${q.length > 1 ? '&' : ''}tags=${encodeURIComponent(tags)}`;
      if (showFavorites) q += `${q.length > 1 ? '&' : ''}favorite=true`;

      const data = await fetchBookmarks(q.length > 1 ? q : '', token);
      if (Array.isArray(data)) {
        setBookmarks(data);
      } else {
        setBookmarks([]);
        setError(data?.error || 'Failed to fetch bookmarks.');
      }
    } catch {
      setBookmarks([]);
      setError('Failed to fetch bookmarks.');
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const activeForm = editId ? editForm : form;
    if (!activeForm.url.trim()) {
      setError('URL is required.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...activeForm,
        tags: activeForm.tags.split(',').map((tag) => tag.trim()),
      };

      if (editId) {
        await updateBookmark(editId, payload, token);
        setSuccess('Bookmark updated!');
        setEditId(null);
        setEditForm({ url: '', title: '', description: '', tags: '' });
      } else {
        await createBookmark(payload, token);
        setSuccess('Bookmark added!');
        setForm({ url: '', title: '', description: '', tags: '' });
      }

      loadBookmarks();
    } catch {
      setError('Failed to save bookmark.');
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteBookmark(id, token);
    setSuccess('Bookmark deleted.');
    loadBookmarks();
    setLoading(false);
  };

  const handleToggleFavorite = async (id) => {
    setLoading(true);
    await toggleBookmarkFavorite(id, token);
    setSuccess('Favorite updated.');
    loadBookmarks();
    setLoading(false);
  };

  const startEdit = (bookmark) => {
    setEditId(bookmark._id);
    setEditForm({
      url: bookmark.url,
      title: bookmark.title,
      description: bookmark.description,
      tags: bookmark.tags.join(', '),
    });
    setError('');
    setSuccess('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ url: '', title: '', description: '', tags: '' });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4 flex flex-col items-center">
        <div className="flex items-center justify-between mb-4 w-full">
          <h1 className="text-3xl font-extrabold text-green-500">Bookmarks</h1>
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded transition"
          >
            Home
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="card mb-6 w-full flex flex-col gap-3">
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm font-medium">
              {success}
            </div>
          )}

          {['url', 'title', 'description', 'tags'].map((field) => (
            <input
              key={field}
              placeholder={`${field[0].toUpperCase() + field.slice(1)}${
                field === 'tags' ? ' (comma separated)' : ''
              }`}
              value={editId ? editForm[field] : form[field]}
              onChange={(e) =>
                editId
                  ? setEditForm({ ...editForm, [field]: e.target.value })
                  : setForm({ ...form, [field]: e.target.value })
              }
              className="border border-green-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          ))}

          <div className="text-xs text-gray-500">
            If you leave the title blank, it will be auto-fetched from the URL.
          </div>

          <div className="flex gap-2 mt-2">
            <button className="button-gradient disabled:opacity-60" disabled={loading}>
              {editId ? 'Update Bookmark' : 'Add Bookmark'}
            </button>
            {editId && (
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold transition"
                onClick={cancelEdit}
                disabled={loading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center gap-4 mb-4 justify-center text-gray-700">
          <SearchBar value={query} onChange={setQuery} />
          <TagFilter tags={tags} onChange={setTags} />
          <button
            onClick={() => setShowFavorites((prev) => !prev)}
            className={`px-3 py-2 rounded font-semibold transition ${
              showFavorites ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {showFavorites ? '★ Favorites' : '☆ Favorites'}
          </button>
        </div>

        {loading && <div className="text-green-400 mb-4">Loading...</div>}

        {!loading && bookmarks.length === 0 && !error && (
          <div className="text-gray-400 mt-8 text-center">No bookmarks found.</div>
        )}

        <div className="w-full flex flex-col items-center">
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark._id}
              bookmark={bookmark}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
              onEdit={startEdit}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

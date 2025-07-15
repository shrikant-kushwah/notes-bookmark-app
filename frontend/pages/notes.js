import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../context/AuthContext';
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
  toggleNoteFavorite,
} from '../utils/api';

import Layout from '../components/Layout';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';

export default function Notes() {
  const router = useRouter();
  const { token } = useAuth();

  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [editForm, setEditForm] = useState({ title: '', content: '', tags: '' });
  const [editId, setEditId] = useState(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token]);

  useEffect(() => {
    if (token) loadNotes();
  }, [query, tags, showFavorites, token]);

  const loadNotes = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let queryString = '?';
      if (query) queryString += `q=${encodeURIComponent(query)}`;
      if (tags) queryString += `${queryString.length > 1 ? '&' : ''}tags=${encodeURIComponent(tags)}`;
      if (showFavorites) queryString += `${queryString.length > 1 ? '&' : ''}favorite=true`;

      const data = await fetchNotes(queryString.length > 1 ? queryString : '', token);
      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        setNotes([]);
        setError(data?.error || 'Failed to fetch notes.');
      }
    } catch {
      setNotes([]);
      setError('Failed to fetch notes.');
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const activeForm = editId ? editForm : form;
    if (!activeForm.title.trim() || !activeForm.content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...activeForm,
        tags: activeForm.tags.split(',').map((tag) => tag.trim()),
      };

      if (editId) {
        await updateNote(editId, payload, token);
        setSuccess('Note updated!');
        setEditId(null);
        setEditForm({ title: '', content: '', tags: '' });
      } else {
        await createNote(payload, token);
        setSuccess('Note added!');
        setForm({ title: '', content: '', tags: '' });
      }

      loadNotes();
    } catch {
      setError('Failed to save note.');
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteNote(id, token);
    setSuccess('Note deleted.');
    loadNotes();
    setLoading(false);
  };

  const handleToggleFavorite = async (id) => {
    setLoading(true);
    await toggleNoteFavorite(id, token);
    setSuccess('Favorite updated.');
    loadNotes();
    setLoading(false);
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setEditForm({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
    });
    setError('');
    setSuccess('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ title: '', content: '', tags: '' });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4">
          <h1 className="text-3xl font-extrabold text-blue-400">Notes</h1>
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded transition"
          >
            Home
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="card w-full flex flex-col gap-3 mb-6">
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

          <input
            placeholder="Title"
            value={editId ? editForm.title : form.title}
            onChange={(e) =>
              editId
                ? setEditForm({ ...editForm, title: e.target.value })
                : setForm({ ...form, title: e.target.value })
            }
            className="border border-blue-200 rounded px-3 py-2 w-full outline-none"
          />

          <textarea
            placeholder="Content"
            value={editId ? editForm.content : form.content}
            onChange={(e) =>
              editId
                ? setEditForm({ ...editForm, content: e.target.value })
                : setForm({ ...form, content: e.target.value })
            }
            className="border border-blue-200 rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-200"
            rows={3}
          />

          <input
            placeholder="Tags (comma separated)"
            value={editId ? editForm.tags : form.tags}
            onChange={(e) =>
              editId
                ? setEditForm({ ...editForm, tags: e.target.value })
                : setForm({ ...form, tags: e.target.value })
            }
            className="border border-blue-200 rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-200"
          />

          <div className="flex gap-2 mt-2">
            <button
              className="button-gradient disabled:opacity-60"
              disabled={loading}
            >
              {editId ? 'Update Note' : 'Add Note'}
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

        <div className="flex items-center gap-4 justify-center mb-4 text-gray-700">
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

        {loading && <div className="text-blue-400 text-center mb-4">Loading...</div>}

        {!loading && notes.length === 0 && !error && (
          <div className="text-gray-400 mt-8 text-center">No notes found.</div>
        )}

        <div className="w-full flex flex-col items-center">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
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

const BASE_URL = 'https://notes-bookmark-app-3.onrender.com/api';

export async function fetchNotes(query = '', token) {
  const res = await fetch(`${BASE_URL}/notes${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createNote(note, token) {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function updateNote(id, note, token) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(id, token) {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function toggleNoteFavorite(id, token) {
  const res = await fetch(`${BASE_URL}/notes/${id}/favorite`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function fetchBookmarks(query = '', token) {
  const res = await fetch(`${BASE_URL}/bookmarks${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createBookmark(bookmark, token) {
  const res = await fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(bookmark),
  });
  return res.json();
}

export async function updateBookmark(id, bookmark, token) {
  const res = await fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(bookmark),
  });
  return res.json();
}

export async function deleteBookmark(id, token) {
  const res = await fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function toggleBookmarkFavorite(id, token) {
  const res = await fetch(`${BASE_URL}/bookmarks/${id}/favorite`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
} 
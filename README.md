# Personal Notes & Bookmark Manager

Welcome! This is a modern, full-stack web app for managing your personal notes and bookmarks. Built with Node.js, Express, and MongoDB on the backend, and Next.js, React, and Tailwind CSS on the frontend, it’s designed to be fast, secure, and a joy to use.

---

## Features
- Secure user authentication (JWT)
- User-specific notes and bookmarks
- Full CRUD for notes and bookmarks
- Powerful search and tag-based filtering
- Mark favorites for quick access
- Smart bookmark creation: validates URLs and auto-fetches titles
- Beautiful, responsive UI with a bold gradient theme
- Friendly error messages and robust error handling

---

## Getting Started

### Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend folder with the following content:
   ```env
   MONGODB_URI=mongodb://localhost:27017/notes-bookmark-app
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   # or, for development with auto-reload
   npm run dev
   ```

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Visit [http://localhost:3000](http://localhost:3000) in your browser to use the app.

---

## API Overview

### Authentication
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Log in and receive a JWT

### Notes
- `POST /api/notes` – Create a note (JWT required)
- `GET /api/notes` – List/search notes (supports `q`, `tags`, `favorite`)
- `GET /api/notes/:id` – Get a note by ID
- `PUT /api/notes/:id` – Update a note
- `DELETE /api/notes/:id` – Delete a note
- `PATCH /api/notes/:id/favorite` – Toggle favorite status

### Bookmarks
- `POST /api/bookmarks` – Create a bookmark (JWT required)
- `GET /api/bookmarks` – List/search bookmarks (supports `q`, `tags`, `favorite`)
- `GET /api/bookmarks/:id` – Get a bookmark by ID
- `PUT /api/bookmarks/:id` – Update a bookmark
- `DELETE /api/bookmarks/:id` – Delete a bookmark
- `PATCH /api/bookmarks/:id/favorite` – Toggle favorite status

---

## Example: Creating a Note via cURL
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"Body"}'
```

---

## License
MIT

---

**Questions or feedback?** Feel free to open an issue or contribute. Happy coding!

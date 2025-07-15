# Backend – Personal Notes & Bookmark Manager

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your MongoDB URI:
   ```env
   MONGODB_URI=mongodb://localhost:27017/notes-bookmark-app
   JWT_SECRET=your_jwt_secret
   ```
3. Start the server:
   ```bash
   npm start
   ```
   (or `npm run dev` if you use nodemon)

## API Endpoints

### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and get JWT

### Notes
- `POST /api/notes` – Create note (requires JWT)
- `GET /api/notes` – List/search notes (query: `q`, `tags`, `favorite`)
- `GET /api/notes/:id` – Get note by ID
- `PUT /api/notes/:id` – Update note
- `DELETE /api/notes/:id` – Delete note
- `PATCH /api/notes/:id/favorite` – Toggle favorite

### Bookmarks
- `POST /api/bookmarks` – Create bookmark (requires JWT)
- `GET /api/bookmarks` – List/search bookmarks (query: `q`, `tags`, `favorite`)
- `GET /api/bookmarks/:id` – Get bookmark by ID
- `PUT /api/bookmarks/:id` – Update bookmark
- `DELETE /api/bookmarks/:id` – Delete bookmark
- `PATCH /api/bookmarks/:id/favorite` – Toggle favorite

## Features
- User authentication (JWT)
- User-specific data
- CRUD for notes and bookmarks
- Search/filter by text/tags
- Mark favorites
- URL validation for bookmarks
- Auto-fetch title for bookmarks if left blank
- Proper error handling and status codes

## Example cURL
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"Body"}'
``` 
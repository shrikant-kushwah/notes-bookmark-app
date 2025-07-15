// ===== backend/server.js =====
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const noteRoutes = require('./routes/noteRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/notes', noteRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
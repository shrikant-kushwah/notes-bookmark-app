// ===== backend/models/Note.js =====
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  favorite: { type: Boolean, default: false },
});

module.exports = mongoose.model('Note', noteSchema);
// ===== backend/models/Bookmark.js =====
const mongoose = require('mongoose');

const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

const bookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return urlRegex.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  title: { type: String },
  description: String,
  tags: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  favorite: { type: Boolean, default: false },
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
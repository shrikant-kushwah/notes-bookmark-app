const Bookmark = require('../models/Bookmark');
const fetchMetadata = require('../utils/fetchMetadata');

exports.createBookmark = async (req, res) => {
  try {
    const { url, title } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required.' });
    }
    let bookmarkTitle = title;
    if (!title) {
      bookmarkTitle = await fetchMetadata(url);
    }
    const bookmark = await Bookmark.create({ ...req.body, title: bookmarkTitle, user: req.user._id });
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not create bookmark. Please check your input.' });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const { q, tags, favorite } = req.query;
    const filter = { user: req.user._id };
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (tags) filter.tags = { $in: tags.split(',') };
    if (favorite) filter.favorite = favorite === 'true';
    const bookmarks = await Bookmark.find(filter);
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: 'Sorry, something went wrong while fetching bookmarks.' });
  }
};

exports.getBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id });
    if (!bookmark) return res.status(404).json({ error: 'Hmm, we couldn\'t find that bookmark.' });
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ error: 'Sorry, something went wrong while fetching the bookmark.' });
  }
};

exports.updateBookmark = async (req, res) => {
  try {
    if (req.body.url === '') {
      return res.status(400).json({ error: 'URL cannot be empty.' });
    }
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not update bookmark. Please check your input.' });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Bookmark deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Sorry, something went wrong while deleting the bookmark.' });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id });
    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    bookmark.favorite = !bookmark.favorite;
    await bookmark.save();
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ error: 'Could not toggle favorite.' });
  }
};
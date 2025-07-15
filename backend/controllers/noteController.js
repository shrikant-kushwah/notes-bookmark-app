const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }
    const note = await Note.create({ ...req.body, user: req.user._id });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not create note. Please check your input.' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const { q, tags, favorite } = req.query;
    const filter = { user: req.user._id };
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (tags) filter.tags = { $in: tags.split(',') };
    if (favorite) filter.favorite = favorite === 'true';
    const notes = await Note.find(filter);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Sorry, something went wrong while fetching notes.' });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ error: 'Hmm, we couldn\'t find that note.' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Sorry, something went wrong while fetching the note.' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    if (req.body.title === '' || req.body.content === '') {
      return res.status(400).json({ error: 'Title and content cannot be empty.' });
    }
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not update note. Please check your input.' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Sorry, something went wrong while deleting the note.' });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    note.favorite = !note.favorite;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Could not toggle favorite.' });
  }
};
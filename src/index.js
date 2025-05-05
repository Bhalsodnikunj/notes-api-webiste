const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let notes = [];

// GET all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST a new note
app.post('/api/notes', (req, res) => {
  const note = req.body;
  note.id = Date.now(); // simple ID
  notes.push(note);
  res.status(201).json(note);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

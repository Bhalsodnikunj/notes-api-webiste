const express = require("express");
const fs = require("fs-extra");
const router = express.Router();
const dbPath = "./db.json";

// Helper: Read notes
const getNotes = async () => {
  const data = await fs.readJson(dbPath);
  return data.notes;
};

// Helper: Write notes
const saveNotes = async (notes) => {
  await fs.writeJson(dbPath, { notes });
};

// GET all notes
router.get("/", async (req, res) => {
  const notes = await getNotes();
  res.json(notes);
});

// GET note by ID
router.get("/:id", async (req, res) => {
  const notes = await getNotes();
  const note = notes.find(n => n.id === +req.params.id);
  note ? res.json(note) : res.status(404).json({ error: "Note not found" });
});

// POST new note
router.post("/", async (req, res) => {
  const notes = await getNotes();
  const newNote = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(newNote);
  await saveNotes(notes);
  res.status(201).json(newNote);
});

// PUT update note
router.put("/:id", async (req, res) => {
  const notes = await getNotes();
  const index = notes.findIndex(n => n.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: "Note not found" });

  notes[index] = { ...notes[index], ...req.body };
  await saveNotes(notes);
  res.json(notes[index]);
});

// DELETE note
router.delete("/:id", async (req, res) => {
  let notes = await getNotes();
  notes = notes.filter(n => n.id !== +req.params.id);
  await saveNotes(notes);
  res.json({ message: "Note deleted" });
});

module.exports = router;

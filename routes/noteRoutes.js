const express = require('express');
const noteController = require('../controllers/noteController');
const auth = require('../middleware/auth');
const router = express.Router();


router.get("/", auth, noteController.getAllNotes);
router.post("/", auth, noteController.addNote);
router.get("/:id", auth, noteController.getNoteById);
router.patch("/:id", auth, noteController.updateNoteById);
router.delete("/:id", auth, noteController.deleteNoteById);
router.all("*", (req, res) => {
    res.status(404).send("405 Method Not Allowed");
})

module.exports = router;
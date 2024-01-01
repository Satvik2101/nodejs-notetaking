const express = require('express');
const noteController = require('../controllers/noteController');
const auth = require('../middleware/auth');
const router = express.Router();


router.get("/all", auth, noteController.getAllNotes);
router.get("/:id", auth, noteController.getNoteById);

router.all("*", (req, res) => {
    res.status(405).send("405 Method Not Allowed");
})

module.exports = router;
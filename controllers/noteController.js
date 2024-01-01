const Note = require('../schemas/note');
const User = require('../schemas/user');

// not actually necessary. If the ID is invalid we won't find anything anyway
// but we can use this to reduce the number of database calls
function validateID(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);

}

// All these functions will be called after Auth 
// so we can assume that req.user exists and contains the user object

async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({ owner: req.user._id });
        if (!notes) {
            return res.status(404).send();
        }
        res.send(notes);
    } catch (e) {
        res.status(500).send();
    }
}

async function getNoteById(req, res) {
    const _id = req.params.id;
    if (!validateID(_id)) {
        return res.status(400).send("Invalid ID");
    }


    try {
        const note = await Note.findOne({ _id, owner: req.user._id });
        if (!note) {
            return res.status(404).send();
        }
        res.send(note);
    } catch (e) {
        res.status(500).send();
    }
}

module.exports = {
    getAllNotes,
    getNoteById,

}
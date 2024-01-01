const mongoose = require('mongoose');
const validator = require('validator');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isLength(value, { max: 100 })) {
                throw new Error('Title must be less than 100 characters');
            }
        }
    },
    content: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isLength(value, { max: 1000 })) {
                throw new Error('Content must be less than 1000 characters');
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
    {
        timestamps: true
    }

);
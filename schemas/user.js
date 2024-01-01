const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Note = require('./note');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isLength(value, { max: 50 })) {
                throw new Error('Name must be less than 50 characters');
            }
        }
    },
    password: {

        type: String,
        required: true,
        trim: true,
        minlength: 7,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}
)

// Hash the password before saving

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        // Hash the password
        user.password = await bcrypt.hash(user.password, process.env.bcryptSecret);
    }
    next();
}
)


const User = mongoose.model("User", userSchema);

module.exports = User;
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Note = require('./note');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
    console.log("Inside pre save")
    if (user.isModified('password')) {
        // Hash the password
        user.password = await bcrypt.hash(user.password, 12);
    }
    next();
}
)


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    console.log("Inside generateAuthToken")
    console.log("process.env.jwtSecret ", process.env.jwtSecret)
    const token = jwt.sign({ _id: user._id.toString() }, process.env.jwtSecret);
    user.tokens = user.tokens.concat({ token });

    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("Username not found");
    }

    if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid password");
    }
    return user;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
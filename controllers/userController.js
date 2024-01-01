// APIs to Register, Login

const User = require('../schemas/user');

async function addUser(req, res) {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    }
    catch (e) {
        console.log(e.toString())
        res.status(500).send(e);
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findByCredentials(username, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e.message);
    }
}


//Logging out etc left on purpose due to time constraints.

module.exports = {
    addUser,
    loginUser
}


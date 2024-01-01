const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        console.log(process.env.jwtSecret)
        var decoded;
        try {
            decoded = jwt.verify(token, process.env.jwtSecret);
        } catch (error) {
            console.log(error.toString());
            res.status(401).send({ error: 'Authentication Invalid' });
            return;
        }
        console.log(decoded);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        console.log(user);
        if (!user) {
            throw new Error("Could not authenticate");
        }
        req.user = user;
        req.token = token;
        console.log("auth");
        next();
    }
    catch (e) {
        console.log(e.toString())
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = auth;
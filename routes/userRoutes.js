const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post("/add", userController.addUser);
router.post("/login", userController.loginUser);

module.exports = router;
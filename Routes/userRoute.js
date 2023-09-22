// passportRoute.js
const express = require('express');
const authController = require('../Controllers/userController');

const router = express.Router();

router.post('/login', authController.login);

router.post('/create', authController.createUser);

router.post('/', authController.getUserByIdFromToken);

module.exports = router;
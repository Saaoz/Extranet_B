const express = require('express');
const router = express.Router();  // Crée une nouvelle instance du routeur Express
const { getMarcheAndLotInfo } = require('../Controllers/JoinController');

// Route des jointures
router.get('/join/:projetId/:nom', getMarcheAndLotInfo);

module.exports = router;
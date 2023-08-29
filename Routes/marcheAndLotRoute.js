const express = require('express');
const router = express.Router();  // Crée une nouvelle instance du routeur Express
const { getMarcheAndLot } = require('../Controllers/marcheAndLotController');

// Route des jointures
router.get('/:projetId/:nom', getMarcheAndLot);

module.exports = router;
const express = require('express');
const lotController = require('../Controllers/lotController');

const router = express.Router();

router.get('/', lotController.getAllLots);
router.get('/:id', lotController.getLot);
router.post('/', lotController.addLot);
router.put('/:id', lotController.updateLot);
router.delete('/:id', lotController.deleteLot);

module.exports = router;

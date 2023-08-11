const express = require('express');
const lotController = require('../Controllers/lotController');

const router = express.Router();


router.get('/recherche', lotController.searchLots);

router.get('/', lotController.getAllLots);

router.get('/:id', lotController.getLot);

router.get('/lot_projet_id/:id', lotController.getLotsByProjetId);

router.post('/', lotController.addLot);

router.put('/:id', lotController.updateLot);

router.delete('/:id', lotController.deleteLot);



module.exports = router;

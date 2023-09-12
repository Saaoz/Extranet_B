const express = require('express');
const paiementsController = require('../Controllers/paiementsController');

const router = express.Router();

router.get('/', paiementsController.getAllPaiements);
router.get('/:id', paiementsController.getPaiement);
router.get('/:marche_id', paiementsController.getPaiementByMarcheId);
router.post('/', paiementsController.addPaiement);
router.put('/:id', paiementsController.updatePaiement);
router.delete('/:id', paiementsController.deletePaiement);

module.exports = router;

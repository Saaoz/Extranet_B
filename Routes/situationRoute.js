const express = require('express');
const situationController = require('../Controllers/situationController');

const router = express.Router();

router.get('/', situationController.getAllSituations);
router.get('/:id', situationController.getSituation);
router.get('/:marche_id', situationController.getSituationByMarcheId);
router.post('/', situationController.addSituation);
router.put('/:id', situationController.updateSituation);
router.delete('/:id', situationController.deleteSituation);


module.exports = router;

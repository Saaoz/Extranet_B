const express = require('express');
const avenantController = require('../Controllers/avenantController');

const router = express.Router();

router.get('/', avenantController.getAllAvenants);
router.get('/:id', avenantController.getAvenant);
router.get('/:marche_id', avenantController.getAvenantByMarcheId);
router.post('/', avenantController.addAvenant);
router.put('/:id', avenantController.updateAvenant);
router.delete('/:id', avenantController.deleteAvenant);

module.exports = router;

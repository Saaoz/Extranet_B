const express = require('express');
const marcheController = require('../Controllers/marcheController');

const router = express.Router();

router.get('/', marcheController.getAllMarches);
router.get('/:id', marcheController.getMarche);
router.post('/', marcheController.addMarche);
router.put('/:id', marcheController.updateMarche);
router.delete('/:id', marcheController.deleteMarche);

module.exports = router;

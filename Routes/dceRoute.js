const express = require('express');
const dceController = require('../Controllers/dceController');

const router = express.Router();

router.get('/', dceController.getAllDCEs);
router.get('/:id', dceController.getDCE);
router.post('/', dceController.addDCE);
router.put('/:id', dceController.updateDCE);
router.delete('/:id', dceController.deleteDCE);

module.exports = router;

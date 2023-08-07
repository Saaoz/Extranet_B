const express = require('express');
const router = express.Router();

// Importez les routes individuelles
const projetRoutes = require('./projetRoute');
const lotRoutes = require('./lotRoute');
// Importez d'autres routes si vous en avez

// Utilisez les routes individuelles avec leur préfixe approprié
router.use('/projets', projetRoutes);
router.use('/lot', lotRoutes);
// Utilisez d'autres routes avec leur préfixe approprié si nécessaire

module.exports = router;




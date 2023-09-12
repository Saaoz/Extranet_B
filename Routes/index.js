const express = require('express');
const router = express.Router();

// Importez les routes individuelles
const projetRoutes = require('./projetRoute');
const lotRoutes = require('./lotRoute');
const marcheRoutes = require('./marcheRoute');
const dceRoutes = require('./dceRoute');
const avenantRoutes = require('./avenantRoute');
const situationRoutes = require('./situationRoute');
const paiementsRoute = require('./paiementsRoute');
const marcheAndLot = require('./marcheAndLotRoute');

// Utilisez les routes individuelles avec leur préfixe
router.use('/projets', projetRoutes);
router.use('/lot', lotRoutes);
router.use('/marches', marcheRoutes);
router.use('/dce', dceRoutes);
router.use('/avenants', avenantRoutes);
router.use('/situations', situationRoutes);
router.use('/paiements', paiementsRoute);
router.use('/marche_lot', marcheAndLot);

module.exports = router;




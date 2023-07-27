const express = require('express');
const router = express.Router();

// Importez les routes individuelles
const projetRoutes = require('./projetRoute');
// Importez d'autres routes si vous en avez

// Utilisez les routes individuelles avec leur préfixe approprié
router.use('/projets', projetRoutes);
// Utilisez d'autres routes avec leur préfixe approprié si nécessaire

module.exports = router;




// const express = require('express');

// const mapRoutes = require('./maps');
// const playerRoutes = require('./players');
// const characterRoutes = require('./characters');
// const weaponRoutes = require('./weapons');

// const router = express.Router();


// router.use('/maps', mapRoutes);
// router.use('/players', playerRoutes);
// router.use('/characters', characterRoutes);
// router.use('/weapons', weaponRoutes);

// module.exports = router;
const express = require('express');
const router = express.Router();
const projetController = require('../Controllers/projetController');

// Récupérer tous les projets
router.get('/', projetController.getAllProjets);

// Ajouter un nouveau projet
router.post('/', projetController.addProjet);

// Rechercher des projets par nom (recherche approximative)
router.get('/recherche', projetController.searchProjets);

// Mettre à jour un projet existant
router.put('/:id', projetController.updateProjet);

// Supprimer un projet
router.delete('/:id', projetController.deleteProjet);

module.exports = router;

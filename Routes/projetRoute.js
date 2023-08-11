const express = require('express');
const router = express.Router();
const projetController = require('../Controllers/projetController');

// Rechercher des projets par nom (recherche approximative)
router.get('/recherche', projetController.searchProjets);

// Récupérer tous les projets
router.get('/', projetController.getAllProjets);

router.get('/:id', projetController.getProjet);

// Ajouter un nouveau projet
router.post('/', projetController.addProjet);

// Mettre à jour un projet existant
router.put('/:id', projetController.updateProjet);

// Supprimer un projet
router.delete('/:id', projetController.deleteProjet);

module.exports = router;

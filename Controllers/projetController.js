const projetModel = require('../Models/projetModel');

// Récupérer tous les projets
async function getAllProjets(req, res) {
    try {
        const projets = await projetModel.getAllProjets();
        res.json(projets);
    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des projets.' });
    }
}


// Récupérer 1 projet
async function getProjet(req, res) {
    try {
        const id = req.params.id;
        const projet = await projetModel.getProjet(id);
        if (!projet) {
            return res.status(404).json({ message: 'Le projet demandé n\'existe pas.' });
        }
        res.json(projet);
    } catch (error) {
        console.error('Erreur lors de la récupération du projet :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération du projet.' });
    }
}


// Rechercher des projets par nom
async function searchProjets(req, res) {
    try {
        const { nom } = req.query;
        if (!nom) {
            return res.status(400).json({ message: 'Le nom à rechercher est requis.' });
        }
        const projets = await projetModel.searchProjets(nom);
        res.json(projets);
    } catch (error) {
        console.error('Erreur lors de la recherche des projets :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la recherche des projets.' });
    }
}


// Ajouter un nouveau projet
async function addProjet(req, res) {
    try {
        const { nom } = req.body;
        if (!nom) {
            return res.status(400).json({ message: 'Le nom du projet est requis.' });
        }
        const result = await projetModel.addProjet(nom);
        res.json({ message: 'Projet ajouté avec succès !', id: result.insertId });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du projet :', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du projet.' });
    }
}

// Mettre à jour un projet existant
async function updateProjet(req, res) {
    try {
        const { id } = req.params;
        const { nom } = req.body;
        if (!nom) {
            return res.status(400).json({ message: 'Le nom du projet est requis.' });
        }
        const result = await projetModel.updateProjet(id, nom);
        res.json({ message: 'Projet mis à jour avec succès !', id: id });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du projet :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du projet.' });
    }
}

// Supprimer un projet
async function deleteProjet(req, res) {
    try {
        const { id } = req.params;
        const result = await projetModel.deleteProjet(id);
        res.json({ message: 'Projet supprimé avec succès !', id: id });
    } catch (error) {
        console.error('Erreur lors de la suppression du projet :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression du projet.' });
    }
}

module.exports = {
    getAllProjets,
    getProjet,
    addProjet,
    searchProjets,
    updateProjet,
    deleteProjet
};

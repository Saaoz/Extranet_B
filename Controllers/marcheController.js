const marcheModel = require('../Models/marcheModel');

// Récupérer tous les marchés
async function getAllMarches(req, res) {
    try {
        const marches = await marcheModel.getAllMarches();
        res.json(marches);
    } catch (error) {
        console.error('Erreur lors de la récupération des marchés :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des marchés.' });
    }
}

// Récupérer un marché par ID
async function getMarche(req, res) {
    try {
        const id = req.params.id;
        const marche = await marcheModel.getMarche(id);
        if (!marche) {
            return res.status(404).json({ message: 'Le marché demandé n\'existe pas.' });
        }
        res.json(marche);
    } catch (error) {
        console.error('Erreur lors de la récupération du marché :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération du marché.' });
    }
}

// Ajouter un nouveau marché
async function addMarche(req, res) {
    try {
        const newMarche = await marcheModel.addMarche(req.body);
        res.json({ message: 'Marché ajouté avec succès !', marche: newMarche });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du marché :', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du marché.' });
    }
}

// Mettre à jour un marché existant
async function updateMarche(req, res) {
    try {
        const { id } = req.params;
        const updatedMarche = await marcheModel.updateMarche(id, req.body);
        res.json({ message: 'Marché mis à jour avec succès !', marche: updatedMarche });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du marché :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du marché.' });
    }
}

// Supprimer un marché
async function deleteMarche(req, res) {
    try {
        const { id } = req.params;
        await marcheModel.deleteMarche(id);
        res.json({ message: 'Marché supprimé avec succès !', id: id });
    } catch (error) {
        console.error('Erreur lors de la suppression du marché :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression du marché.' });
    }
}

module.exports = {
    getAllMarches,
    getMarche,
    addMarche,
    updateMarche,
    deleteMarche
};

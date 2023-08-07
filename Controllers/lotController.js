const lotModel = require('../Models/lotModel');

// Récupérer tous les lots
async function getAllLots(req, res) {
    try {
        const lots = await lotModel.getAllLots();
        res.json(lots);
    } catch (error) {
        console.error('Erreur lors de la récupération des lots :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des lots.' });
    }
}

// Récupérer un lot par ID
async function getLot(req, res) {
    try {
        const id = req.params.id;
        const lot = await lotModel.getLot(id);
        if (!lot) {
            return res.status(404).json({ message: 'Le lot demandé n\'existe pas.' });
        }
        res.json(lot);
    } catch (error) {
        console.error('Erreur lors de la récupération du lot :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération du lot.' });
    }
}

// Ajouter un nouveau lot
async function addLot(req, res) {
    try {
        const newLot = await lotModel.addLot(req.body);
        res.json({ message: 'Lot ajouté avec succès !', lot: newLot });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du lot :', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du lot.' });
    }
}

// Mettre à jour un lot existant
async function updateLot(req, res) {
    try {
        const { id } = req.params;
        const updatedLot = await lotModel.updateLot(id, req.body);
        res.json({ message: 'Lot mis à jour avec succès !', lot: updatedLot });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du lot :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du lot.' });
    }
}

// Supprimer un lot
async function deleteLot(req, res) {
    try {
        const { id } = req.params;
        await lotModel.deleteLot(id);
        res.json({ message: 'Lot supprimé avec succès !', id: id });
    } catch (error) {
        console.error('Erreur lors de la suppression du lot :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression du lot.' });
    }
}

module.exports = {
    getAllLots,
    getLot,
    addLot,
    updateLot,
    deleteLot
};
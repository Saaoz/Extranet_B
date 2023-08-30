const paiementsModel = require('../Models/paiementsModel');

// Récupérer tous les paiements
async function getAllPaiements(req, res) {
    try {
        const paiements = await paiementsModel.getAllPaiements();
        res.json(paiements);
    } catch (error) {
        console.error('Erreur lors de la récupération des paiements :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des paiements.' });
    }
}

// Récupérer un paiement par ID
async function getPaiement(req, res) {
    try {
        const id = req.params.id;
        const paiement = await paiementsModel.getPaiement(id);
        if (!paiement) {
            return res.status(404).json({ message: 'Le paiement demandé n\'existe pas.' });
        }
        res.json(paiement);
    } catch (error) {
        console.error('Erreur lors de la récupération du paiement :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération du paiement.' });
    }
}


//Récupération paiement par le marche_id
async function getPaiementByMarcheId(req, res) {
    try {
        const {marche_id} = req.params;
        const paiement = await situationModel.getPaiementByMarcheId(marche_id);
        res.json(paiement);
    } catch (error) {
        console.error('Erreur lors de la récupération du paiement',error);
        res.status(500).json({error: 'Erreur serveur lors de la récupération du paiement.'});
    }
}

// Ajouter un nouveau paiement
async function addPaiement(req, res) {
    try {
        const newPaiement = await paiementsModel.addPaiement(req.body);
        res.json({ message: 'Paiement ajouté avec succès !', paiement: newPaiement });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du paiement :', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du paiement.' });
    }
}

// Mettre à jour un paiement existant
async function updatePaiement(req, res) {
    try {
        const { id } = req.params;
        const updatedPaiement = await paiementsModel.updatePaiement(id, req.body);
        res.json({ message: 'Paiement mis à jour avec succès !', paiement: updatedPaiement });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du paiement :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du paiement.' });
    }
}

// Supprimer un paiement
async function deletePaiement(req, res) {
    try {
        const { id } = req.params;
        await paiementsModel.deletePaiement(id);
        res.json({ message: 'Paiement supprimé avec succès !', id: id });
    } catch (error) {
        console.error('Erreur lors de la suppression du paiement :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression du paiement.' });
    }
}

module.exports = {
    getAllPaiements,
    getPaiement,
    addPaiement,
    updatePaiement,
    deletePaiement,
    getPaiementByMarcheId
};

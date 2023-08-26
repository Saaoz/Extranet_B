const dceModel = require('../Models/dceModel');

// Récupérer tous les DCE
async function getAllDCEs(req, res) {
    try {
        const dces = await dceModel.getAllDCEs();
        res.json(dces);
    } catch (error) {
        console.error('Erreur lors de la récupération des DCE :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des DCE.' });
    }
}

// Récupérer un DCE par ID
async function getDCE(req, res) {
    try {
        const id = req.params.id;
        const dce = await dceModel.getDCE(id);
        if (!dce) {
            return res.status(404).json({ message: 'Le DCE demandé n\'existe pas.' });
        }
        res.json(dce);
    } catch (error) {
        console.error('Erreur lors de la récupération du DCE :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération du DCE.' });
    }
}

// Ajouter un nouveau DCE
async function addDCE(req, res) {
    try {
        const newDCE = await dceModel.addDCE(req.body);
        res.json({ message: 'DCE ajouté avec succès !', dce: newDCE });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du DCE :', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du DCE.' });
    }
}

// Mettre à jour un DCE existant
async function updateDCE(req, res) {
    try {
        const { id } = req.params;
        const updatedDCE = await dceModel.updateDCE(id, req.body);
        res.json({ message: 'DCE mis à jour avec succès !', dce: updatedDCE });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du DCE :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du DCE.' });
    }
}

// Supprimer un DCE
async function deleteDCE(req, res) {
    try {
        const { id } = req.params;
        await dceModel.deleteDCE(id);
        res.json({ message: 'DCE supprimé avec succès !', id: id });
    } catch (error) {
        console.error('Erreur lors de la suppression du DCE :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression du DCE.' });
    }
}

module.exports = {
    getAllDCEs,
    getDCE,
    addDCE,
    updateDCE,
    deleteDCE
};

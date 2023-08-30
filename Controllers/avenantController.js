const avenantModel = require('../Models/avenantModel');

// Récupérer tous les avenants
async function getAllAvenants(req, res) {
    try {
        const avenants = await avenantModel.getAllAvenants();
        res.json(avenants);
    } catch (error) {
        console.error('Erreur lors de la récupération des avenants :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des avenants.' });
    }
}

// Récupérer un avenant par ID
async function getAvenant(req, res) {
    try {
        const id = req.params.id;
        const avenant = await avenantModel.getAvenant(id);
        if (!avenant) {
            return res.status(404).json({ message: 'L\'avenant demandé n\'existe pas.' });
        }
        res.json(avenant);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'avenant :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'avenant.' });
    }
}

//Récupération situation par le marche_id
async function getAvenantByMarcheId(req, res) {
    try {
        const {marche_id} = req.params;
        const avenant = await situationModel.getAvenantByMarcheId(marche_id);
        res.json(avenant);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'avenant',error);
        res.status(500).json({error: 'Erreur serveur lors de la récupération de l\'avenant.'});
    }
}


// Ajouter un nouveau avenant
async function addAvenant(req, res) {
    try {
        const newAvenant = await avenantModel.addAvenant(req.body);
        res.json({ message: 'Avenant ajouté avec succès !', avenant: newAvenant });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'avenant :', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de l\'avenant.' });
    }
}

// Mettre à jour un avenant existant
async function updateAvenant(req, res) {
    try {
        const { id } = req.params;
        const updatedAvenant = await avenantModel.updateAvenant(id, req.body);
        res.json({ message: 'Avenant mis à jour avec succès !', avenant: updatedAvenant });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'avenant :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'avenant.' });
    }
}

// Supprimer un avenant
async function deleteAvenant(req, res) {
    try {
        const { id } = req.params;
        await avenantModel.deleteAvenant(id);
        res.json({ message: 'Avenant supprimé avec succès !', id: id });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'avenant :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'avenant.' });
    }
}

module.exports = {
    getAllAvenants,
    getAvenant,
    addAvenant,
    updateAvenant,
    deleteAvenant,
    getAvenantByMarcheId
};

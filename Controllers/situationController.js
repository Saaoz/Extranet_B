const situationModel = require('../Models/situationModel');

// Récupérer toutes les situations
async function getAllSituations(req, res) {
    try {
        const situations = await situationModel.getAllSituations();
        res.json(situations);
    } catch (error) {
        console.error('Erreur lors de la récupération des situations :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des situations.' });
    }
}

// Récupérer une situation par ID
async function getSituation(req, res) {
    try {
        const id = req.params.id;
        const situation = await situationModel.getSituation(id);
        if (!situation) {
            return res.status(404).json({ message: 'La situation demandée n\'existe pas.' });
        }
        res.json(situation);
    } catch (error) {
        console.error('Erreur lors de la récupération de la situation :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de la situation.' });
    }
}

//Récupération situation par le marche_id
async function getSituationByMarcheId(req, res) {
    try {
        const {marche_id} = req.params;
        const situations = await situationModel.getSituationByMarcheId(marche_id);
        res.json(situations);
    } catch (error) {
        console.error('Erreur lors de la récupération de la situation',error);
        res.status(500).json({error: 'Erreur serveur lors de la récupération de la situation.'});
    }
}



// Ajouter une nouvelle situation
async function addSituation(req, res) {
    try {
        const newSituation = await situationModel.addSituation(req.body);
        res.json({ message: 'Situation ajoutée avec succès !', situation: newSituation });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la situation :', error);
        res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de la situation.' });
    }
}

// Mettre à jour une situation existante
async function updateSituation(req, res) {
    try {
        const { id } = req.params;
        const updatedSituation = await situationModel.updateSituation(id, req.body);
        res.json({ message: 'Situation mise à jour avec succès !', situation: updatedSituation });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la situation :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la situation.' });
    }
}

// Supprimer une situation
async function deleteSituation(req, res) {
    try {
        const { id } = req.params;
        await situationModel.deleteSituation(id);
        res.json({ message: 'Situation supprimée avec succès !', id: id });
    } catch (error) {
        console.error('Erreur lors de la suppression de la situation :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression de la situation.' });
    }
}



module.exports = {
    getAllSituations,
    getSituation,
    addSituation,
    updateSituation,
    deleteSituation,
    getSituationByMarcheId
};

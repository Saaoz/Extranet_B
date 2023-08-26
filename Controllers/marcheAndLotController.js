const marcheAndLotModel = require('../Models/marcheAndLotModel');

// Récupérer les informations d'un marché et des lots associés
async function getMarcheAndLot(req, res) {
    try {
        const { projetId, nom } = req.params;
        const result = await marcheAndLotModel.getMarcheAndLotInfo(projetId, nom);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Aucun résultat trouvé' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Erreur lors de la récupération des informations :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des informations.' });
    }
}

module.exports = {
    getMarcheAndLot,
};

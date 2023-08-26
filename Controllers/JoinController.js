const { Sequelize } = require('sequelize');
const Marche = require('../Models/marcheModel'); // Assurez-vous que les modèles sont bien importés
const Lot = require('../Models/lotModel');

async function getMarcheAndLotInfo(req, res) {
    try {
        const { projetId, nom } = req.params; // Récupération des paramètres depuis l'URL

        // Requête pour la jointure
        const result = await Marche.findOne({
            where: {
                nom: nom,
                projet_id: projetId
            },
            include: [{
                model: Lot,
                where: { 
                    nom: Sequelize.col('Marche.nom'),
                    projet_id: Sequelize.col('Marche.projet_id')
                }
            }]
        });

        if (!result) {
            return res.status(404).json({ message: 'Aucun résultat trouvé' });
        }

        res.status(200).json(result);

    } catch (error) {
        console.error('Erreur lors de la jointure:', error);
        res.status(500).json({ error: 'Erreur serveur lors de la jointure.' });
    }
}

module.exports = {
    getMarcheAndLotInfo,
};

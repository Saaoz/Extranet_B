const BddPool = require('../DataBase/Bdd');

// Récupérer les informations d'un marché et des lots associés
async function getMarcheAndLotInfo(projetId, nom) {
    const queryText = `
      SELECT marche.id AS marche_id, lot.id AS lot_id, marche.nom, marche.projet_id, lot.montant, lot.date_debut, lot.date_fin 
      FROM marche
      LEFT JOIN Lot
      ON marche.nom = lot.nom AND marche.projet_id = lot.projet_id
      WHERE marche.nom = ? AND marche.projet_id = ?
    `;
    const [rows] = await BddPool.query(queryText, [nom, projetId]);
    return rows;
}

module.exports = {
    getMarcheAndLotInfo,
};

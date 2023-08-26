const BddPool = require('../DataBase/Bdd');

// Récupérer tous les lots
async function getAllLots() {
    const [rows] = await BddPool.query('SELECT * FROM lot');
    return rows;
}

// Récupérer un lot par ID
async function getLot(id) {
    const [rows] = await BddPool.query('SELECT * FROM lot WHERE id = ?', [id]);
    return rows[0];
}

// Rechercher des lots par nom (recherche approximative)
async function searchLots(nom) {
    const searchTerm = `%${nom}%`; // Ajoutez les "%" pour obtenir une recherche approximative
    const [rows] = await BddPool.query('SELECT id, nom FROM lot WHERE nom LIKE ?', [searchTerm]);
    return rows;
}


// Ajouter un nouveau lot
async function addLot(data) {
    const {nom, montant, date_debut, date_fin, dce_id, marche_id, projet_id} = data;
    const [result] = await BddPool.query('INSERT INTO lot (nom, montant, date_debut, date_fin, dce_id, marche_id, projet_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [nom, montant, date_debut, date_fin, dce_id, marche_id, projet_id]);
    return getLot(result.insertId);
}

// Mettre à jour un lot existant
async function updateLot(id, data) {
    const {nom, montant, date_debut, date_fin, dce_id, marche_id, projet_id} = data;
    await BddPool.query('UPDATE lot SET nom = ?, montant = ?, date_debut = ?, date_fin = ?, dce_id = ?, marche_id = ?, projet_id = ? WHERE id = ?', [nom, montant, date_debut, date_fin, dce_id, marche_id, projet_id, id]);
    return getLot(id);
}

// Supprimer un lot
async function deleteLot(id) {
    await BddPool.query('DELETE FROM lot WHERE id = ?', [id]);
}

async function getLotsByProjetId(projetId) {
    const [rows] = await BddPool.query('SELECT projet.id AS projet_id, lot.id AS lot_id, lot.nom, lot.projet_id FROM projet INNER JOIN lot ON projet.id = lot.projet_id WHERE projet.id = ?', [projetId]);
    return rows;
}


// async function getLotsByProjetId(id) {
//     await BddPool.query('SELECT projet.id, lot.id, lot.nom, lot.projet_id FROM projet INNER JOIN lot ON projet.id = lot.projet_id WHERE projet.id = ?', [id]);
// }

module.exports = {
    getAllLots,
    getLot,
    searchLots,
    getLotsByProjetId,
    addLot,
    updateLot,
    deleteLot
};

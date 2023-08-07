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

module.exports = {
    getAllLots,
    getLot,
    addLot,
    updateLot,
    deleteLot
};

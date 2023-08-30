const BddPool = require('../DataBase/Bdd');

// Récupérer tous les avenants
async function getAllAvenants() {
    const [rows] = await BddPool.query('SELECT * FROM avenant');
    return rows;
}

// Récupérer un avenant par ID
async function getAvenant(id) {
    const [rows] = await BddPool.query('SELECT * FROM avenant WHERE id = ?', [id]);
    return rows[0];
}

// Ajouter un nouvel avenant
async function addAvenant(data) {
    const { ent, nouveau_montant, date, etat, marche_id } = data;
    const [result] = await BddPool.query('INSERT INTO avenant (ent, nouveau_montant, date, etat, marche_id) VALUES (?, ?, ?, ?, ?)', [ent, nouveau_montant, date, etat, marche_id]);
    return getAvenant(result.insertId);
}

// Mettre à jour un avenant existant
async function updateAvenant(id, data) {
    const { ent, nouveau_montant, date, etat, marche_id } = data;
    await BddPool.query('UPDATE avenant SET ent = ?, nouveau_montant = ?, date = ?, etat = ?, marche_id = ? WHERE id = ?', [ent, nouveau_montant, date, etat, marche_id, id]);
    return getAvenant(id);
}

// Supprimer un avenant
async function deleteAvenant(id) {
    await BddPool.query('DELETE FROM avenant WHERE id = ?', [id]);
}

async function getAvenantByMarcheId(marche_id){
    const [rows] = await BddPool.query('SELECT * FROM avenant WHERE marche_id = ?', [marche_id]);
    return rows;
}

module.exports = {
    getAllAvenants,
    getAvenant,
    addAvenant,
    updateAvenant,
    deleteAvenant,
    getAvenantByMarcheId
};

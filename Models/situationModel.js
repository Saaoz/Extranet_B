const BddPool = require('../DataBase/Bdd');

// Récupérer toutes les situations
async function getAllSituations() {
    const [rows] = await BddPool.query('SELECT * FROM situation');
    return rows;
}

// Récupérer une situation par ID
async function getSituation(id) {
    const [rows] = await BddPool.query('SELECT * FROM situation WHERE id = ?', [id]);
    return rows[0];
}

// Ajouter une nouvelle situation
async function addSituation(data) {
    const { ent, montant, date, etat, marche_id } = data;
    const [result] = await BddPool.query('INSERT INTO situation (ent, montant, date, etat, marche_id) VALUES (?, ?, ?, ?, ?)', [ent, montant, date, etat, marche_id]);
    return getSituation(result.insertId);
}

// Mettre à jour une situation existante
async function updateSituation(id, data) {
    const { ent, montant, date, etat, marche_id } = data;
    await BddPool.query('UPDATE situation SET ent = ?, montant = ?, date = ?, etat = ?, marche_id = ? WHERE id = ?', [ent, montant, date, etat, marche_id, id]);
    return getSituation(id);
}

// Supprimer une situation
async function deleteSituation(id) {
    await BddPool.query('DELETE FROM situation WHERE id = ?', [id]);
}

module.exports = {
    getAllSituations,
    getSituation,
    addSituation,
    updateSituation,
    deleteSituation
};

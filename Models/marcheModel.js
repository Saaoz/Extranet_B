const BddPool = require('../DataBase/Bdd');

// Récupérer tous les marchés
async function getAllMarches() {
    const [rows] = await BddPool.query('SELECT * FROM marche');
    return rows;
}

// Récupérer un marché par ID
async function getMarche(id) {
    const [rows] = await BddPool.query('SELECT * FROM marche WHERE id = ?', [id]);
    return rows[0];
}

// Ajouter un nouveau marché
async function addMarche(data) {
    const {nom, projet_id} = data;
    const [result] = await BddPool.query('INSERT INTO marche (nom, projet_id) VALUES (?, ?)', [nom, projet_id]);
    return getMarche(result.insertId);
}

// Mettre à jour un marché existant
async function updateMarche(id, data) {
    const {nom, projet_id} = data;
    await BddPool.query('UPDATE marche SET nom = ?, projet_id = ? WHERE id = ?', [nom, projet_id, id]);
    return getMarche(id);
}

// Supprimer un marché
async function deleteMarche(id) {
    await BddPool.query('DELETE FROM marche WHERE id = ?', [id]);
}

module.exports = {
    getAllMarches,
    getMarche,
    addMarche,
    updateMarche,
    deleteMarche
};

const BddPool = require('../DataBase/Bdd');

// Récupérer tous les DCE
async function getAllDCEs() {
    const [rows] = await BddPool.query('SELECT * FROM dce');
    return rows;
}

// Récupérer un DCE par ID
async function getDCE(id) {
    const [rows] = await BddPool.query('SELECT * FROM dce WHERE id = ?', [id]);
    return rows[0];
}

// Ajouter un nouveau DCE
async function addDCE(data) {
    const { nom, lot, projet_id } = data;
    const lots = lot.join(","); // lot1,lot2,lot3
    const [result] = await BddPool.query('INSERT INTO dce (nom, lot, projet_id) VALUES (?, ?, ?)', [nom, lots, projet_id]);
    return getDCE(result.insertId);
}

// Mettre à jour un DCE existant
async function updateDCE(id, data) {
    const { nom, lot, projet_id } = data;
    const lots = lot.join(","); // lot1,lot2,lot3
    await BddPool.query('UPDATE dce SET nom = ?, lot = ?, projet_id = ? WHERE id = ?', [nom, lots, projet_id, id]);
    return getDCE(id);
}

// Supprimer un DCE
async function deleteDCE(id) {
    await BddPool.query('DELETE FROM dce WHERE id = ?', [id]);
}

module.exports = {
    getAllDCEs,
    getDCE,
    addDCE,
    updateDCE,
    deleteDCE
};

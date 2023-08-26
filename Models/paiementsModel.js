const BddPool = require('../DataBase/Bdd');

// Récupérer tous les paiements
async function getAllPaiements() {
    const [rows] = await BddPool.query('SELECT * FROM paiements');
    return rows;
}

// Récupérer un paiement par ID
async function getPaiement(id) {
    const [rows] = await BddPool.query('SELECT * FROM paiements WHERE id = ?', [id]);
    return rows[0];
}

// Ajouter un nouveau paiement
async function addPaiement(data) {
    const { reference, montant_payer, date, etat, marche_id } = data;
    const [result] = await BddPool.query('INSERT INTO paiements (reference, montant_payer, date, etat, marche_id) VALUES (?, ?, ?, ?, ?)', [reference, montant_payer, date, etat, marche_id]);
    return getPaiement(result.insertId);
}

// Mettre à jour un paiement existant
async function updatePaiement(id, data) {
    const { reference, montant_payer, date, etat, marche_id } = data;
    await BddPool.query('UPDATE paiements SET reference = ?, montant_payer = ?, date = ?, etat = ?, marche_id = ? WHERE id = ?', [reference, montant_payer, date, etat, marche_id, id]);
    return getPaiement(id);
}

// Supprimer un paiement
async function deletePaiement(id) {
    await BddPool.query('DELETE FROM paiements WHERE id = ?', [id]);
}

module.exports = {
    getAllPaiements,
    getPaiement,
    addPaiement,
    updatePaiement,
    deletePaiement
};

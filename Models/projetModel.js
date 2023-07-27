const BddPool = require('../DataBase/Bdd');

// Récupérer tous les projets
async function getAllProjets() {
  const [rows] = await BddPool.query('SELECT id, nom FROM projet');
  return rows;
}

// Récupérer 1 projet par ID
async function getProjet(id) {
  const [rows] = await BddPool.query('SELECT id, nom FROM projet WHERE id = ?', [id]);
  return rows[0];
}


// Rechercher des projets par nom (recherche approximative)
async function searchProjets(nom) {
    const searchTerm = `%${nom}%`; // Ajoutez les "%" pour obtenir une recherche approximative
    const [rows] = await BddPool.query('SELECT id, nom FROM projet WHERE nom LIKE ?', [searchTerm]);
    return rows;
}


// Ajouter un nouveau projet
async function addProjet(nom) {
  const [result] = await BddPool.query('INSERT INTO projet (nom) VALUES (?)', [nom]);
  const id = result.insertId;
  return getProjet(id);
}

// Mettre à jour un projet existant
async function updateProjet(id, nom) {
  await BddPool.query('UPDATE projet SET nom = ? WHERE id = ?', [nom, id]);
  return getProjet(id);
}

// Supprimer un projet
async function deleteProjet(id) {
  await BddPool.query('DELETE FROM projet WHERE id = ?', [id]);
}

module.exports = {
  getAllProjets,
  getProjet,
  searchProjets,
  addProjet,
  updateProjet,
  deleteProjet
};

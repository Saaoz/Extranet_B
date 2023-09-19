const BddPool = require('../DataBase/Bdd');
const bcrypt = require('bcrypt');
// userModels.js

// Fonction pour récupérer un utilisateur par son email
async function getUserByEmail(email) {
    // console.log("Email à rechercher:", email);
    const [rows] = await BddPool.query('SELECT * FROM user WHERE email = ?', [email]);
    // console.log("Résultat de la requête:", rows);
    return rows[0];
  }

  async function createUser(prenom, nom, mobile, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await BddPool.query(
        'INSERT INTO user (prenom, nom, mobile, email, password) VALUES (?, ?, ?, ?, ?)',
        [prenom, nom, mobile, email, hashedPassword]
    );
    return result.insertId;
}

async function findUserById(id) {
    const [rows] = await BddPool.query('SELECT * FROM user WHERE id = ?', [id]);
    return rows[0];
  }
  

module.exports = {
    getUserByEmail,
    createUser,
    findUserById 
};
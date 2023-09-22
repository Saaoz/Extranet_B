const BddPool = require('../DataBase/Bdd');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


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

async function getUserById(userId) {
    const [row] = await BddPool.query('SELECT prenom, nom, mobile, email from user WHERE id = ?', [userId]);
    return row;
}


async function getUserByIdFromToken(token) {
  try {
      const decoded = jwt.verify(token, secret);
      const userId = decoded.id;
      const [row] = await BddPool.query('SELECT prenom, nom, mobile, email from user WHERE id = ?', [userId]);
      return row;
  } catch(err) {
      console.log(err);
      throw new Error("Erreur de vérification du token");
  }
}

module.exports = {
    getUserByEmail,
    createUser,
    findUserById,
    getUserById,
    getUserByIdFromToken
};
const BddPool = require('./Bdd');  // Ajustez le chemin d'accès si nécessaire
const fs = require('fs');

async function resetDatabase() {
    try {
        // Lire le fichier SQL et le stocker dans une variable
        const sql = fs.readFileSync('DataBase/resetSQL.sql', 'utf8');  // Ajustez le chemin d'accès si nécessaire

        // Exécuter les requêtes SQL
        await BddPool.query(sql);

        console.log('Base de données réinitialisée avec succès');
    } catch (err) {
        console.error('Erreur lors de la réinitialisation de la base de données:', err);
    }
}

resetDatabase();
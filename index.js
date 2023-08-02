const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const cors = require('cors');


const app = express();

// Importez les routes centralisées
const indexRoute = require('./Routes/index');
// Utilisez le middleware pour le préfixe "/api"
app.use('/api', indexRoute);


app.use(cors());
app.use(express.json());


// gestion des erreurs copiée/collée depuis ce lien : https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });



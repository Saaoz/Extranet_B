require('dotenv').config();
const express = require('express');
const cors = require('cors');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./config/passport-config');

const app = express();

// Middleware pour CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Configuration des sessions
app.use(session({
  secret: 'votreSecret',
  resave: false,
  saveUninitialized: false
}));

// Utilisation de connect-flash
app.use(flash());

// Initialisation de Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Importez les routes centralisées
const indexRoute = require('./Routes/index');
// Utilisez le middleware pour le préfixe "/api"
app.use('/api', indexRoute);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000.');
});

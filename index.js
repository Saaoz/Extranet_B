require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./config/passport-config');
const secret = process.env.JWT_SECRET;

const app = express();

// Middleware pour CORS
app.use(cors({
  origin: 'http://localhost:3000', // remplacez par l'origine de votre application cliente
  credentials: true,
}));

// Middleware pour parser le JSON
app.use(express.json());

app.use(cookieParser());
// Configuration des sessions
app.use(session({
  secret: secret,
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


// const crypto = require('crypto');

// const secret = crypto.randomBytes(**).toString('hex');

// console.log(secret);
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route de connexion
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  res.redirect('/');
});

// Route de déconnexion
router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

// Middleware pour vérifier si l'utilisateur est authentifié
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Route de profil (exemple utilisant le middleware)
router.get('/profile', checkAuthenticated, (req, res) => {
  res.json({ profile: req.user });
});

module.exports = router;

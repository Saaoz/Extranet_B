const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');


function initialize(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    // Recherchez l'utilisateur dans votre base de données
    const user = await findUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: `l'email n'existe pas` });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'mot de passe incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  }));
}

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  // Recherchez l'utilisateur en fonction de l'ID et appelez 'done'
  return done(null, findUserById(id));
});



module.exports = initialize;

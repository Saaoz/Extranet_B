const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const { findUserById , getUserByEmail } = require('../Models/userModel');

function initialize(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (user == null) {
        return done(null, false, { message: 'No user with that email' });
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
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});



module.exports = initialize;

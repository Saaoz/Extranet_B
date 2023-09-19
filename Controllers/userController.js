// authController.js
const passport = require("passport");
const userModel = require("../Models/userModel");

// Fonction de connexion
async function login(req, res, next) {
//     console.log("Email à rechercher:", req.body.email);
// console.log("Mot de passe à vérifier:", req.body.password);
    passport.authenticate("local", async function (err, user, info) {
        if (err) return next(err);

        if (!user) {
            // Vous pouvez utiliser le modèle ici pour récupérer plus d'informations si nécessaire.
            const existingUser = await userModel.getUserByEmail(req.body.email);

            if (!existingUser) {
                return res.status(400).json({ message: "Invalid email." });
            }

            return res.status(400).json({ message: "Invalid password." });
        }

        req.logIn(user, function (err) {
            if (err) return next(err);
            return res.status(200).json({ message: "Successfully logged in." });
        });
        // console.log(req.body);
    })(req, res, next);
}

async function createUser(req, res) {
    const { prenom, nom, mobile, email, password } = req.body;
    try {
        const userId = await userModel.createUser(prenom, nom, mobile, email, password);
        res.status(201).json({ message: 'User created successfully', userId });
    } catch (error) {
        console.error('Could not create user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



module.exports = {
    login,
    createUser
};

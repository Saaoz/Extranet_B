require('dotenv').config();
const passport = require("passport");
const userModel = require("../Models/userModel");
const jwt = require ("jsonwebtoken");
const secret = process.env.JWT_SECRET;


// Fonction de connexion
async function login(req, res, next) {
    passport.authenticate("local", async function (err, user, info) {
        if (err) return next(err);

        if (!user) {
            const existingUser = await userModel.getUserByEmail(req.body.email);

            if (!existingUser) {
                return res.status(400).json({ message: "Invalid email." });
            }

            return res.status(400).json({ message: "Invalid password." });
        }

        req.logIn(user, function (err) {
            if (err) return next(err);
            
            // Génération du token JWT
            const token = jwt.sign(
                { id: 'user.id' },
                secret,
                { expiresIn: '1h' },
            );

            return res.status(200).json({ message: "Successfully logged in.", token });
        });
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

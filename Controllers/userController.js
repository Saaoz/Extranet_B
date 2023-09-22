require("dotenv").config();
const passport = require("passport");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// Fonction de connexion
async function login(req, res, next) {
    passport.authenticate("local", async function (err, user, info) {
        if (err) return next(err);

        if (!user) {
            const existingUser = await userModel.getUserByEmail(req.body.email);

            if (!existingUser) {
                return res
                    .status(400)
                    .json({ error: "email", message: "L'email n'est pas valide." });
            }

            return res
                .status(400)
                .json({
                    error: "password",
                    message: "Le mot de passe ne correspond pas.",
                });
        }

        req.logIn(user, function (err) {
            if (err) return next(err);

            // Génération du token JWT
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });
            // console.log("Generated Token:", token);
            const decoded = jwt.decode(token);
            // console.log("Token Expiry:", new Date(decoded.exp * 1000));

            return res
                .status(200)
                .json({ message: "Successfully logged in.", token });
        });
    })(req, res, next);
}

async function createUser(req, res) {
    const { prenom, nom, mobile, email, password } = req.body;
    try {
        const userId = await userModel.createUser(
            prenom,
            nom,
            mobile,
            email,
            password
        );
        res.status(201).json({ message: "User created successfully", userId });
    } catch (error) {
        console.error("Could not create user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

function getUserByIdFromToken(req, res) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
    }
    const token = bearerToken.split(" ")[1];

    userModel.getUserByIdFromToken(token)
        .then(user => {
            if (!user || user.length === 0) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            res.json(user[0]);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur" });
        });
}



module.exports = {
    login,
    createUser,
    getUserByIdFromToken,
};

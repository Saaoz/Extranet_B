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

            // Génération token JWT
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

            // Envoi token dans un cookie HttpOnly
            res.cookie('token', token, {
                httpOnly: true,
                // secure: true, // uniquement en HTTPS
                maxAge: 3600000 // durée de vie du cookie en millisecondes (1 heure ici)
            });

            return res
                .status(200)
                .json({ message: "Successfully logged in.", token });
        });
    })(req, res, next);
}

async function logout(req, res) {
    try {
        // console.log('Début de la déconnexion'); 
        
        res.clearCookie('token', { path: '/', httpOnly: true });
        // console.log('Cookie supprimé'); 
        
        res.status(200).json({ message: 'Déconnecté avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
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

async function UpdateUser(req, res) {
    const { prenom, nom, mobile, email, password } = req.body;
    const id = req.userId;
    try {
        const update = await userModel.UpdateUser(
            prenom,
            nom,
            mobile,
            email,
            password,
            id
        );

        if (update.affectedRows === 0) { // Vérifiez si la mise à jour a été effectuée
            return res.status(404).json({ message: "User not found" });
        }

        res.status(201).json({ message: "User updated successfully", update });
    } catch (error) {
        console.error("could not update user", error);
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
    UpdateUser,
    logout
};

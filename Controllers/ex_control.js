
const BddPool = require('../DataBase/Bdd');







// const Character = require("../Model/character");



// // Get all characters
// const getAllCharacters = async (req, res) => {
// 	try {
// 	const characters = await Character.find();
// 	res.status(200).json(characters);
// 	} catch (error) {
// 	res.status(500).json({ message: error.message });
// 	}
// 	};
	
// 	// Get a specific character by id
// const getCharacterById = async (req, res) => {
// 	try {
// 	const character = await Character.findById(req.params.id);
// 	if (character) {
// 	res.status(200).json(character);
// 	} else {
// 	res.status(404).json({ message: "Character not found" });
// 	}
// 	} catch (error) {
// 	res.status(500).json({ message: error.message });
// 	}
// 	};
	
// 	// Create a new character
// const createNewCharacter = async (req, res) => {
// 	const character = new Character({
// 	name: req.body.name,
// 	devname: req.body.devname,
// 	isPlayableCharacter: req.body.isPlayableCharacter,
// 	role: req.body.role,
// 	description: req.body.description,
// 	abilities: req.body.abilities,
// 	uuid: req.body.uuid
// 	});
// 	character
// 			.save()
// 			.then ((character) => res.json(character))
// 			.catch((err) => res.send(err));
// 	};


// // Update a character by id
// const updateCharacterById = async (req, res) => {
// 	try {
// 		const character = await Character.findOneAndUpdate(
// 			{_id: req.params.Characterid },
// 			{
// 				$set: {
// 					name: req.body.name,
// 					devname: req.body.devname,
// 					isPlayableCharacter: req.body.isPlayableCharacter,
// 					role: req.body.role,
// 					description: req.body.description,
// 					abilities: req.body.abilities,
// 					uuid: req.body.uuid
// 				},
// 			},
// 			{new: true}
// 		);
// 		res.json(character);
// 	} catch (err) {
// 		res.send(err);
// 	}
// };


// // Delete a character by id
// const deleteCharacterById = async (req, res) => {
// try {
// const character = await Character.findById(req.params.id);
// if (character) {
// await character.remove();
// res.json({ message: "Character deleted" });
// } else {
// res.status(404).json({ message: "Character not found" });
// }
// } catch (error) {
// res.status(500).json({ message: error.message });
// }
// };

// module.exports = {
// 	deleteCharacterById,
// 	updateCharacterById,
// 	createNewCharacter,
// 	getCharacterById,
// 	getAllCharacters,
// };
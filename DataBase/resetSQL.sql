-- Supprimer les triggers pour éviter les erreurs lors de la suppression des tables
DROP TRIGGER IF EXISTS TransfertVersLot;
DROP TRIGGER IF EXISTS InsertDansMarche;
DROP TRIGGER IF EXISTS transfert_projet_to_dce;

-- Supprimer les tables
DROP TABLE IF EXISTS `user_projet`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `role`;
DROP TABLE IF EXISTS `situation`;
DROP TABLE IF EXISTS `projet`;
DROP TABLE IF EXISTS `paiements`;
DROP TABLE IF EXISTS `marche`;
DROP TABLE IF EXISTS `lot`;
DROP TABLE IF EXISTS `dce`;
DROP TABLE IF EXISTS `avenant`;


-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 26 août 2023 à 12:38
-- Version du serveur : 8.0.30
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `extranet`
--

-- --------------------------------------------------------

--
-- Structure de la table `avenant`
--

CREATE TABLE `avenant` (
  `id` int NOT NULL,
  `ent` varchar(45) NOT NULL,
  `nouveau_montant` varchar(45) NOT NULL,
  `date` varchar(45) NOT NULL,
  `etat` varchar(45) NOT NULL,
  `marche_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `dce`
--

CREATE TABLE `dce` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `lot` varchar(45) DEFAULT NULL,
  `projet_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déclencheurs `dce`
--
DELIMITER $$
CREATE TRIGGER `TransfertVersLot` AFTER UPDATE ON `dce` FOR EACH ROW BEGIN
    DECLARE v_pos INT DEFAULT 1;
    DECLARE v_end_pos INT DEFAULT 0;
    DECLARE v_lot_nom TEXT;
    DECLARE v_lot_liste TEXT;
    DECLARE v_dce_id INT;
    DECLARE v_projet_id INT;

    SET v_lot_liste = NEW.lot;  -- Prendre la nouvelle valeur de la colonne 'lot' de la table 'dce'
    SET v_dce_id = NEW.id;  -- Prendre la nouvelle valeur de la colonne 'id' de la table 'dce'
    SET v_projet_id = NEW.projet_id;  -- Prendre la nouvelle valeur de la colonne 'projet_id' de la table 'dce'

    my_loop: LOOP
        SET v_end_pos = LOCATE(',', v_lot_liste, v_pos);
        IF v_end_pos = 0 THEN
            SET v_end_pos = LENGTH(v_lot_liste) + 1;
        END IF;

        SET v_lot_nom = TRIM(SUBSTRING(v_lot_liste, v_pos, v_end_pos - v_pos));

        INSERT INTO lot (nom, dce_id, projet_id) 
        VALUES (v_lot_nom, v_dce_id, v_projet_id);  -- Insertion dans les colonnes 'nom', 'dce_id', et 'projet_id' de la table 'lot'

        SET v_pos = v_end_pos + 1;

        IF v_pos > LENGTH(v_lot_liste) THEN
            LEAVE my_loop;
        END IF;
    END LOOP my_loop;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `lot`
--

CREATE TABLE `lot` (
  `id` int NOT NULL,
  `nom` varchar(45) NOT NULL,
  `montant` varchar(45) DEFAULT NULL,
  `date_debut` varchar(45) DEFAULT NULL,
  `date_fin` varchar(45) DEFAULT NULL,
  `dce_id` int NOT NULL,
  `marche_id` int DEFAULT NULL,
  `projet_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déclencheurs `lot`
--
DELIMITER $$
CREATE TRIGGER `InsertDansMarche` AFTER INSERT ON `lot` FOR EACH ROW BEGIN

    -- Insérer une nouvelle ligne dans la table 'marche' avec le 'nom' et 'projet_id' de la nouvelle ligne insérée dans 'lot'
    INSERT INTO marche (nom, projet_id) VALUES (NEW.nom, NEW.projet_id);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `marche`
--

CREATE TABLE `marche` (
  `id` int NOT NULL,
  `nom` varchar(45) NOT NULL,
  `projet_id` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `paiements`
--

CREATE TABLE `paiements` (
  `id` int NOT NULL,
  `reference` varchar(45) NOT NULL,
  `montant_payer` varchar(45) NOT NULL,
  `date` varchar(45) NOT NULL,
  `etat` varchar(45) NOT NULL,
  `marche_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `projet`
--

CREATE TABLE `projet` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déclencheurs `projet`
--
DELIMITER $$
CREATE TRIGGER `transfert_projet_to_dce` AFTER INSERT ON `projet` FOR EACH ROW BEGIN
    INSERT INTO dce (nom, projet_id) VALUES (NEW.nom, NEW.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int NOT NULL,
  `nom` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `nom`) VALUES
(1, 'ENT'),
(2, 'MOA'),
(3, 'ARCHI'),
(4, 'MOE'),
(5, 'ADMIN');

-- --------------------------------------------------------

--
-- Structure de la table `situation`
--

CREATE TABLE `situation` (
  `id` int NOT NULL,
  `ent` varchar(45) NOT NULL,
  `montant` varchar(45) NOT NULL,
  `date` varchar(45) NOT NULL,
  `etat` varchar(45) NOT NULL,
  `marche_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `Mobile` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mdp` varchar(100) NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `prenom`, `nom`, `Mobile`, `email`, `mdp`, `role_id`) VALUES
(1, 'Preston', 'Wrefford', '2009434105', 'pwrefford0@mtv.com', 'qsoudhqisudqd74158-', 1),
(2, 'Rene', 'Sterrie', '7511762156', 'rsterrie1@ebay.com', 'qsoudhqisudqd74158-', 2),
(3, 'Emera', 'Gauld', '5939258751', 'egauld2@diigo.com', 'qsoudhqisudqd74158-', 3),
(4, 'Vin', 'Sirrell', '7732818729', 'vsirrell3@scientificamerican.com', 'qsoudhqisudqd74158-', 4),
(5, 'Free', 'Yong', '8094609560', 'fyong4@nasa.gov', 'qsoudhqisudqd74158-', 1),
(6, 'Yasmin', 'Vlasenkov', '8066376847', 'yvlasenkov5@miitbeian.gov.cn', 'qsoudhqisudqd74158-', 2),
(7, 'Vevay', 'Vogeller', '5145697300', 'vvogeller6@usa.gov', 'qsoudhqisudqd74158-', 3),
(8, 'Alida', 'Pickthorn', '9539260442', 'apickthorn7@noaa.gov', 'qsoudhqisudqd74158-', 4),
(9, 'Randi', 'Jeacop', '7065101280', 'rjeacop8@sphinn.com', 'qsoudhqisudqd74158-', 1),
(10, 'Felicio', 'Kennermann', '3023083894', 'fkennermann9@bbc.co.uk', 'qsoudhqisudqd74158-', 2);

-- --------------------------------------------------------

--
-- Structure de la table `user_projet`
--

CREATE TABLE `user_projet` (
  `user_id` int NOT NULL,
  `projet_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avenant`
--
ALTER TABLE `avenant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Avenants_Marchés1_idx` (`marche_id`);

--
-- Index pour la table `dce`
--
ALTER TABLE `dce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_DCE_Projets1_idx` (`projet_id`);

--
-- Index pour la table `lot`
--
ALTER TABLE `lot`
  ADD PRIMARY KEY (`id`,`dce_id`),
  ADD KEY `fk_Lots_DCE1_idx` (`dce_id`),
  ADD KEY `fk_Lots_Marchés1_idx` (`marche_id`),
  ADD KEY `fk_Lots_Projets1_idx` (`projet_id`);

--
-- Index pour la table `marche`
--
ALTER TABLE `marche`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `paiements`
--
ALTER TABLE `paiements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Paiements_Marchés1_idx` (`marche_id`);

--
-- Index pour la table `projet`
--
ALTER TABLE `projet`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ID role_UNIQUE` (`id`);

--
-- Index pour la table `situation`
--
ALTER TABLE `situation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Situations_Marchés1_idx` (`marche_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ID user_UNIQUE` (`id`),
  ADD KEY `fk_Users_Rôles1_idx` (`role_id`);

--
-- Index pour la table `user_projet`
--
ALTER TABLE `user_projet`
  ADD PRIMARY KEY (`user_id`,`projet_id`),
  ADD KEY `fk_Users_has_Projets_Projets1_idx` (`projet_id`),
  ADD KEY `fk_Users_has_Projets_Users1_idx` (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avenant`
--
ALTER TABLE `avenant`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `dce`
--
ALTER TABLE `dce`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `lot`
--
ALTER TABLE `lot`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `marche`
--
ALTER TABLE `marche`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `paiements`
--
ALTER TABLE `paiements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `projet`
--
ALTER TABLE `projet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avenant`
--
ALTER TABLE `avenant`
  ADD CONSTRAINT `fk_Avenants_Marchés1` FOREIGN KEY (`marche_id`) REFERENCES `marche` (`id`);

--
-- Contraintes pour la table `dce`
--
ALTER TABLE `dce`
  ADD CONSTRAINT `fk_DCE_Projets1` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`);

--
-- Contraintes pour la table `lot`
--
ALTER TABLE `lot`
  ADD CONSTRAINT `fk_Lots_DCE1` FOREIGN KEY (`dce_id`) REFERENCES `dce` (`id`),
  ADD CONSTRAINT `fk_Lots_Marchés1` FOREIGN KEY (`marche_id`) REFERENCES `marche` (`id`),
  ADD CONSTRAINT `fk_Lots_Projets1` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`);

--
-- Contraintes pour la table `paiements`
--
ALTER TABLE `paiements`
  ADD CONSTRAINT `fk_Paiements_Marchés1` FOREIGN KEY (`marche_id`) REFERENCES `marche` (`id`);

--
-- Contraintes pour la table `situation`
--
ALTER TABLE `situation`
  ADD CONSTRAINT `fk_Situations_Marchés1` FOREIGN KEY (`marche_id`) REFERENCES `marche` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_Users_Rôles1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Contraintes pour la table `user_projet`
--
ALTER TABLE `user_projet`
  ADD CONSTRAINT `fk_Users_has_Projets_Projets1` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`),
  ADD CONSTRAINT `fk_Users_has_Projets_Users1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

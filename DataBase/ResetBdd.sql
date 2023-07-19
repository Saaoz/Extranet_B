--
-- Base de données : `extranet`
--
DROP SCHEMA IF EXISTS extranet; 
CREATE SCHEMA IF NOT EXISTS extranet DEFAULT CHARACTER SET utf8 ; 
USE extranet ;
-- --------------------------------------------------------

-- Structure de la table `rôles`
--

CREATE TABLE `rôles` (
  `ID role` int NOT NULL,
  `Nom` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `rôles`
--

INSERT INTO `rôles` (`ID role`, `Nom`) VALUES
(1, 'ENT'),
(2, 'MOA'),
(3, 'ARCHI'),
(4, 'MOE'),
(5, 'ADMIN');



CREATE TABLE `users` (
  `ID user` int NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `Mobile` varchar(20) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Mdp` varchar(100) NOT NULL,
  `Rôles_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`ID user`, `Prenom`, `Nom`, `Mobile`, `Email`, `Mdp`, `Rôles_ID`) VALUES
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


CREATE TABLE `projets` (
  `ID projet` int NOT NULL,
  `Nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


INSERT INTO `projets` ( `Nom`) VALUES
('Maison'),
('Challet'),
('Auchan'),
('Fondation'),
('Piscine'),
('Jardin'),
('Mairie');

-- --------------------------------------------------------

--
-- Structure de la table `users_projets`
--

CREATE TABLE `users_projets` (
  `Users_ID` int NOT NULL,
  `Projets_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--

-- Index pour la table `dce`
--
ALTER TABLE `dce`
  ADD PRIMARY KEY (`ID dce`),
  ADD KEY `fk_DCE_Projets1_idx` (`Projets_ID`);


ALTER TABLE `lots`
  ADD PRIMARY KEY (`ID lot`,`DCE_ID`),
  ADD KEY `fk_Lots_DCE1_idx` (`DCE_ID`),
  ADD KEY `fk_Lots_Marchés1_idx` (`Marchés_ID`),
  ADD KEY `fk_Lots_Projets1_idx` (`Projets_ID`);


ALTER TABLE `marchés`
  ADD PRIMARY KEY (`ID marché`);



ALTER TABLE `paiements`
  ADD PRIMARY KEY (`ID paiement`),
  ADD KEY `fk_Paiements_Référence1_idx` (`Référence_ID`),
  ADD KEY `fk_Paiements_Marchés1_idx` (`Marchés_ID`);


ALTER TABLE `situations`
  ADD PRIMARY KEY (`ID situation`),
  ADD KEY `fk_Situations_Référence1_idx` (`Référence_ID`),
  ADD KEY `fk_Situations_Marchés1_idx` (`Marchés_ID`);

ALTER TABLE `avenants`
  ADD PRIMARY KEY (`ID avenant`),
  ADD KEY `fk_Avenants_Référence1_idx` (`Référence_ID`),
  ADD KEY `fk_Avenants_Marchés1_idx` (`Marchés_ID`);



  -- AUTO_INCREMENT pour la table `avenants`
--
ALTER TABLE `avenants`
  MODIFY `ID avenant` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `dce`
--
ALTER TABLE `dce`
  MODIFY `ID dce` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `lots`
--
ALTER TABLE `lots`
  MODIFY `ID lot` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `marchés`
--
ALTER TABLE `marchés`
  MODIFY `ID marché` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `paiements`
--
ALTER TABLE `paiements`
  MODIFY `ID paiement` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `projets`
--
ALTER TABLE `projets`
  MODIFY `ID projet` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `référence`
--
ALTER TABLE `référence`
  MODIFY `ID référence` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `rôles`
--
ALTER TABLE `rôles`
  MODIFY `ID role` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `ID user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avenants`
--
ALTER TABLE `avenants`
  ADD CONSTRAINT `fk_Avenants_Marchés1` FOREIGN KEY (`Marchés_ID`) REFERENCES `marchés` (`ID marché`),
  ADD CONSTRAINT `fk_Avenants_Référence1` FOREIGN KEY (`Référence_ID`) REFERENCES `référence` (`ID référence`);

--
-- Contraintes pour la table `dce`
--
ALTER TABLE `dce`
  ADD CONSTRAINT `fk_DCE_Projets1` FOREIGN KEY (`Projets_ID`) REFERENCES `projets` (`ID projet`);

--
-- Contraintes pour la table `lots`
--
ALTER TABLE `lots`
  ADD CONSTRAINT `fk_Lots_DCE1` FOREIGN KEY (`DCE_ID`) REFERENCES `dce` (`ID dce`),
  ADD CONSTRAINT `fk_Lots_Marchés1` FOREIGN KEY (`Marchés_ID`) REFERENCES `marchés` (`ID marché`),
  ADD CONSTRAINT `fk_Lots_Projets1` FOREIGN KEY (`Projets_ID`) REFERENCES `projets` (`ID projet`);

--
-- Contraintes pour la table `paiements`
--
ALTER TABLE `paiements`
  ADD CONSTRAINT `fk_Paiements_Marchés1` FOREIGN KEY (`Marchés_ID`) REFERENCES `marchés` (`ID marché`),
  ADD CONSTRAINT `fk_Paiements_Référence1` FOREIGN KEY (`Référence_ID`) REFERENCES `référence` (`ID référence`);

--
-- Contraintes pour la table `situations`
--
ALTER TABLE `situations`
  ADD CONSTRAINT `fk_Situations_Marchés1` FOREIGN KEY (`Marchés_ID`) REFERENCES `marchés` (`ID marché`),
  ADD CONSTRAINT `fk_Situations_Référence1` FOREIGN KEY (`Référence_ID`) REFERENCES `référence` (`ID référence`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_Users_Rôles1` FOREIGN KEY (`Rôles_ID`) REFERENCES `rôles` (`ID role`);

--
-- Contraintes pour la table `users_projets`
--
ALTER TABLE `users_projets`
  ADD CONSTRAINT `fk_Users_has_Projets_Projets1` FOREIGN KEY (`Projets_ID`) REFERENCES `projets` (`ID projet`),
  ADD CONSTRAINT `fk_Users_has_Projets_Users1` FOREIGN KEY (`Users_ID`) REFERENCES `users` (`ID user`);
COMMIT;


-- --
-- -- Base de données : `extranet`
-- --
-- DROP SCHEMA IF EXISTS extranet; 
-- CREATE SCHEMA IF NOT EXISTS extranet DEFAULT CHARACTER SET utf8 ; 
-- USE extranet ;
-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `avenants`
-- --

-- CREATE TABLE `avenants` (
--   `ID avenant` int NOT NULL,
--   `Ent` varchar(45) NOT NULL,
--   `Nouveau montant` varchar(45) NOT NULL,
--   `Date` varchar(45) NOT NULL,
--   `Etat` varchar(45) NOT NULL,
--   `Référence_ID` int NOT NULL,
--   `Marchés_ID` int NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `dce`
-- --

-- CREATE TABLE `dce` (
--   `ID dce` int NOT NULL,
--   `Nom` varchar(100) NOT NULL,
--   `Lots du marché` varchar(45) NOT NULL,
--   `Projets_ID` int NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `lots`
-- --

-- CREATE TABLE `lots` (
--   `ID lot` int NOT NULL,
--   `Nom` varchar(45) NOT NULL,
--   `Montant` varchar(45) NOT NULL,
--   `Date début` varchar(45) NOT NULL,
--   `Date fin` varchar(45) DEFAULT NULL,
--   `DCE_ID` int NOT NULL,
--   `Marchés_ID` int NOT NULL,
--   `Projets_ID` int NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `marchés`
-- --

-- CREATE TABLE `marchés` (
--   `ID marché` int NOT NULL,
--   `Nom` varchar(45) NOT NULL,
--   `ID projet` varchar(45) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `paiements`
-- --

-- CREATE TABLE `paiements` (
--   `ID paiement` int NOT NULL,
--   `Référence` varchar(45) NOT NULL,
--   `Montant payé` varchar(45) NOT NULL,
--   `Date` varchar(45) NOT NULL,
--   `Etat` varchar(45) NOT NULL,
--   `Référence_ID` int NOT NULL,
--   `Marchés_ID` int NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `projets`
-- --

-- CREATE TABLE `projets` (
--   `ID projet` int NOT NULL,
--   `Nom` varchar(100) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `référence`
-- --

-- CREATE TABLE `référence` (
--   `ID référence` int NOT NULL,
--   `Référence` mediumtext NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `rôles`
-- --

-- CREATE TABLE `rôles` (
--   `ID role` int NOT NULL,
--   `Nom` varchar(15) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --
-- -- Déchargement des données de la table `rôles`
-- --

-- INSERT INTO `rôles` (`ID role`, `Nom`) VALUES
-- (1, 'ENT'),
-- (2, 'MOA'),
-- (3, 'ARCHI'),
-- (4, 'MOE'),
-- (5, 'ADMIN');

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `situations`
-- --

-- CREATE TABLE `situations` (
--   `ID situation` int NOT NULL,
--   `Ent` varchar(45) NOT NULL,
--   `Montant` varchar(45) NOT NULL,
--   `Date` varchar(45) NOT NULL,
--   `Etat` varchar(45) NOT NULL,
--   `Référence_ID` int NOT NULL,
--   `Marchés_ID` int NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `users`
-- --

-- CREATE TABLE `users` (
--   `ID user` int NOT NULL,
--   `Prenom` varchar(50) NOT NULL,
--   `Nom` varchar(50) NOT NULL,
--   `Mobile` varchar(20) NOT NULL,
--   `Email` varchar(100) NOT NULL,
--   `Mdp` varchar(100) NOT NULL,
--   `Rôles_ID` int NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --
-- -- Déchargement des données de la table `users`
-- --

-- INSERT INTO `users` (`ID user`, `Prenom`, `Nom`, `Mobile`, `Email`, `Mdp`, `Rôles_ID`) VALUES
-- (1, 'Preston', 'Wrefford', '2009434105', 'pwrefford0@mtv.com', 'qsoudhqisudqd74158-', 1),
-- (2, 'Rene', 'Sterrie', '7511762156', 'rsterrie1@ebay.com', 'qsoudhqisudqd74158-', 2),
-- (3, 'Emera', 'Gauld', '5939258751', 'egauld2@diigo.com', 'qsoudhqisudqd74158-', 3),
-- (4, 'Vin', 'Sirrell', '7732818729', 'vsirrell3@scientificamerican.com', 'qsoudhqisudqd74158-', 4),
-- (5, 'Free', 'Yong', '8094609560', 'fyong4@nasa.gov', 'qsoudhqisudqd74158-', 1),
-- (6, 'Yasmin', 'Vlasenkov', '8066376847', 'yvlasenkov5@miitbeian.gov.cn', 'qsoudhqisudqd74158-', 2),
-- (7, 'Vevay', 'Vogeller', '5145697300', 'vvogeller6@usa.gov', 'qsoudhqisudqd74158-', 3),
-- (8, 'Alida', 'Pickthorn', '9539260442', 'apickthorn7@noaa.gov', 'qsoudhqisudqd74158-', 4),
-- (9, 'Randi', 'Jeacop', '7065101280', 'rjeacop8@sphinn.com', 'qsoudhqisudqd74158-', 1),
-- (10, 'Felicio', 'Kennermann', '3023083894', 'fkennermann9@bbc.co.uk', 'qsoudhqisudqd74158-', 2);

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `users_projets`
-- --

-- CREATE TABLE `users_projets` (
--   `Users_ID` int NOT NULL,
--   `Projets_ID` int NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --
-- -- Index pour les tables déchargées
-- --

-- --
-- -- Index pour la table `avenants`
-- --
-- ALTER TABLE `avenants`
--   ADD PRIMARY KEY (`ID avenant`),
--   ADD KEY `fk_Avenants_Référence1_idx` (`Référence_ID`),
--   ADD KEY `fk_Avenants_Marchés1_idx` (`Marchés_ID`);

-- --
-- -- Index pour la table `dce`
-- --
-- ALTER TABLE `dce`
--   ADD PRIMARY KEY (`ID dce`),
--   ADD KEY `fk_DCE_Projets1_idx` (`Projets_ID`);

-- --
-- -- Index pour la table `lots`
-- --
-- ALTER TABLE `lots`
--   ADD PRIMARY KEY (`ID lot`,`DCE_ID`),
--   ADD KEY `fk_Lots_DCE1_idx` (`DCE_ID`),
--   ADD KEY `fk_Lots_Marchés1_idx` (`Marchés_ID`),
--   ADD KEY `fk_Lots_Projets1_idx` (`Projets_ID`);

-- --
-- -- Index pour la table `marchés`
-- --
-- ALTER TABLE `marchés`
--   ADD PRIMARY KEY (`ID marché`);

-- --
-- -- Index pour la table `paiements`
-- --
-- ALTER TABLE `paiements`
--   ADD PRIMARY KEY (`ID paiement`),
--   ADD KEY `fk_Paiements_Référence1_idx` (`Référence_ID`),
--   ADD KEY `fk_Paiements_Marchés1_idx` (`Marchés_ID`);

-- --
-- -- Index pour la table `projets`
-- --
-- ALTER TABLE `projets`
--   ADD PRIMARY KEY (`ID projet`);

-- --
-- -- Index pour la table `référence`
-- --
-- ALTER TABLE `référence`
--   ADD PRIMARY KEY (`ID référence`);

-- --
-- -- Index pour la table `rôles`
-- --
-- ALTER TABLE `rôles`
--   ADD PRIMARY KEY (`ID role`),
--   ADD UNIQUE KEY `ID role_UNIQUE` (`ID role`);

-- --
-- -- Index pour la table `situations`
-- --
-- ALTER TABLE `situations`
--   ADD PRIMARY KEY (`ID situation`),
--   ADD KEY `fk_Situations_Référence1_idx` (`Référence_ID`),
--   ADD KEY `fk_Situations_Marchés1_idx` (`Marchés_ID`);

-- --
-- -- Index pour la table `users`
-- --
-- ALTER TABLE `users`
--   ADD PRIMARY KEY (`ID user`),
--   ADD UNIQUE KEY `ID user_UNIQUE` (`ID user`),
--   ADD KEY `fk_Users_Rôles1_idx` (`Rôles_ID`);

-- --
-- -- Index pour la table `users_projets`
-- --
-- ALTER TABLE `users_projets`
--   ADD PRIMARY KEY (`Users_ID`,`Projets_ID`),
--   ADD KEY `fk_Users_has_Projets_Projets1_idx` (`Projets_ID`),
--   ADD KEY `fk_Users_has_Projets_Users1_idx` (`Users_ID`);

-- --
-- -- AUTO_INCREMENT pour les tables déchargées
-- --

-- --
-- -- AUTO_INCREMENT pour la table `avenants`
-- --
-- ALTER TABLE `avenants`
--   MODIFY `ID avenant` int NOT NULL AUTO_INCREMENT;

-- --
-- -- AUTO_INCREMENT pour la table `dce`
-- --
-- ALTER TABLE `dce`
--   MODIFY `ID dce` int NOT NULL AUTO_INCREMENT;

-- --
-- -- AUTO_INCREMENT pour la table `lots`
-- --
-- ALTER TABLE `lots`
--   MODIFY `ID lot` int NOT NULL AUTO_INCREMENT;

-- --
-- -- AUTO_INCREMENT pour la table `marchés`
-- --
-- ALTER TABLE `marchés`
--   MODIFY `ID marché` int NOT NULL AUTO_INCREMENT;

-- --
-- -- AUTO_INCREMENT pour la table `paiements`
-- --
-- ALTER TABLE `paiements`
--   MODIFY `ID paiement` int NOT NULL AUTO_INCREMENT;

-- --
-- -- AUTO_INCREMENT pour la table `projets`
-- --
-- ALTER TABLE `projets`
--   MODIFY `ID projet` int NOT NULL AUTO_INCREMENT;

-- --
-- -- AUTO_INCREMENT pour la table `référence`
-- --
-- ALTER TABLE `référence`
--   MODIFY `ID référence` int NOT NULL AUTO_INCREMENT;

-- --
-- -- AUTO_INCREMENT pour la table `rôles`
-- --
-- ALTER TABLE `rôles`
--   MODIFY `ID role` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

-- --
-- -- AUTO_INCREMENT pour la table `users`
-- --
-- ALTER TABLE `users`
--   MODIFY `ID user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

-- --
-- -- Contraintes pour les tables déchargées
-- --

-- --
-- -- Contraintes pour la table `avenants`
-- --
-- ALTER TABLE `avenants`
--   ADD CONSTRAINT `fk_Avenants_Marchés1` FOREIGN KEY (`Marchés_ID`) REFERENCES `marchés` (`ID marché`),
--   ADD CONSTRAINT `fk_Avenants_Référence1` FOREIGN KEY (`Référence_ID`) REFERENCES `référence` (`ID référence`);

-- --
-- -- Contraintes pour la table `dce`
-- --
-- ALTER TABLE `dce`
--   ADD CONSTRAINT `fk_DCE_Projets1` FOREIGN KEY (`Projets_ID`) REFERENCES `projets` (`ID projet`);

-- --
-- -- Contraintes pour la table `lots`
-- --
-- ALTER TABLE `lots`
--   ADD CONSTRAINT `fk_Lots_DCE1` FOREIGN KEY (`DCE_ID`) REFERENCES `dce` (`ID dce`),
--   ADD CONSTRAINT `fk_Lots_Marchés1` FOREIGN KEY (`Marchés_ID`) REFERENCES `marchés` (`ID marché`),
--   ADD CONSTRAINT `fk_Lots_Projets1` FOREIGN KEY (`Projets_ID`) REFERENCES `projets` (`ID projet`);

-- --
-- -- Contraintes pour la table `paiements`
-- --
-- ALTER TABLE `paiements`
--   ADD CONSTRAINT `fk_Paiements_Marchés1` FOREIGN KEY (`Marchés_ID`) REFERENCES `marchés` (`ID marché`),
--   ADD CONSTRAINT `fk_Paiements_Référence1` FOREIGN KEY (`Référence_ID`) REFERENCES `référence` (`ID référence`);

-- --
-- -- Contraintes pour la table `situations`
-- --
-- ALTER TABLE `situations`
--   ADD CONSTRAINT `fk_Situations_Marchés1` FOREIGN KEY (`Marchés_ID`) REFERENCES `marchés` (`ID marché`),
--   ADD CONSTRAINT `fk_Situations_Référence1` FOREIGN KEY (`Référence_ID`) REFERENCES `référence` (`ID référence`);

-- --
-- -- Contraintes pour la table `users`
-- --
-- ALTER TABLE `users`
--   ADD CONSTRAINT `fk_Users_Rôles1` FOREIGN KEY (`Rôles_ID`) REFERENCES `rôles` (`ID role`);

-- --
-- -- Contraintes pour la table `users_projets`
-- --
-- ALTER TABLE `users_projets`
--   ADD CONSTRAINT `fk_Users_has_Projets_Projets1` FOREIGN KEY (`Projets_ID`) REFERENCES `projets` (`ID projet`),
--   ADD CONSTRAINT `fk_Users_has_Projets_Users1` FOREIGN KEY (`Users_ID`) REFERENCES `users` (`ID user`);
-- COMMIT;

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

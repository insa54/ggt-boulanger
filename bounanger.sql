-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8890
-- Généré le :  mer. 16 mars 2022 à 09:53
-- Version du serveur :  5.6.38
-- Version de PHP :  7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `bounanger`
--

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id` int(11) NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `prix` float NOT NULL,
  `image` varchar(255) NOT NULL,
  `actif` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id`, `libelle`, `description`, `prix`, `image`, `actif`) VALUES
(1, 'Pain', 'Pain 100g ', 100, '130146940_3547779748662592_8456537124485356993_n.jpg', 0),
(2, 'Croissant', 'Croissant au chicot', 500, '', 0),
(3, 'Croissant beure', 'Croissant au beure', 550, '3131511.jpg', 0),
(4, 'Pain maïs', 'Pain mais', 200, '66F72FFC-0067-4B7F-94A8-9718AE50888B.JPG', 0),
(5, 'Chouquette', '', 100, '66F72FFC-0067-4B7F-94A8-9718AE50888B.JPG', 0),
(6, 'Pain chocot', '', 500, '200827938_153466996824742_8873961070707368779_n.jpg', 0),
(7, 'Pain simple', '', 100, '153625905_268286308014368_2770503647905787375_n.jpg', 0),
(8, 'Pain au lait', '', 200, '200827938_153466996824742_8873961070707368779_n.jpg', 0),
(9, 'Palmier', '', 200, '66F72FFC-0067-4B7F-94A8-9718AE50888B.JPG', 0),
(10, 'Cockies', '', 200, '66F72FFC-0067-4B7F-94A8-9718AE50888B.JPG', 0),
(11, 'N\'importe quoi', '', 300, '130146940_3547779748662592_8456537124485356993_n.jpg', 0),
(12, 'Okay', '', 300, '153625905_268286308014368_2770503647905787375_n.jpg', 0),
(13, 'This the ultimate product', 'This the ultimate product', 4000, '68746278_516578345813419_9091881240913205977_n.jpg', 0),
(14, 'Finaly', 'final test', 230, '66632478_219348679034125_5019353178412517916_n.jpg', 0);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `actif` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(200) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `profil` varchar(200) NOT NULL,
  `actif` int(11) NOT NULL DEFAULT '0',
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `mdp`, `profil`, `actif`, `date_creation`) VALUES
(1, 'Sow', 'Baye insa', 'bayeince@gmail.com', 'e7247759c1633c0f9f1485f3690294a9', 'ADMIN', 0, '2022-03-15 11:36:33'),
(5, 'Simple', 'Past', 'simple@email.com', 'e7247759c1633c0f9f1485f3690294a9', 'SIMPLE', 0, '2022-03-15 19:08:15');

-- --------------------------------------------------------

--
-- Structure de la table `vente`
--

CREATE TABLE `vente` (
  `id` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `qte` int(11) NOT NULL,
  `total` float NOT NULL,
  `date_vente` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `vente`
--

INSERT INTO `vente` (`id`, `id_produit`, `qte`, `total`, `date_vente`) VALUES
(1, 1, 5, 500, '2022-03-11 16:24:18'),
(2, 1, 1, 100, '2022-03-11 16:25:02'),
(3, 1, 1, 100, '2022-03-11 16:25:29'),
(4, 1, 1, 100, '2022-03-11 16:25:41'),
(5, 1, 1, 100, '2022-03-11 16:27:44'),
(6, 1, 1, 100, '2022-03-11 16:56:48'),
(7, 1, 1, 100, '2022-03-11 16:57:07'),
(8, 1, 0, 0, '2022-03-11 16:58:15'),
(9, 1, 1, 100, '2022-03-14 09:35:49'),
(10, 1, 1, 100, '2022-03-14 09:36:08'),
(11, 2, 1, 500, '2022-03-14 13:49:04'),
(12, 1, 1, 100, '2022-03-15 16:05:27'),
(13, 1, 1, 100, '2022-03-15 17:39:26'),
(14, 1, 3, 300, '2022-03-15 17:39:26'),
(15, 2, 2, 1000, '2022-03-15 17:39:26'),
(16, 3, 7, 3850, '2022-03-15 18:43:06'),
(17, 3, 7, 3850, '2022-03-15 18:43:54'),
(18, 2, 1, 500, '2022-03-15 19:08:43');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vente`
--
ALTER TABLE `vente`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `vente`
--
ALTER TABLE `vente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8890
-- Généré le :  mar. 15 mars 2022 à 18:58
-- Version du serveur :  5.6.38
-- Version de PHP :  7.2.1

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET time_zone
= "+00:00";

--
-- Base de données :  `bounanger`
--

-- --------------------------------------------------------

--
-- Structure de la table `vente`
--

CREATE TABLE `vente`
(
  `id` int
(11) NOT NULL,
  `id_produit` int
(11) NOT NULL,
  `qte` int
(11) NOT NULL,
  `total` float NOT NULL,
  `date_vente` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `vente`
--

INSERT INTO `vente` (`
id`,
`id_produit
`, `qte`, `total`, `date_vente`) VALUES
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
(17, 3, 7, 3850, '2022-03-15 18:43:54');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `vente`
--
ALTER TABLE `vente`
ADD PRIMARY KEY
(`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `vente`
--
ALTER TABLE `vente`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

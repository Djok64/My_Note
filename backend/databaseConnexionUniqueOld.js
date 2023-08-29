// Cette ligne permet d'importer et d'exécuter la bibliothèque "dotenv".
// C'est un module qui charge les variables d'environnement d'un fichier .env dans process.env.
require("dotenv").config()

// Importe la bibliothèque mysql2/promise, qui permet d'utiliser MySQL avec des Promesses
// (au lieu des callbacks), ce qui rend le code plus lisible et gérable.
const mysql = require("mysql2/promise")

// Déstructure et récupère les variables d'environnement nécessaires à la connexion à la base de données.
// Ces valeurs sont généralement stockées dans un fichier .env pour des raisons de sécurité.
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

// Crée une connexion à la base de données MySQL en utilisant les informations fournies.
const connection = mysql.createConnection({
  host: DB_HOST, // L'adresse de l'hôte où la base de données est située.
  port: DB_PORT, // Le port sur lequel MySQL écoute
  user: DB_USER, // Le nom d'utilisateur pour accéder à la base de données
  password: DB_PASSWORD, // Le mot de passe pour cet utilisateur.
  database: DB_NAME, // Le nom de la base de données à laquelle vous voulez vous connecter.
})

// Affiche un message dans la console pour informer que la connexion a été établie avec succès.
console.info("Connexion réussie !")
// Exporte l'objet "connection" afin qu'il puisse être utilisé dans d'autres fichiers du projet.
module.exports = connection

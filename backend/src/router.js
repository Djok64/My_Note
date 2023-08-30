// importer les modules nécessaires
const express = require("express")

const router = express.Router()
// ce sont les controller du template :
const userControllers = require("../controllers/userControllers")
const noteControllers = require("../controllers/noteControllers")

const itemControllers = require("./controllers/itemControllers")
const charactersControllers = require("./controllers/charactersControllers")

// CREATION DES ROUTES POUR LA TABLE users :

// Pour récupérer tous les utilisateurs de la table users:
router.get("/users", userControllers.browse)
// Pour récupérer un utilisateur spécifique par ID de la table users:
router.get("/users/:id", userControllers.read)
// Pour ajouter un nouvel utilisateur a la table users:
router.post("/users", userControllers.add)
// Pour mettre à jour un utilisateur de la table users:
router.put("/users/:id", userControllers.edit)
// Pour supprimer un utilisateur de la table users:
router.delete("/users/:id", userControllers.destroy)

// CREATION DES ROUTES POUR LA TABLE notes :

// Pour récupérer tout les notes :
router.get("/notes", noteControllers.browse)
// Pour récupérer une note spécifique par son ID:
router.get("/notes/:id", noteControllers.read)
// Pour ajouter une nouvelle note:
router.post("/notes", noteControllers.add)
// Pour mettre a jour une note:
router.put("/notes/:id", noteControllers.edit)
// Pour supprimer une note :
router.delete("/notes/:id", noteControllers.destroy)

// exemple des controllers de  bases du template :
router.get("/characters", charactersControllers.browse)
router.get("/characters/:id", charactersControllers.read)
router.post("/characters", charactersControllers.add)
router.put("/characters/:id", charactersControllers.edit)
router.delete("/characters/:id", charactersControllers.destroy)

router.get("/items", itemControllers.browse)
router.get("/items/:id", itemControllers.read)
router.put("/items/:id", itemControllers.edit)
router.post("/items", itemControllers.add)
router.delete("/items/:id", itemControllers.destroy)

// exportation du fichier pour pouvoir l'utiliser dans un autre fichier
module.exports = router

// EXPLICATIONS SUR LES ROUTES EN DETAIL:

// Fonctionnement des routes
// Chaque ligne que tu as partagée définit une "route" dans ton serveur Express. Une route est essentiellement une combinaison d'une URL et d'une méthode HTTP. Lorsqu'une requête arrive à ton serveur avec cette combinaison spécifique, le serveur sait quelle action il doit exécuter.

// Déclenchement des routes
// Imaginons que tu aies un serveur fonctionnant à l'adresse http://monserveur.com.

// Si quelqu'un va sur http://monserveur.com/notes avec son navigateur (ce qui équivaut à une requête GET), la première route (router.get("/notes", noteControllers.browse)) se déclenche. La fonction noteControllers.browse est exécutée pour traiter cette requête.

// Si quelqu'un utilise un client API comme Postman ou fait une requête programmée pour obtenir http://monserveur.com/notes/123, la route avec :id (router.get("/notes/:id", noteControllers.read)) est déclenchée, et noteControllers.read est exécutée. Ici, 123 est passé en tant que paramètre id.

// Middlewares et contrôleurs
// Dans Express, tout est middleware. Les routes sont simplement des middlewares qui se déclenchent seulement si la combinaison URL/méthode HTTP correspond.

// Le noteControllers.browse, noteControllers.read, etc., sont des fonctions (souvent appelées actions de contrôleur) qui traitent la requête et envoient une réponse. Ces fonctions reçoivent généralement trois paramètres principaux:

// req (Requête): contient toutes les informations sur la requête entrante, comme les paramètres d'URL, les données du corps de la requête, les en-têtes, etc.
// res (Réponse): un objet utilisé pour envoyer des réponses au client. Par exemple, si tu veux envoyer un message "Salut!" comme réponse, tu ferais quelque chose comme res.send("Salut!") dans ton contrôleur.
// next: une fonction qui, lorsqu'elle est appelée, passe le contrôle au prochain middleware. Si tu ne l'appelles pas, le cycle de requête/réponse se termine là.
// Ordre des routes
// L'ordre dans lequel tu définis tes routes est important. Express utilisera la première route correspondante qu'il trouve. Si tu avais défini la route /notes/:id avant /notes, et qu'un utilisateur demandait /notes, Express traiterait cela comme s'il cherchait une note avec l'ID "notes", ce qui n'est probablement pas ce que tu veux.

// Paramètres d'URL
// Les :param dans les routes, comme :id, sont des "paramètres d'URL". Ils correspondent à n'importe quelle valeur. Ainsi, /notes/123 et /notes/abc correspondent tous deux à la route /notes/:id, et tu peux accéder à la valeur spécifique (comme 123 ou abc) dans ton contrôleur via req.params.id.

// Résumé
// Chaque fois qu'une requête arrive à ton serveur, Express vérifie si l'URL et la méthode HTTP correspondent à l'une des routes définies. Si c'est le cas, le contrôleur correspondant est exécuté pour traiter la requête et envoyer une réponse.
// test

// Vous importez deux modules Node.js.

// File System, qui vous permet d'interagir avec le système de fichiers de votre ordinateur (lire, écrire, etc.):
const fs = require("node:fs")
// path est utilisé pour gérer les chemins de fichiers:
const path = require("node:path")

// Vous importez le module Express, un framework pour construire des applications web et API en Node.js. app est une instance de votre application Express:

const express = require("express")

const app = express()

// Vous ajoutez un middleware qui analyse les requêtes entrantes avec des payloads JSON et les transforme en objets JavaScript accessibles via req.body:
app.use(express.json())
// Vous importez le middleware CORS (Cross-Origin Resource Sharing). CORS est une sécurité dans les navigateurs web qui empêche les requêtes HTTP d'être effectuées entre différents domaines, sauf si le domaine cible le permet:
const cors = require("cors")

// Vous ajoutez le middleware CORS à votre application. L'option origin détermine quel domaine est autorisé à accéder à votre API. Si process.env.FRONTEND_URL n'est pas défini, il utilisera "http://localhost:3000" comme valeur par défaut. optionsSuccessStatus est le code de statut à envoyer pour les requêtes OPTIONS réussies:
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
)

// Vous importez votre module de routage (défini ailleurs dans votre projet) et l'ajoutez à votre application. Ce module détermine comment répondre aux différentes requêtes HTTP adressées à votre API:
const router = require("./router")
app.use(router)

// Vous configurez votre application pour servir des fichiers statiques (comme des images ou des fichiers CSS) depuis un dossier public dans le dossier parent de votre fichier actuel. __dirname est une variable globale en Node.js qui donne le chemin du répertoire du fichier en cours d'exécution:
app.use(express.static(path.join(__dirname, "../public")))

// Vous définissez le chemin vers le fichier index.html de votre application React. Vous supposez que votre application React est construite et ses fichiers sont dans le dossier "dist" sous un dossier "frontend" à la racine de votre projet:
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
)

// Si le fichier index.html de votre application React existe (c'est-à-dire si vous avez construit votre application React), alors:
if (fs.existsSync(reactIndexFile)) {
  // Servez tous les fichiers statiques de votre application React:
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")))

  // Pour toutes les autres requêtes (ce qui est signifié par "*"), renvoyez le fichier index.html. C'est une technique courante pour les applications React à page unique (Single Page Applications ou SPA) où React Router gère le routage côté client:
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile)
  })
}

// ready to export
// Vous exportez l'instance de votre application Express pour pouvoir l'utiliser ailleurs dans votre projet, probablement dans un fichier où vous démarrez votre serveur.
module.exports = app

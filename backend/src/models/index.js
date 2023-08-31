// Configuration de l'environnement et de la base de données :
require("dotenv").config()

const mysql = require("mysql2/promise")

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env
// Ici, vous configurez l'environnement pour accéder aux variables d'environnement (comme les identifiants de la base de données) à partir du fichier .env et importez le module MySQL.

// Création d'une pool de connexions à la base de données :
const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
})
// Cette section crée un pool de connexions à la base de données. Utiliser un pool est plus efficace que d'ouvrir une nouvelle connexion à chaque fois que vous en avez besoin, car cela permet de réutiliser les connexions existantes.

// Test de la connexion à la base de données :
pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  )
})
// Ceci est une simple vérification pour s'assurer que vous pouvez vous connecter à la base de données.

// declare and fill models: that's where you should register your own managers
// Déclaration et remplissage des modèles :
const models = {}

const ItemManager = require("./ItemManager")
const CharactersManager = require("./CharactersManager")
const NoteManager = require("./NoteManager")
const UserManager = require("./UserManager")

models.item = new ItemManager()
models.item.setDatabase(pool)

models.characters = new CharactersManager()
models.characters.setDatabase(pool)

models.note = new NoteManager()
models.note.setDatabase(pool)

models.user = new UserManager()
models.user.setDatabase(pool)
// liaison du model a la base de donnée:
// Cette section charge chaque manager, crée une nouvelle instance de chaque manager, puis définit la base de données (la pool de connexions) pour chacun d'eux.

// bonus: use a proxy to personalize error message,
// when asking for a non existing model
//  Utilisation d'un proxy pour des erreurs personnalisées :

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop]
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1)

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    )
  },
}
// Ceci est une fonctionnalité avancée de JavaScript. Si jamais vous essayez d'accéder à un modèle qui n'a pas été défini (par exemple, models.abc), au lieu d'obtenir une simple erreur, vous obtiendrez un message d'erreur personnalisé indiquant qu'il peut manquer un manager pour ce modèle.
module.exports = new Proxy(models, handler)

// En résumé, ce fichier sert à initialiser et configurer tous vos managers et à établir une connexion avec la base de données. Lorsque vous avez ajouté le NoteManager, vous avez correctement suivi la structure existante pour inclure ce nouveau manager dans l'ensemble des modèles de votre application.

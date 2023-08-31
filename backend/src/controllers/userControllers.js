const models = require("../models")

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows[0])
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const edit = (req, res) => {
  const user = req.body
  const id = parseInt(req.params.id, 10)

  models.user
    .update(id, user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404) // Utilisateur non trouvé
      } else {
        res.sendStatus(204) // Succès, mais pas de contenu à renvoyer
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const add = (req, res) => {
  const user = req.body

  models.user
    .insert(user)
    .then(([result]) => {
      // Si l'insertion est réussie, définir la localisation dans l'en-tête de réponse
      // et envoyer le statut 201.
      res.location(`/users/${result.insertId}`).sendStatus(201)
      console.info(result)
    })
    .catch((err) => {
      console.error(err) // Log de l'erreur

      // Si l'erreur est due à une entrée dupliquée (nom d'utilisateur déjà pris)
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).send("Ce nom d'utilisateur est déjà pris")
      } else {
        // Pour toute autre erreur, renvoyer un statut 500 (erreur interne du serveur)
        res.sendStatus(500)
      }
    })
}

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
}

const models = require("../models")

const browse = (req, res) => {
  models.item
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
  models.item
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
  const item = req.body

  // TODO validations (length, format...)

  item.id = parseInt(req.params.id, 10)

  models.item
    .update(item)
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

const add = (req, res) => {
  const item = req.body

  // TODO validations (length, format...)

  models.item
    .insert(item)
    .then(([result]) => {
      res.location(`/items/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const destroy = (req, res) => {
  models.item
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

// Le commentaire  TODO validations (length, format...) est une note placée par le développeur pour indiquer que, à cet endroit précis du code, des vérifications ou "validations" supplémentaires doivent être ajoutées ultérieurement. Ces validations permettent de s'assurer que les données fournies par l'utilisateur ou par un client respectent certaines conditions avant d'être traitées ou enregistrées dans la base de données.
// Les validations sont essentielles dans les applications pour garantir l'intégrité des données et la sécurité. Cependant, lors de la première création d'un projet ou d'une fonctionnalité, certains développeurs choisissent de d'abord mettre en place les fonctionnalités principales, puis d'ajouter des validations ultérieurement. Cette approche est parfois appelée "make it work, then make it right" (faites-le fonctionner, puis faites-le correctement). Bien que ce ne soit pas l'approche optimale, elle est courante, surtout quand on est pressé.

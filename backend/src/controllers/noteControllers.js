const models = require("../models")

// Cette fonction renvoie toutes les notes find(All) le controler le tien du manager c'est le handler de la route associé dans router.js
const browse = (req, res) => {
  models.note
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

// Cette fonction renvoie une note spécifique en fonction de son ID c'est le handler de la route associé dans router.js
const read = (req, res) => {
  models.note
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

// Cette fonction met à jour une note c'est le handler de la route associé dans router.js
const edit = (req, res) => {
  const note = req.body
  const id = parseInt(req.params.id, 10)
  // Le deuxième argument de parseInt : Le deuxième argument est appelé "radix" et il indique à la fonction quelle base numérique utiliser pour la conversion. En JavaScript, les nombres peuvent être écrits en différentes bases, telles que décimale (base 10), hexadécimale (base 16), binaire (base 2), etc. Le "10" indique que la conversion doit être effectuée en utilisant la base décimale (base 10).

  models.note
    .uptade(id, note)
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

// Cette fonction ajoute une nouvelle note c'est le handler de la route associé dans router.js
const add = (req, res) => {
  const note = req.body

  models.note
    .insert(note)
    .then(([result]) => {
      res.location(`/notes/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

// Cette fonction supprime une note c'est le handler de la route associé dans router.js
const destroy = (req, res) => {
  models.note
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

// Explication du code pour le cotroller
// 1. Fonction browse - Récupérer toutes les notes.

// javascript
// Copy code
// const browse = (req, res) => {
//   models.note
//     .findAll()
//     .then(([rows]) => {
//       res.send(rows);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// models.note.findAll(): Cette ligne appelle la méthode findAll de votre modèle Note pour récupérer toutes les notes de votre base de données.

// .then(([rows]) => { ... }): Si l'opération réussit, la promesse est résolue et nous obtenons les rows (lignes) retournées par la requête.

// res.send(rows): Nous utilisons cette ligne pour envoyer les données récupérées en réponse.

// .catch((err) => { ... }): Si une erreur se produit lors de l'exécution de la requête, nous attrapons cette erreur.

// console.error(err): L'erreur est affichée dans la console.
// res.sendStatus(500): Nous renvoyons une réponse avec le statut HTTP 500, qui indique une erreur serveur.

// 2. Fonction read - Récupérer une note spécifique en fonction de son ID.

// javascript
// Copy code
// const read = (req, res) => {
//   const id = req.params.id;

//   models.note
//     .find(id)
//     .then(([rows]) => {
//       if (rows[0] == null) {
//         res.sendStatus(404);
//       } else {
//         res.send(rows[0]);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// const id = req.params.id: Cette ligne récupère l'ID de la note depuis l'URL. Par exemple, pour l'URL /notes/5, req.params.id serait 5.

// models.note.find(id): Nous utilisons l'ID pour appeler la méthode find de notre modèle et récupérer la note correspondante.

// if (rows[0] == null) { ... }: Cette condition vérifie si une note a été trouvée. Si rows[0] est null, cela signifie que la note avec l'ID spécifié n'existe pas.

// res.sendStatus(404): Si la note n'est pas trouvée, nous renvoyons un statut HTTP 404 pour indiquer une ressource non trouvée.

// res.send(rows[0]): Si la note est trouvée, nous l'envoyons en réponse.

// 3. Fonction edit - Mettre à jour une note.

// javascript
// Copy code
// const edit = (req, res) => {
//   const note = req.body;
//   const id = parseInt(req.params.id, 10);

//   models.note
//     .update(id, note)
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// const note = req.body: Cette ligne récupère les données envoyées avec la requête. Ces données contiennent les détails mis à jour de la note.

// const id = parseInt(req.params.id, 10): Nous récupérons l'ID de la note depuis l'URL et nous nous assurons qu'il est bien un nombre entier.
// Le "10" indique que la conversion doit être effectuée en utilisant la base décimale (base 10).

// models.note.update(id, note): Nous appelons la méthode update de notre modèle pour mettre à jour la note avec l'ID spécifié.

// if (result.affectedRows === 0) { ... }: Cette condition vérifie si la mise à jour a été effectuée. Si affectedRows est égal à 0, cela signifie qu'aucune ligne (note) n'a été mise à jour.

// res.sendStatus(404): Si aucune note n'a été mise à jour, nous renvoyons un statut HTTP 404.

// res.sendStatus(204): Si la mise à jour est réussie, nous renvoyons un statut HTTP 204(No Content), ce qui signifie que la requête a réussi, mais qu'il n'y a pas de contenu à envoyer en réponse.

// 4. Fonction add - Ajouter une nouvelle note.

// javascript
// Copy code
// const add = (req, res) => {
//   const note = req.body;

//   // TODO validations (length, format...)

//   models.note
//     .insert(note)
//     .then(([result]) => {
//       res.location(`/notes/${result.insertId}`).sendStatus(201);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// const note = req.body: Cette ligne récupère les données envoyées avec la requête. Ces données représentent les détails de la nouvelle note à ajouter.

// models.note.insert(note): Nous utilisons la méthode insert de notre modèle pour ajouter une nouvelle note dans la base de données avec les détails fournis.

// .then(([result]) => { ... }): Si l'opération d'insertion réussit, la promesse est résolue et nous obtenons le résultat de la requête.

// res.location(/notes/${result.insertId}).sendStatus(201): Dans le cas d'une insertion réussie, nous envoyons un statut HTTP 201 (Created) pour indiquer que la ressource a été créée avec succès. De plus, nous utilisons res.location() pour ajouter un en-tête "Location" à la réponse, pointant vers la nouvelle note ajoutée.

// .catch((err) => { ... }): Comme auparavant, si une erreur se produit lors de l'exécution de la requête, nous attrapons cette erreur et envoyons un statut HTTP 500 pour indiquer une erreur interne du serveur.

// 5. Fonction destroy - Supprimer une note en fonction de son ID.

// javascript
// Copy code
// const destroy = (req, res) => {
//   const id = req.params.id;

//   models.note
//     .delete(id)
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// const id = req.params.id: Nous récupérons l'ID de la note depuis l'URL pour savoir quelle note supprimer.

// models.note.delete(id): Nous utilisons la méthode delete de notre modèle pour supprimer la note avec l'ID spécifié de la base de données.

// if (result.affectedRows === 0) { ... }: Cette condition vérifie si la suppression a été effectuée. Si affectedRows est égal à 0, cela signifie qu'aucune ligne (note) n'a été supprimée.

// res.sendStatus(404): Si aucune note n'a été supprimée, cela signifie que la note avec l'ID spécifié n'existe pas, nous renvoyons donc un statut HTTP 404.

// res.sendStatus(204): Si la note est supprimée avec succès, nous renvoyons un statut HTTP 204 (No Content).

// Résumé:
// Chaque fonction de ce contrôleur est liée à une opération CRUD spécifique (Create, Read, Update, Delete). Ces fonctions interagissent avec la base de données à travers le modèle note pour réaliser l'opération souhaitée, puis renvoient une réponse appropriée au client. Les fonctions utilisent également des gestionnaires d'erreur pour s'assurer que, en cas de problème avec la base de données, une réponse appropriée est renvoyée au client.

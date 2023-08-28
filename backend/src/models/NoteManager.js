// Creation de NoteManager.js en utilisant les méthodes CRUD pour la table "note"

const AbstractManager = require("./AbstractManager") // Vous importez AbstractManager car vous voulez hériter de ses méthodes et propriétés exemple find(all/id) delete(all/id) qui sont des methode applicable dans tout les Manager car peu importe la structure de la table cela fonctionnera

class NoteManager extends AbstractManager {
  // faire hérité a NoteManager les methode de AbstractManager
  constructor() {
    // Le constructeur initialise la table avec le nom "note"
    super({ table: "notes" })
  }

  // CREATE ci dessous Prend en argument un objet note qui contient les propriétés title et content.
  // Utilise la méthode query de l'objet database pour insérer une nouvelle note dans la table note.
  // Renvoie le résultat de la requête.

  insert(notes) {
    // Insérer une nouvelle note dans la base de données
    return this.database.query(
      `INSERT INTO ${this.table} (title, content, dateCreated) VALUES (?, ?, ?)`,
      [notes.title, notes.content, notes.dateCreated]
    )
  }

  // READ (Single) find(id) dans AbstractManager.js
  // Déjà hérité de AbstractManager, cette méthode récupérera une note spécifique en fonction de son ID.

  // READ (All) find(all) dans AbstractManager.js
  // Déjà hérité de AbstractManager, cette méthode récupérera toutes les notes de la base de données.

  // UPDATE ci dessous  Prend en argument un objet note qui contient les propriétés title, content et id.
  // Utilise la méthode query de l'objet database pour mettre à jour une note existante en fonction de son id.
  // Renvoie le résultat de la requête.
  update(notes) {
    // Mettre à jour une note spécifique dans la base de données en fonction de son ID
    return this.database.query(
      `UPDATE ${this.table} SET title = ?, content = ?, dateCreated = ? WHERE id = ?`,
      [notes.title, notes.content, notes.dateCreated, notes.id]
    )
  }

  // DELETE
  // Déjà hérité de AbstractManager, cette méthode supprimera une note spécifique en fonction de son ID.
}

module.exports = NoteManager // Exportation: À la fin, vous exportez la classe NoteManager pour pouvoir l'utiliser ailleurs dans votre application.

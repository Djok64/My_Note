// ceci est le manager "général" il contient les methode propre a toute les tables
// toutes ces methode seront transmise aux autre manager pour chaque table via :
// class NoteManager extends AbstractManager {
class AbstractManager {
  constructor({ table }) {
    this.table = table
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ])
  } // cette méthode récupérera une note spécifique en fonction de son ID.

  findAll() {
    return this.database.query(`select * from  ${this.table}`)
  } // cette méthode récupérera toutes les notes de la base de données.

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id])
  } // cette méthode supprimera une note spécifique en fonction de son ID.

  setDatabase(database) {
    this.database = database
  }
}

module.exports = AbstractManager

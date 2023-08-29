const AbstractManager = require("./AbstractManager")

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" })
  }

  insert(user) {
    return this.database.query(
      `INSET INTO ${this.table} (username, password) VALUES (?, ?)`,
      [user.username, user.password]
    )
  }

  uptade(user) {
    return this.database.query(
      `UPDATE ${this.table} SET username = ?, password = ? WHERE id = ?`,
      [user.username, user.password]
    )
  }

  findByUsername(username) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE username = ?`,
      [username]
    )
  }
}

module.exports = UserManager

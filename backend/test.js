require("dotenv").config()
const mysql = require("mysql2/promise")

const testConnection = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    multipleStatements: true,
  })

  console.info("Connexion réussie !")
  await connection.end()
}

testConnection()

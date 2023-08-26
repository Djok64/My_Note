/* eslint-disable no-restricted-syntax */
require("dotenv").config()

const fs = require("fs")
const mysql = require("mysql2/promise")

const migrate = async () => {
  console.log("Début de la migration...")
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  })
  console.log(connection)
  await connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`)
  console.log(`Base de données ${DB_NAME} supprimée si elle existait.`)
  await connection.query(`CREATE DATABASE ${DB_NAME}`)
  console.log(`Base de données ${DB_NAME} créée.`)
  await connection.query(`USE ${DB_NAME}`)
  console.log(`Utilisation de la base de données ${DB_NAME}.`)

  const sql = fs.readFileSync("./database.sql", "utf8")

  await connection.query(sql)
  console.log("Script SQL exécuté.")

  connection.end()
  console.log("Migration terminée !")
}

try {
  migrate()
} catch (err) {
  console.error("erreur pendant la migration", err)
}

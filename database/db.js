require('dotenv').config()
const user = process.env.DB_USER
const host = process.env.DB_HOST
const password = process.env.DB_PASS
const db = process.env.DB

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
    return global.connection
const mysql = require('mysql2/promise')
const connection = await mysql.createConnection(`mysql://${user}:${password}@${host}:3306/${db}`)
console.log("Conectado ao MYSQL")

global.connection = connection
return connection
}



module.exports = {connect}

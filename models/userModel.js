const conexao = require('../database/db')

async function users() {
    const conn = await conexao.connect()
    const [rows] = await conn.query('SELECT nome, email, ocupacao FROM usuario;')
    return rows
}

async function newUser (user) {
    const conn = await conexao.connect()       
    const sql = 'INSERT INTO usuario (nome, email, senha, ocupacao) VALUES (?, ?, ?, ?)'
    values = [user.nome, user.email, user.senhaHash, user.ocupacao]    
    const [rows] = await conn.query(sql, values)
    console.log(sql, values)
    return rows
}
async function login (email) {
    const conn = await conexao.connect()
    const sql = 'select * from usuario where email=?'
    values = [ email ]
    const [rows] = await conn.query(sql, values)
    console.log(rows)
    return rows
 
}

module.exports = {users, newUser, login}
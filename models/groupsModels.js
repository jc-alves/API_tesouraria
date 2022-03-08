const db = require('../database/db')




async function remove(id) {
    const conn = await db.connect();
    const sql = 'DELETE FROM grupos WHERE id=?'  
    return await conn.query(sql, id)
}

async function creatergroup(grupo){  
  
    const conn = await db.connect();
    const sql = 'INSERT INTO grupos(nome, diocese, coordenador, tesoureiro, email, celcoordenador, celtesoureiro, paroquia) VALUES (?,?,?,?,?,?,?,?);'
    values = [grupo.nome, grupo.diocese, grupo.coordenador, grupo.tesoureiro, grupo.email, grupo.celcoordenador, grupo.celtesoureiro, grupo.paroquia]
    console.log(sql)
    const [rows] = await conn.query(sql, values)
    return rows
    
}


async function selectGrupo() {
    const conn = await db.connect()
    const [rows] = await conn.query('SELECT * FROM grupos;')  
    return rows
}


async function updateGrupo(id, grupo){
    const conn = await db.connect()
    const sql = 'UPDATE grupos SET nome=?, diocese=?, coordenador=?, tesoureiro=?, email=?, celcoordenador=?, celtesoureiro=?, paroquia=? WHERE id=?'
    values = [grupo.nome, grupo.diocese, grupo.coordenador, grupo.tesoureiro, grupo.email, grupo.celcoordenador, grupo.celtesoureiro, grupo.paroquia, id]
    return await conn.query(sql, values)
}

async function busca(id) {
    const conn = await db.connect()
    // const sql = "select * from grupos where LOWER(nome) LIKE CONCAT('%' ?,  '%')"
    const sql = "select * from grupos where id = ?;"
    // const  values = [ nome.toLowerCase() ]
    const  values = [ id ]
    
    console.log(values) 
    return await conn.query(sql, values)
     

}

// async function retirada(usuario){  
  
//     const conn = await db.connect();
//     const sql = 'INSERT INTO grupos(nome, diocese, coordenador, tesoureiro, email, celcoordenador, celtesoureiro, paroquia) VALUES (?,?,?,?,?,?,?,?);'
//     values = [grupo.nome, grupo.diocese, grupo.coordenador, grupo.tesoureiro, grupo.email, grupo.celcoordenador, grupo.celtesoureiro, grupo.paroquia]
//     console.log(sql)
//     const [rows] = await conn.query(sql, values)
//     return rows
    
// }



module.exports = {selectGrupo, creatergroup, updateGrupo, remove, busca}
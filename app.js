require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes/grupos')
const user = require('./routes/routerUser')
const bodyParser =  require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extendet: false}))
app.use(bodyParser.json())

app.use(express.json())

app.use(router)
app.use(user)




app.use((req, res, next)=> {
    const erro = new Error('O endereço não foi localizado')
    erro.status = 404
    next(erro)
 })
 app.use((error, req, res, next)=>{
     res.status(error.status || 500)
     return res.send({
         erro: {
             mensagem: error.message
         }
     })
 })

 module.exports = app;






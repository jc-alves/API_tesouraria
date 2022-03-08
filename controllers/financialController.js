const financialModels = require('../models/financialModels')

async function payment(req, res) { 
        const grupo = {
            id_grupo: req.body.id_grupo,
            entrada: req.body.entrada,
            motivo: req.body.motivo,         
        }
        const conexao = financialModels        
        const dep = await conexao.payment(grupo)      
        res.status(200).send({
            mensagem: "Pagamento recebido" 
           })
        }


        async function saldo(req, res) {
        
            const conexao = financialModels        
            const  resultado = await conexao.saldo()
              res.status(200).send(resultado) 
               
        }
    

    async function extractR(req, res) {
        
        const conexao = financialModels        
        const  resultado = await conexao.extractR()
          res.status(200).send(resultado)      
    }


    
    async function extract(req, res) {
        
        const conexao = financialModels        
        const  resultado = await conexao.extract()
          res.status(200).send(resultado)      
    }
    
    async function  buscap(req, res) {
        const nome = req.params.nome
        const conexao = financialModels
        const result = await conexao.buscapag(nome)
         res.status(200).send(result)}

   
    async function retirada(req, res) {
        const saque = {
            motivo: req.body.motivo,
            retirada: req.body.retirada,
        }        
        const conexao = financialModels
        const saqu = await conexao.retirada(saque)
        res.status(200).send({
            
            mensagem: `Saque realizado `
            
        })
    }

    // async function newUser(req, res) {
    //     const usuarios = {
    //         nome: req.body.nome,
    //         email: req.body.email,
    //         senha: req.body.senha,
    //         ocupacao: req.body.ocupacao
    //     }
    //     const conexao = financialModels
    //     const user = await conexao.newUser(usuarios)
    //     res.status(200).send(user) 
    // }

    // async function user(req, res) {
    //     const conexao = financialModels
    //     const usuario = await conexao.users()      
    //     res.status(200).send(usuario) 
    // }


module.exports = {extract, payment, buscap, retirada, extractR, saldo}
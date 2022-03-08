const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usermodel = require('../models/userModel')




async function user (req, res)  {
    const conexao = usermodel
    const usuario = await conexao.users()  
    res.status(200).send(usuario)
}

async function newUser (req, res) {       
    const { nome, email , senha, confirsenha, ocupacao } = req.body
    // const senhaHash = await bcrypt.hash(senha, 12)

    if(!nome){ return res.status(401).send({msg: "O nome é obrigatorio"}) 
    }
    if(!email){ return res.status(401).send({msg: 'Email é obrigatorio'})
    }
    if(!ocupacao){ return res.status(401).send({msg: 'O cargo é obrigatorio'})
}
    if(!senha){ return res.status(401).send({msg: "A senha é obrigatoria"})
    }
    if(senha !== confirsenha){ return res.status(400).send({msg: "As senhas não conferem!"})
    }   

    const senhaHash = await bcrypt.hash(senha, 10)
   
    const conn = usermodel
    const user = await conn.newUser({nome, email, senhaHash, ocupacao})  
    console.log(nome, email, senhaHash)  
    res.status(201).send(user)  
}


async function login (req, res) {
    const { email, senha} = req.body
    if(!email){ return res.status(400).send({msg: 'Email é obrigatorio'})
    }
    if(!senha){ return res.status(400).send({msg: "A senha é obrigatoria"})
    }
    const usuario = usermodel   
    const user = await usuario.login(email)
    
    if(!user[0]) { 
        return res.status(401).send({ msg: 'usuário ou senha inválidos'})
    } else {
        if (await bcrypt.compare(senha, user[0].senha)) {
            const toke = jwt.sign({email_user: user[0].email}, process.env.SECRET, { expiresIn: '1h' })
            
            return res.send({ 
                email: user[0].email,
                messagem: 'Autenticado com sucesso!' ,
                auth: true,
                toke
                })
                        
        } else {
            return res.status(422).send({ msg: 'senha inválida'})
        }
    }
}

// async function newUser(req, res) {
//         const usuarios = {
//             nome: req.body.nome,
//             email: req.body.email,
//             senha: req.body.senha,
//             ocupacao: req.body.ocupacao
//         }
//         const conexao = usermodel
//         const user = await conexao.newUser(usuarios)
//         res.status(200).send(user) 
//     }

module.exports = {user, login, newUser}
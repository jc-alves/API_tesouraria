const groupsModels = require('../models/groupsModels')
   
    function  filtre(req, res) {
        const id = req.params.id
        const exists = GroupModels.grupos[id]
        

        if(exists != null || undefined ){    
            
            res.status(200).send({
                 mensagem: `Grupo  ${exists.nome} foi localizado!`,  
                 informacao: GroupModels.grupos[id]
        })
               
        } else {

             res.status(404).send({
            mensagem: `Grupo de id ${id} não localizado na base de dados!`  
            
                })
        }
        

    }
    async function create(req, res) { 
        const grupo = {
            nome: req.body.nome,
            diocese: req.body.diocese,
            coordenador: req.body.coordenador,
            tesoureiro: req.body.tesoureiro,
            email: req.body.email,
            celcoordenador: req.body.celcoordenador,
            celtesoureiro: req.body.celtesoureiro,
            paroquia: req.body.paroquia

        }
        const conexao = groupsModels
        
        const grupoNovo = await conexao.creatergroup(grupo)

      
        res.status(200).send({
            mensagem: "Grupo foi criado" 
           })
    }



    
    async function index(req, res) {
        
        const conexao = groupsModels        
        const  resultado = await conexao.selectGrupo()
         
          res.status(200).send(resultado)      
    }
    async function update(req, res) {
        const grupo = {
            nome: req.body.nome,
            diocese: req.body.diocese,
            coordenador: req.body.coordenador,
            tesoureiro: req.body.tesoureiro,
            email: req.body.email,
            celcoordenador: req.body.celcoordenador,
            celtesoureiro: req.body.celtesoureiro,
            paroquia: req.body.paroquia
        }     
        const id = req.params.id
        const conexao = groupsModels        
        const  resultado = await conexao.updateGrupo(id, grupo)
         
          res.status(200).send({
              mesasage: resultado
        })      
    }


    async function remove(req, res) {
        const id = req.params.id
        
        const resultado = await groupsModels.remove(id)
        res.status(200).send({
            
            mensagem: `O grupo  foi excluido `
            
        })
    }

    async function busca(req, res) {
        const conexao = groupsModels
        const id = req.params.id         
        // console.log(nome)  
        const resultado = await conexao.busca(id)
      
        res.status(200).send(resultado[0][0])
    }
    
        //     } else {

//         res.status(404).send({
//        mensagem: `Grupo de id ${id} não localizado na base de dados!`  
       
//            })
//    }
    
    

module.exports = {index, filtre, create, update, remove, busca}
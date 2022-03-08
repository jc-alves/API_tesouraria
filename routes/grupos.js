const express = require('express')
const router = express.Router()
const jwt = require('../middleware/login')
const gruopController = require('../controllers/groupController')
const financialController = require('../controllers/financialController')


router.get('/grupos/:id', jwt, gruopController.busca)
router.get('/grupos', jwt,gruopController.index)
router.post('/grupos', jwt, gruopController.create) 
router.put('/grupos/:id',jwt, gruopController.update)
router.delete('/grupos/:id', jwt, gruopController.remove)
router.get('/extract', jwt, financialController.extract)
router.post('/payment', jwt, financialController.payment)
router.get('/buscap/:nome', jwt, financialController.buscap)
router.get('/extractr', jwt, financialController.extractR)
router.get('/saldo', jwt, financialController.saldo)
router.post('/retirada', jwt, financialController.retirada)










module.exports = router
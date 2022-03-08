const express = require('express')
const router = express.Router()

const jwt = require('../middleware/login')
const userController = require('../controllers/usercontroller')



router.post('/newuser', jwt, userController.newUser)
router.get('/users', jwt, userController.user )
router.post('/auth/login', userController.login)










module.exports = router
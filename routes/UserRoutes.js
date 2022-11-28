const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.getAll)
router.post('/cadastro', UserController.cadastro)

module.exports = router


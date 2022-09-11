const router = require('express').Router()

const auth = require('./util/auth')

const { createNewUser, deleteUser, login } = require('./controller/User')

router.post('/clients', createNewUser)
router.delete('/client/:id', auth, deleteUser)
router.post('/login', login)

module.exports = router
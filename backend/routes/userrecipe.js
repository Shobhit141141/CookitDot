const express = require('express')
const {
    createrecipe,
    getrecipe,
    getonrecipe,
    deleterecipe,
    updaterecipe
} = require('../controllers/userrecipecontroller.js')

const requireAuth = require('../middleware/requireAuth.js')


const router = express.Router()

router.use(requireAuth)


router.get('/', getrecipe)


router.get('/:id', getonrecipe)


router.post('/', createrecipe)


router.delete('/:id', deleterecipe)


router.patch('/:id', updaterecipe)


module.exports = router
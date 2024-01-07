const express = require('express')
const {
    createrecipe,
    getrecipe,
    getonrecipe,
    deleterecipe,
    updaterecipe
} = require('../controllers/recipecontroller')


const router = express.Router()




router.get('/', getrecipe)


router.get('/:id', getonrecipe)


router.post('/', createrecipe)


router.delete('/:id', deleterecipe)


router.patch('/:id', updaterecipe)


module.exports = router
const recipemodel = require('../models/recipes')
const { default: mongoose } = require('mongoose')

// GET ALL
const getrecipe = async (req, res) => {
    const user_id = req.user._id
    const recipes = await recipemodel.find({user_id}).lean()
    res.status(200).json(recipes)

}

// GET SINGLE
const getonrecipe = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ errpr: "NO PLATE WITH SUCH recipe" })
    }
    const recipes = await recipemodel.findById(id).lean()
    if (!recipes) {
        res.status(400).json({ error: error.message })
    }
    res.status(200).json(recipes)

}
// POST
const createrecipe = async (req, res) => {
    const { title, cuisine, image, time, recipe , ingredients } = req.body

    try {
        const recipee = await recipemodel.create({ title, cuisine, image, time, recipe , ingredients})
        res.status(200).json(recipee)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE
const deleterecipe = async (req, res) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ errpr: "NO PLATE WITH SUCH recipe" })
    }
    const recipes = await recipemodel.findOneAndDelete({ _id: id })
    if (!recipes) {
        res.status(400).json({ error: error.message })
    }

    res.status(200).json(recipes)

}

// UPDATE 
const updaterecipe = async (req, res) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ errpr: "NO PLATE WITH SUCH recipe" })
    }
    const recipes = await recipemodel.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!recipes) {
        res.status(400).json({ error: error.message })
    }

    res.status(200).json(recipes)

}


module.exports = {
    createrecipe,
    getrecipe,
    getonrecipe,
    deleterecipe,
    updaterecipe
}
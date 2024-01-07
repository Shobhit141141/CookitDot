const mongoose = require('mongoose')
// const { default: recipes } = require('../../frontend/src/pages/recipes')

const Schema = mongoose.Schema

const Recipee = new Schema({
    title: {
        type: String,
        requied: true
    },
    cuisine: {
        type: String,
        requied: true
    },
    image: {
        type: String,
        requied: true
    },
    time: {
        type: Number,
        requied: true
    },
    recipe: {
        type: String,
        requied: true
    },
    ingredients: {
        type: String,
        requied: true
    },



}, { timestamps: true })

module.exports = mongoose.model('recipe', Recipee)

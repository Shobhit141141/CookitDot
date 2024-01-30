const mongoose = require('mongoose')
// const { default: recipes } = require('../../frontend/src/pages/recipes')

const Schema = mongoose.Schema

const Recipee = new Schema({
    title: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required : true
    },



}, { timestamps: true })

module.exports = mongoose.model('recipe', Recipee)

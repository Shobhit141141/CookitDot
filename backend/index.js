require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression');
const bodyParser = require("body-parser");
var cors = require('cors');
const recipeRoutre = require('./routes/recipe.js')
const userRoutre = require('./routes/user.js')
const userrecipe = require('./routes/userrecipe.js')
const app = express()

app.use(compression())

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(express.json());
// get - gets all
//post - creates new
//get/:id - gets single
//delete - deletes single
//patch - updates single


app.use('/api/recipe', recipeRoutre)
app.use('/api/user', userRoutre)
app.use('/api/userrecipe', userrecipe)

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true , useUnifiedTopology:true})
    .then(()=>{
        app.listen(process.env.PORT, () => {
            console.log('listening on port ', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
app.get('/', (req, res) => {
    res.json({ msg: `server live at port ${process.env.PORT}`  })
})



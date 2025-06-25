const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

app
 .use(morgan('dev'))
 .use(bodyParser.json())

 sequelize.initDB()

 require('./src/routes/findAllPokemons')(app)
 require('./src/routes/findPokemonByPK')(app)
 require('./src/routes/createPokemon')(app)
 require('./src/routes/updatedPokemon')(app)
 require('./src/routes/deletePokemon')(app)


app.listen(port, () => console.log(`Notre application Node est demarrée sur : http://localhost:${port}`))

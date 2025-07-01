const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT || 3000

app
 .use(morgan('dev'))
 .use(bodyParser.json())

 sequelize.initDB()

 require('./src/routes/findAllPokemons')(app)
 require('./src/routes/findPokemonByPK')(app)
 require('./src/routes/createPokemon')(app)
 require('./src/routes/updatedPokemon')(app)
 require('./src/routes/deletePokemon')(app)
 require('./src/routes/login')(app)

 app.use(({res}) => {
    const message = 'Impossible de trouver la resource demandée ! Vous pouvez essayer une autre URL !'
    res.status(404).json(message)
})


app.listen(port, () => console.log(`Notre application Node est demarrée sur : http://localhost:${port}`))

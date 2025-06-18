const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {success, getUniqueID} = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()

const port = 3000

app
 .use(morgan('dev'))
 .use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello, Express  !'))

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
})

app.get('/api/pokemons', (req, res) => {
    const message = 'La liste des pokémons a bien été trouvés.'
    res.send(success(message, pokemons))
})

app.post('/api/pokemons', (req,res) => {
    const id = getUniqueID(pokemons);
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = {...req.body, id: id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié`
    res.json(message, pokemonUpdated)
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons.filter(pokemon => pokemon.id != id)
    const message  = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(message, pokemonDeleted)
})

app.listen(port, () => console.log(`Notre application Node est demarrée sur : http://localhost:${port}`))

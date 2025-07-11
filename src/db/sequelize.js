const {Sequelize, DataTypes} = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
let pokemons = require('../../src/db/mock-pokemon')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize('pokedex', 'root','',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    })

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDB = () => {
    return sequelize.sync({force: true})
        .then(_ => {    
            pokemons.map(pokemon => {
            Pokemon.create({
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types,
            }).then(bullbizzare => console.log(bullbizzare.toJSON()))
            })

            bcrypt.hash('pikachu', 10)
            .then(hash =>  User.create({username: 'pikachu',password: hash}))
            .then(user => console.log(user.toJSON()))

            console.log('La base de données a bien été initialisée')
        })
}

module.exports = {
    initDB, Pokemon, User
}
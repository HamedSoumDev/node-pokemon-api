const { where } = require("sequelize")
const { Pokemon } = require("../db/sequelize")
const pokemon = require("../models/pokemon")

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: {id: id}
        })
        .then(_ => {
            Pokemon.findByPk(id).then(pokemon => {
                const message = `Le pokemon ${pokemon.name} a bien été modifié.`
                res.json({message: message, data: pokemon})
            })
        })
    })
}
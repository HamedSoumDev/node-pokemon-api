const { Op } = require("sequelize")
const { Pokemon } = require("../db/sequelize")
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons',auth, (req, res) => {
        if(req.query.name) {
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if(name.length < 2) {
                const message = `Le terme de recherche doit contenir au moins 2 caractères.`
                return res.status(400).json({message})
            }
            return Pokemon.findAndCountAll({
                 where : { 
                    name : {
                        [Op.like]: `%${name}%`
                    }
                     },
                order: ['name'],
                limit: limit
                })
            .then(({count, rows}) => {
                const message = `Il y a ${count} pokémons qui correspondant au terme de recherche ${name}.`
                res.json({message, data: rows})
            })
        } else {
        Pokemon.findAll({order: ['name']})
        .then(pokemons => {
            const message = 'La liste des pokémons a bien été récupérée.'
            res.json({message, data: pokemons})
        })
        .catch(error => {
            const message = `Une erreur s'est produite lors de la récupération de la liste des pokémon. Veuillelz réessayez plus tard !`
            res.status(500).json({message, data: error})
        })
        }
    })
}
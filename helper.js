const pokemons = require("./mock-pokemon")

exports.success = (message, data) => {
    return { message, data}
}

exports.getUniqueID = (pkoemons) => {
    const pokemonsIDs = pokemons.map(pokemon => pokemon.id)
    const maxID = pokemonsIDs.reduce((a,b) => Math.max(a,b))
    const uniqueID = maxID

    return uniqueID
}
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jetton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
        return res.status(401).json({message})
    }

    const token =  authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if(error) {
            const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
            return res.status(401).json({message, data: error})
        }
        const userID = decodedToken.userID
        console.log("Req ===>", req);
        
        next()

        // if(req.body.userID && req.body.userID !== userID) {
        //     const message = `L'identifiant de utilisateur est invalide.`
        //     res.status(401).json({message})
        // }else{
        //     next()
        // }
    })
}
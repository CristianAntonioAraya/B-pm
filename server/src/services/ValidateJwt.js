const jwt = require('jsonwebtoken')

const validateJwt = ( req, res, next ) => {

    //extract the token provided in the post
    const token = req.header('x-token')

    //If the client dont give the token in header
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Token missing'
        })
    }
    try {
        const {id , displayName} = jwt.verify(token, process.env.SECRET_JWT_SEED)

        //Change the value of the request params to make accesible in eache place that we call the validatejwt funtion
        req.id = id;
        req.displayName = displayName;

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: "Invalid Token"
            })
    }
    
    next()
}

module.exports = { validateJwt }
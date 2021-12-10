const jwt = require('jsonwebtoken')

const generateJwt = ( id, displayName) => {

    return new Promise( (resolve , reject)=>{

        //payload contain the user provided credential
        const payload = { id, displayName};

        //Create and  Sign a new Token, and give the payload, secret word and the options
        jwt.sign(payload , process.env.SECRET_JWT_SEED, { 
            expiresIn: '2h'
        }, (error,token) => { 
            //if and error exist, reject the promise
            if(error){
                console.log(error)
                reject('Token can be generated')
            }
            //if is all ok, then resolve sending the sign token
            resolve( token );
        })
    })
}

module.exports = { generateJwt }
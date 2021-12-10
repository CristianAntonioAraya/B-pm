const UserModel = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const {generateJwt} = require('../services/Jwt')

const getAllUsers = async (req, res) => {
    //Find in the userModel collection all objects and send in json format
    const allUser = await UserModel.find();
    res.json(allUser)
}

const getSingleUser = async (req, res ) => {
    try {
        //get Id provided in the url of the post
        const { id } = req.params;
    
        //Search in the collection the user with the id
        const user = await UserModel.findById(id);

        // if theres not user with this id, return bad request
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'User dont exists'
            })
        }

        const {displayName, email, _id} = user;
        
        res.status(200).json({
            ok: true,
            _id,
            displayName,
            email
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Bad request'
            
        })
    }
}

const createUser = async ( req, res ) => {
    try {

        const {displayName, email, password} = req.body

        //Search email in db and verified if exist
        let user = await UserModel.findOne({email});
        if(user){ // if is true, mean a exist user have the email and return 400 
            return res.status(400).json({ // Bad request
                ok: false,
                msg:"User already exist"
            })
        }

        // if email is new one create a new user with the params provided by the client

        const newUser = new UserModel({
            displayName, email, password
        })

        //encrypt password

        const salt = bcrypt.genSaltSync(); // Can pass the number of cycles to encrypt, default 10
        newUser.password = bcrypt.hashSync(password, salt)

        //save in data base   

        await newUser.save()

        //Generate Json Web token

        const token  = await generateJwt(newUser.id, newUser.displayName)

        res.status(200).json({
            ok: true,
            status: 200,
            msg: "User Created correctly",
            displayName: newUser.displayName ,
            id: newUser.id,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ // status 500 internal server error
            ok: false,
            status: 500,
            msg: "Error was ocurred Creating user"
        })
    }
}

const deleteUser = async ( req , res) => {
    try {
        //Search in user collection by the id provided by the client and delete the document
        await UserModel.findByIdAndDelete(req.params.id)
        console.log(req.params)
        res.status(200).json({
            ok: true,
            status: 200,
            msg: "User Deleted correctly"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ // status 500 internal server error
            ok: false,
            status: 500,
            msg: "Error was ocurred"
        })
    }
}

const userLogin  = async (req, res) => {

    //Provided by the client
    const {email, password} = req.body;

    try {

    //Search email in db and verified if exist
    let user = await UserModel.findOne({email});

    // if user with this credential doesnt exist, return 400 bad request 
    if(!user){ 
        return res.status(400).json({ // Bad request
            ok: false,
            status: 400,
            msg:"The user don`t exist"
        })
    }  

    // Confirm passwords, comparing the client and the data base password
    const validPassword = bcrypt.compareSync( password, user.password)

    //If the passwords dont match
    if( !validPassword){
        return res.status(400).json({ // Bad request
            ok: false,
            status: 400,
            msg:"Email or password dont match"
        })
    }
    //Generate JWT

    const token  = await generateJwt(user.id, user.displayName);

    res.status(200).json({
        ok: true,
        status: 200,
        msg: "User login correctly",
        displayName: user.displayName ,
        id: user.id,
        token
    })
    } catch (error) {
        console.log(error)
        console.log(error)
        res.status(500).json({ // status 500 internal server error
            ok: false,
            status: 500,
            msg: "Internal Server error login false"
        })
    }
}

const revalidateToken = async(req, res) => {

    //Both values are set in validatejwt function, in services folder
    const { id , displayName} = req;

    //New jwt
    const token  = await generateJwt(id, displayName);

    res.status(200).json({
        ok: true,
        msg: 'renew token',
        displayName,
        id,
        token
    })
}


module.exports = {createUser, getAllUsers, deleteUser, userLogin, revalidateToken , getSingleUser};
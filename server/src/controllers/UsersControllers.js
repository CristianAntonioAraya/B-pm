const userCtrl = {}

const UserModel = require('../models/UsersModels')

userCtrl.getUsers = async (req, res ) => {
    const allUsers = await UserModel.find();
    res.json(allUsers)
};

userCtrl.createUser = async ( req, res ) => {
    const {userName, email} = req.body;
    const newUser = new UserModel({
        userName: userName,
        email: email
    })
    await newUser.save();
    res.json({message: 'User Create'})
}

userCtrl.getUser = async (req, res) => {
    const singleUser = await UserModel.findById(req.params.id);
    res.json(singleUser);
}

userCtrl.updateUser = async ( req, res ) => {
    const { userName, email} = req.body;
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
        userName: userName, email: email
    })
    res.json({message: 'User update'})
};

userCtrl.deleteUser = async ( req, res ) => {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({message: 'User deleted'})
};


module.exports = userCtrl;
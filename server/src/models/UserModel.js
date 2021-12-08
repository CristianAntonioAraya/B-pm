const {Schema, model} = require('mongoose');

const UserScheme = new Schema({
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
},{
    timestamps: true
})


module.exports = model('user' , UserScheme);
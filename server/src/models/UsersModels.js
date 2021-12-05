const {Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String, 
        required: true
    }
},{
    timestamps: true
})

module.exports =  model('User', userSchema);


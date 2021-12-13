const { Schema, model } =  require('mongoose');

const songShema = new Schema({
    songLink : {
        type: String,
        trim: true,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
})

//Export new Schema and name the collection that mongoose create in db
module.exports = model('song', songShema)
const SongModel = require('../models/SongModel')

const getSongs = async(req, res) => {
    try {
        //Get all document of the songs collection
        const songs = await SongModel.find();
        res.status(200).json({
            ok: true,
            msg: 'getSongs',
            songs
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Internal server error"
        })
    }
}

const createSong = async( req ,res ) => { 

    // Song url provided by the client side in the body of the request
    const { songLink } = req.body

    try {

        //Create new Song to add to the songs collection
        const newSong = new SongModel({
            songLink
        })
        await newSong.save()

        res.status(200).json({
            ok:true,
            msg: "Song add correctly"
        })
       
    } catch (error) {
        console.log(`Cant create new Song: ${error}`)

        res.status(500).json({
            ok: false,
            msg: 'internal Server error'
        })
    }

}
module.exports = { getSongs , createSong}
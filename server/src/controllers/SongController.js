const SongModel = require('../models/SongModel')

const getSongs = async(req, res) => {
    try {
        //Get all document of the songs collection
        //owner a song model propertie , that give a object id, provided by jwt
        const songs = await SongModel.find()

        res.status(200).json({
            ok: true,
            msg: 'getSongs',
            songs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Internal server error"
        })
    }
}
const getSongByOwner = async(req , res) => {

    //Get id and Name by the request
    const { id } = req.params;
    
    try {
        //Search un son collection all song with the owner
        const songs = await SongModel.find( {owner: id} )
        res.json({
            ok: true,
            owner: {
                id
            },
            songs
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Bad request'
        })
    }
    
}


const createSong = async( req ,res ) => { 

    //Create new Song to add to the songs collection
    const newSong = new SongModel(req.body)
    console.log(req.body)
    try {
        newSong.owner = req.id;
        await newSong.save()
        res.status(200).json({
            ok:true,
            msg: "Song add correctly",
            newSong
        })
       
    } catch (error) {
        console.log(`Cant create new Song: ${error}`)

        res.status(500).json({
            ok: false,
            msg: 'internal Server error'
        })
    }

}

const deleteSong = async ( req, res ) => { 
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            ok:false,
            msg: "Invalid id"
        })
    }
    try {
        await SongModel.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            msg: 'Song deleted correctly'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Internal server error"
        })
    }
}



module.exports = { getSongs , createSong, deleteSong,getSongByOwner}

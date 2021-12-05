const audioCtrl = {}

audioCtrl.getAllAudios = (req, res ) => { res.json({message: []})}
audioCtrl.createAudio = ( req, res ) => res.json({message: 'New user create'})
audioCtrl.updateAudio = ( req, res ) => res.json({message: 'User Update'})
audioCtrl.deleteAudio = ( req, res ) => res.json({message: 'User Delete'})
audioCtrl.getAudio = (req, res) => res.json({message: 'Get single user'})

module.exports = audioCtrl;
const {Router} = require('express')
const router = Router();
const {getAllAudios,createAudio,updateAudio,deleteAudio,getAudio} = require('../controllers/AudioControllers')


router.route('/')
    .get(getAllAudios)
    .post(createAudio)

router.route('/:id')
    .get(getAudio)
    .put(updateAudio)
    .delete(deleteAudio)
    


module.exports = router;
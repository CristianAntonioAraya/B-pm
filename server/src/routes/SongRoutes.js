const {Router} = require('express');
const { getSongs, createSong } = require('../controllers/SongController');
const { validateJwt } = require('../services/ValidateJwt');

const router = Router();

router.use(validateJwt);

router.route('/')
    .get(getSongs)
    .post(createSong)

module.exports = router;
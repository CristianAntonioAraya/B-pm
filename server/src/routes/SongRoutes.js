const {Router} = require('express');
const { getSongs, createSong, deleteSong, getSongByOwner } = require('../controllers/SongController');
const { validateJwt } = require('../services/ValidateJwt');

const router = Router();

router.use(validateJwt);

router.route('/')
    .get(getSongs)
    .post(createSong)

router.route('/:id')
    .get(getSongByOwner)
    .delete(deleteSong)

module.exports = router;
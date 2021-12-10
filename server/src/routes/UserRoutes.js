const {Router} = require('express');
const { createUser, getAllUsers, deleteUser, userLogin, revalidateToken, getSingleUser } = require('../controllers/UserController');
const { validateJwt } = require('../services/ValidateJwt');
const router = Router();

router.route('/')
    .get(getAllUsers)
    .post(userLogin)

router.route('/new')
    .post(createUser)

router.route('/:id')
    .delete(deleteUser)
    .get(getSingleUser)

router.route('/renew')
    .get(validateJwt , revalidateToken)

module.exports = router;
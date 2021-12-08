const {Router} = require('express');
const { createUser, getAllUsers, deleteUser, userLogin } = require('../controllers/UserController');
const router = Router();

router.route('/')
    .get(getAllUsers)
    .post(userLogin)

router.route('/new')
    .post(createUser)

router.route('/:id')
    .delete(deleteUser)
//     .get(getUser)
//     .put(updateUser)
    
module.exports = router;
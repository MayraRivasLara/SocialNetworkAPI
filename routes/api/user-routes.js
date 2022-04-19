const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser

} = require('../../controller/user-controller');

router.get('/users', (req, res) => {

})

const router = require('express').Router();

// imports all functions for user routes
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController')

// routes for getting all users and creating a single user
router.route('/')
.get(getUsers)
.post(createUser);

// routes for getting, updating, or deleting a single user
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// routes for creating and removing a friend from a specific friendslist
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;

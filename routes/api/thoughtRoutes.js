const router = require('express').Router();
const { get } = require('mongoose');
const {
    getThoughts,
    getSingleThought,
    createThought
} = require('../../controllers/thoughtController');

router.route('/')
.get(getThoughts)
.post(createThought);

router.route('/:thoughtId')
.get(getSingleThought);

module.exports = router;

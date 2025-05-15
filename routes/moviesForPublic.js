const express = require('express');
const router = express.Router();
const movieController = require('./../controller/MovieController');

router.get('/movies', movieController.getAllMovies);

module.exports = router;
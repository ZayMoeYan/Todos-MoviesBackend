const express = require('express');
const router = express.Router();

const movieController = require('./../controller/MovieController');

router.post('/', movieController.saveMovie);
router.get('/', movieController.getAllMovies);
router.get('/title', movieController.getMovieByTitle);
router.get('/:id', movieController.getMovieById);
router.delete('/:id', movieController.deleteMovieById);
router.patch('/:id', movieController.updateFields)
router.get('/title/:title', movieController.findMovieByTitle)
router.get('/year/:year', movieController.findMovieByYear)
router.get('/titleYear/query', movieController.findMovieByTitleAndYear)

module.exports = router;
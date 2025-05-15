const express = require('express');
const router = express.Router();
const reviewController = require('./../controller/ReviewController')

router.get('/', reviewController.getAllReviews);
router.post('/', reviewController.saveReview);
router.get('/movies/:movieId', reviewController.getReviewByMovieId);
router.put('/movies/:movieId', reviewController.updateReviewByMovieId);
router.delete('/:id', reviewController.deleteReview)

module.exports = router
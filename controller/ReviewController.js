const reviewService = require('./../service/ReviewService');
const mongoose = require('mongoose');

async function getAllReviews(req, res, next) {
    try {
        let reviews = await reviewService.getAllReviews();
        res.json({
            message : 'Success',
            data : reviews
        })
    }catch (err) {
        if(err instanceof mongoose.Error.ValidationError) {
            res.status(400).json({
                message : 'Fail',
                error : err
            })
        }else {
            res.status(404).json({
                message : 'Fail',
                error : 'No Reviews'
            })
        }
    }
}

async function saveReview(req, res, next) {

    try {
        let review = await reviewService.saveReview(req.body);
        res.status(201).json({
            message : 'Success',
            data : review
        })
    }catch (err) {
        if(err instanceof mongoose.Error.ValidationError) {
            res.status(400).json({
                message : 'Fail',
                error : err
            })
        }else {
            res.status(500).json({
                message : 'Fail',
                error : err.toString()
            })
        }
    }
}

async function getReviewByMovieId(req, res, next) {
    let movieId = req.params.movieId
    try {
        let reviews = await reviewService.getReviewByMovieId(movieId);
        res.json({
            message : 'Success',
            data : reviews
        })
    }catch (err) {
        res.status(404).json({
            message : 'Fail',
            error : err.toString()
        })
    }
}

async function updateReviewByMovieId(req, res, next) {
    let movieId = req.params.movieId;
    let updates = req.body;

    try {
        let updatedReview = await reviewService.updateReviewByMovieId(updates, movieId);
        res.json({
            message : 'Success',
            data : updatedReview
        })
    }catch(err) {
        res.status(404).json({
            message : 'Fail',
            error : err.toString()
        })
    }
}

async function deleteReview(req, res, next) {
    let reviewId = req.params.id;
    try {
        let deletedReview = await reviewService.deleteReview(reviewId);
        res.json({
            message : 'Success',
            deletedReview : deletedReview
        })
    }catch (err) {
        res.status(404).json({
            message : 'Fail',
            error : err.toString()
        })
    }
}

module.exports = {
    getAllReviews,
    saveReview,
    getReviewByMovieId,
    updateReviewByMovieId,
    deleteReview
}
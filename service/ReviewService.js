const Review = require('./../models/Review');
const Movie = require('./../models/Movie');
const mongoose = require("mongoose");

const getAllReviews = async () => {
    let reviews = await Review.find();
    console.log(reviews)
    if(reviews.length !== 0) {
        return reviews;
    }else {
        throw new Error();
    }
}

const saveReview = async (review) => {
    if(review.movie === null) {
        throw new Error('Movie Id is null');
    }else {
        let newReview = new Review({
            movie : new mongoose.Types.ObjectId(review.movie),
            rating : review.rating,
            review : review.review
        });
        await newReview.save();
        return newReview;//.populate('movie');
    }
}

async function getReviewByMovieId(movieId) {
    let movie = await Movie.findById(movieId);
    if(!movie) {
        throw new Error('Movie Id is not found.');
    }else {
        return Review.find({ movie : movieId});//.populate('movie');
    }
}

async function updateReviewByMovieId(updates, movieId) {
    let movie = await Movie.findById(movieId);
    if (!movie) {
        throw new Error('Movie Id is not found.');
    } else {
       return Review.findByIdAndUpdate(updates._id, updates, { new: true })
    }
}

async function deleteReview(reviewId) {
    let review = await Review.findById(reviewId);
    if(!review) {
        throw new Error('Review is not found.');
    }else {
        return Review.findByIdAndDelete(reviewId);
    }
}

module.exports = {
    getAllReviews,
    saveReview,
    getReviewByMovieId,
    updateReviewByMovieId,
    deleteReview
}
const movieService = require('./../service/MovieService');
const mongoose = require('mongoose');
const tty = require("node:tty");

async function saveMovie(req, res, next) {
    try {

        let movie = await movieService.saveMovie(req.body);
        res.status(201).json({
            message : 'Success',
            data : movie
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
                error : err
            })
        }
    }
}

async function getAllMovies(req, res, next) {
    try {
        let movies = await movieService.getAllMovies();
        console.log('Login User ', req.user);
        res.json({
            message : 'Success',
            data : movies
        })
    }catch (err) {
        res.status(500).json({
            message : 'Fail',
            error : err.toString()
        })
    }
}

async function getMovieById(req, res, next) {
    let id = req.params.id;
    let movie = await movieService.getMovieById(id);
    if(movie) {
        res.json({
            message : 'Success',
            data : movie
        })
    }else {
        res.status(404).json({
            message : 'Fail',
            error : 'Movie ' + id + ' is not found.'
        })
    }
}

async function deleteMovieById(req, res, next) {
    let id = req.params.id;
    try {
        let movie = await movieService.deleteMovieById(id);
        res.json({
            message : 'Success',
            deletedMovie : movie
        })
    }catch (err) {
        res.status(404).json({
            message : 'Fail',
            error : err
        })
    }
}

async function updateFields(req, res, next) {
    let id = req.params.id
    let updates = req.body
    try {
        let movie = await movieService.updateFields(id, updates);
        res.json({
            message : 'Successfully Updated',
            data : movie
        })
    }catch (err) {
        res.status(404).json({
            message : 'Fail',
            error : 'Movie Id ' + id + ' is not found.'
        })
    }
}

async function getMovieByTitle(req, res, next) {
    let title = req.body
    let movie = await movieService.getMovieByTitle(title);
    if(movie) {
        res.json({
            message : 'Success',
            data : movie
        })
    }else {
        res.status(404).json({
            message : 'Fail',
            error : 'Movie is not found.'
        })
    }
}

async function findMovieByTitle(req, res, next) {
    let title = req.params['title'];

    try {
        let movies = await movieService.findMovieByTitle(title);
        res.json({
            message: 'Success',
            data: movies
        })

    } catch (err) {
        res.status(404).json({
            message: 'Fail',
            error: 'Movie title ' + title + ' is not found.'
        })
    }
}

async function findMovieByYear(req, res, next) {
    let year = req.params.year
    let movies = await movieService.findMovieByYear(year)
    if(movies) {
        res.json({
            message : 'Success',
            data : movies
        })
    }else {
        res.status(404).json({
            message : 'Fail',
            error : 'Movie is not found.'
        })
    }
}

async function findMovieByTitleAndYear(req, res, next) {

     let query = req.query

    try {
        let movies = await movieService.findMovieByTitleAndYear(query);
        res.json({
            message : 'Success',
            data : movies
        })
    }catch (err) {
        res.status(404).json({
            message : 'Fail',
            error : 'Movie is not found.'
        })
    }
}

module.exports = {
    saveMovie,
    getAllMovies,
    getMovieById,
    getMovieByTitle,
    deleteMovieById,
    updateFields,
    findMovieByTitle,
    findMovieByYear,
    findMovieByTitleAndYear
}
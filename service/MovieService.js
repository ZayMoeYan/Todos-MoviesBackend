const Movie = require('./../models/Movie');

async function saveMovie(movie) {
    let newMovie = new Movie(movie);
    return newMovie.save();
}

async function getAllMovies() {
    return Movie.find();
}

async function getMovieByTitle(title) {
    return Movie.findOne(title).exec();
}

async function findMovieByTitle(title) {
    console.log(title)
    let movies = await Movie.find(
        {
            title: { $regex: title }
        }
    );

    if (movies.length !== 0) {
        return movies;
    } else {
        throw new Error();
    }
}

async function findMovieByYear(year) {
    return Movie.find({
       year : year
    });
}

async function findMovieByTitleAndYear(query) {
    let { title , year } = query;
     let movies = await Movie.find(
         {
             title: title,
             year: year
         }
     );

     if(movies.length !== 0) {
         return movies
     }else {
         throw new Error();
     }
}


async function getMovieById(id) {
    return Movie.findById(id);
}

async function deleteMovieById(id) {
    let movie = await Movie.findById(id);
    if(movie) {
        return Movie.findByIdAndDelete(id, {new : true, runValidators : true});
    }else {
        throw new Error();
    }
}

async function updateFields(id, updates) {
    let movie = await Movie.findById(id);
    if(movie) {
        return Movie.findByIdAndUpdate(id, updates, { new : true, runValidators : true})
    //  return Movie.updateOne(
        //  { _id : id},
        // { $set : { updates } }
        //  )
    }else {
        throw new Error();
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


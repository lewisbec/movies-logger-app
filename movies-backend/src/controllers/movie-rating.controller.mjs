import mongoose from 'mongoose'
import MovieWatched from '../models/movie-rating.model.mjs'
import movieSearch from '../utils/movie-search.mjs'

// create function for new movie rating
const createMovieRating = async (title, rating, poster, notes, userid) => {
    const newMovie = new MovieWatched({
        title: title,
        rating: rating,
        poster: poster,
        notes: notes,
        user_id: userid,
    })

    return newMovie.save()
}

const getWatchedMovies = async (userid) => {
    const allMovies = MovieWatched.find({user_id: userid})
    return allMovies
}

export { createMovieRating, getWatchedMovies };
import mongoose from "mongoose";
import MovieWatched from "../models/movie-rating.model.mjs";
import movieSearch from "../utils/movie-search.mjs";
import fetch from "node-fetch";

// create function for new movie rating
const createMovieRating = async (title, rating, poster, notes, userid, date) => {
  const newMovie = new MovieWatched({
    title: title,
    rating: rating,
    poster: poster,
    notes: notes,
    user_id: userid,
    date_watched: date
  });

  return newMovie.save();
};

const getWatchedMovies = async (userid) => {
  const allMovies = MovieWatched.find({ user_id: userid }).sort({ date_watched: 1 });
  return allMovies;
};

const deleteByID = async (movieid) => {
  const res = await MovieWatched.deleteOne({ _id: movieid });

  return res.deletedCount;
};

function findMovie(movie_title) {
  const search_call = `https://api.themoviedb.org/3/search/movie?api_key=a7ef20454443b2f70d29336687a3d60a&language=en-US&query=${movie_title}&page=1&include_adult=false`;

  fetch(search_call)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export { createMovieRating, getWatchedMovies, deleteByID, findMovie };

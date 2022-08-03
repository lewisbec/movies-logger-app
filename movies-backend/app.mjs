import mongoose from "mongoose";
import * as MovieRatingController from "./src/controllers/movie-rating.controller.mjs";
import express from "express";
import fetch from "node-fetch";

// set up server
const PORT = 1492;
const app = express();

app.use(express.json());

app.get("/exercises", (req, res) => {
  console.log("test endpoint");
  res.json([{ message: "hello there" }, { message2: "message" }]);
});

// set up mongoDB connections
// Prepare to the database movies_db in the MongoDB server running locally on port 27017
mongoose.connect("mongodb://localhost:27017/movies_db", {
  useNewUrlParser: true,
});

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// add a newly watchedMovie
app.post("/movies", (req, res) => {
  // check for input params
  MovieRatingController.createMovieRating(
    req.body.title,
    req.body.rating,
    req.body.poster,
    req.body.notes,
    req.body.user_id,
    req.body.date
  )
    .then((movie) => {
      res.send(movie);
    })
    .catch((error) => {
      console.error(error);
    });
});

// retrieve all watchedMovies
app.get("/movies/:user_id", (req, res) => {
  MovieRatingController.getWatchedMovies(req.params.user_id)
    .then((moviesWatched) => {
      res.json(moviesWatched);
    })
    .catch((error) => {
      console.error(error);
    });
});

// delete movie by ID
app.delete("/movies/:id", (req, res) => {
  MovieRatingController.deleteByID(req.params.id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).json({ deletedCount });
      } else {
        res.status(404).json({ Error: "Resource not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send({ error: "Request failed" });
    });
});

// search for a movie
app.get("/search/:movietitle", (req, res) => {
  const search_call = `https://api.themoviedb.org/3/search/movie?api_key=a7ef20454443b2f70d29336687a3d60a&language=en-US&query=${req.params.movietitle}&page=1&include_adult=false`;

  fetch(search_call)
    .then((response) => response.json())
    .then((data) => {
      res.send(data["results"]);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT} ...`);
});

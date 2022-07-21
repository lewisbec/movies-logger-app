import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function AppWelcome() {
  return (
    <div>
      <h1>Movie Logger Web App</h1>
    </div>
  );
}

function MovieRow({ movie, onDelete }) {
  return (
    <>
      <tr>
        <td>{movie.title}</td>
        <td>{movie.rating}</td>
        <td>{movie.notes}</td>
        <td>
          <button onClick={() => onDelete(movie._id)}>Delete</button>
        </td>
      </tr>
    </>
  );
}

function MoviesTable() {
  const [movies, setMovies] = useState([]);
  const rows = [];
  // fetch the movies from the backend endpoint
  const loadMovies = async () => {
    const response = await fetch("/movies/1234");
    const data = await response.json();
    setMovies(data);
  };

  // delete movies
  const onDelete = async (_id) => {
    const res = await fetch(`/movies/${_id}`, { method: "DELETE" });
    const movieDeleted = movies.filter((m) => m._id === _id);
    const refreshedMovies = movies.filter((m) => m._id !== _id);
    setMovies(refreshedMovies);
    alert(`Deleted Movie: ${movieDeleted[0].title}`);
  };

  // call useEffect hook when the component is generated
  useEffect(() => {
    loadMovies();
  }, []);

  // map the movies to a td by their name
  movies.forEach((movie) => {
    rows.push(<MovieRow key={movie._id} movie={movie} onDelete={onDelete} />);
  });

  return (
    <>
      <h3>Your Movies Watched</h3>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Rating</th>
            <th>Notes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}

function CreateMovieForm() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");

  const createMovie = async () => {
    const newMovie = {
      title,
      rating,
      notes,
      user_id: "1234",
      poster: "placeholder",
    };
    const response = await fetch("/movies", {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response !== null) {
      alert("Movie added");
    } else {
      alert("issue adding exercise");
    }
  };

  // input form for movie addition
  return (
    <div>
      <form>
        <legend>Create a new movie</legend>
        <input
          placeholder="Movie Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <select onChange={(e) => setRating(e.target.value)} value={rating}>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
        <textarea
          placeholder="Notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        ></textarea>
        <button onClick={createMovie}>Add Movie Watched</button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <AppWelcome />
      <MoviesTable />
      <CreateMovieForm />
    </div>
  );
}

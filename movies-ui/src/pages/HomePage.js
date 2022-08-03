import React from "react";
import { useState } from "react";
import { useEffect } from "react";


function MovieRow({ movie, onDelete }) {
  const moviePosterURL = `https://image.tmdb.org/t/p/original/${movie.poster}`;
  return (
    <>
      <tr>
        <td>
          <img
            src={moviePosterURL}
            width={200}
            height={300}
            alt="not available"
          />
        </td>
        <td>{movie.title}</td>
        <td>{movie.rating}</td>
        <td>{movie.notes}</td>
        <td>{movie.date_watched}</td>
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
            <th>Poster</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Notes</th>
            <th>Date Watched</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}


export function HomePage() {
  return (
    <div>
      <MoviesTable />
      <p>&nbsp;</p>
    </div>
  );
}

export default HomePage;

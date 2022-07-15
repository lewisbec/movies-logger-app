import React from "react";
import { useState, useEffect } from "react";

function AppWelcome() {
  return (
    <div>
      <h1>Movie Logger Web App</h1>
    </div>
  );
}

function MovieRow({ movie }) {
  return (
    <tr>
      <td>{movie.title}</td>
      <td>{movie.rating}</td>
    </tr>
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
    console.log(data);
  };

  // call useEffect hook when the component is generated
  useEffect(() => {
    loadMovies();
  }, []);

  // map the movies to a td by their name
  movies.forEach((movie) => {
    rows.push(<MovieRow key={movie._id} movie={movie} />);
  });

  return (
    <>
      <h2>Your Movies Watched</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <th></th>
    </>
  );
}

export default function App() {
  return (
    <div>
      <AppWelcome />
      <MoviesTable />
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";

function AppWelcome() {
  return (
    <div>
      <h1>Movie Logging Web App</h1>
    </div>
  );
}

function MoviesTable() {
  const [movies, setMovies] = useState([]);

  // fetch the movies from the backend endpoint
  const loadMovies = async () => {
    const response = await fetch("/movies/1234");
    const data = await response.json();
    setMovies(data)
    console.log(movies)
  };

  // call useEffect hook when the component is generated
  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <>
      <h2>Movies</h2>
      
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

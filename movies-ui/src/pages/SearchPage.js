import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom"

function SearchBar({ searchResults, setSearchResults }) {
  const [searchText, setSearchText] = useState("");



  const searchMovie = async () => {
    console.log("searching for movie");
    const response = await fetch(`/search/${searchText}`);
    const data = await response.json();
    setSearchResults(data);
  };

  return (
    <>
      <p>
        Search for a movie:
        <input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={searchMovie}>Search</button>
      </p>
    </>
  );
}

function MovieRow({ movie, setMovieToAdd }) {
  const history = useHistory()
  const moviePosterURL = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

  const onAddMovie = (movie) => {
    setMovieToAdd(movie)
    console.log(movie)
    history.push('/add-movie')
  }

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
        <td width={250}> {movie.title}</td>
        <td width={500}>{movie.overview}</td>
        <td>{movie.vote_average}</td>
        <td>
          <button onClick={() => onAddMovie(movie)}>Add to Watchlist</button>
        </td>
      </tr>
    </>
  );
}

function SearchMovieTable({ searchResults, setMovieToAdd }) {
  const rows = [];
  let i = 0;
  searchResults.forEach((movie) => {
    rows.push(<MovieRow key={i} movie={movie} setMovieToAdd={setMovieToAdd} />);
    i++;
  });
  if (rows.length !== 0) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Description</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <p>&nbsp;</p>
        <p>Movie images from The Movie DB</p>
      </>
    );
  } else {
    return <div></div>;
  }
}

export const SearchPage = ({ setMovieToAdd }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <SearchBar
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />
      <SearchMovieTable searchResults={searchResults} setMovieToAdd={setMovieToAdd} />
    </div>
  );
};

export default SearchPage;

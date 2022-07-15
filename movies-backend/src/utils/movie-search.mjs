import fetch from "node-fetch";

function movieSearch(movie_title) {
  const search_call =
    `https://api.themoviedb.org/3/search/movie?api_key=a7ef20454443b2f70d29336687a3d60a&language=en-US&query=${movie_title}&page=1&include_adult=false`;

  fetch(search_call)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export default movieSearch
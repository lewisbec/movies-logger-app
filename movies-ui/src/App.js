import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import Navigation from "./components/Navigation";
import SearchPage from "./pages/SearchPage";
import AddMoviePage from "./pages/AddMoviePage.js"

function App() {
  // set the movie to be adding
  const [movieToAdd, setMovieToAdd] = useState({});

  return (
    <div className="App">
      <header>
        <h1>Movie Logger Web App</h1>
      </header>
      <main>
        <Router>
          <Navigation />
          <div className="App-header">

            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchPage setMovieToAdd={setMovieToAdd} />
            </Route>
            <Route path="/add-movie">
              <AddMoviePage movieToAdd={movieToAdd}/>
            </Route>

          </div>
        </Router>
      </main>
    </div>
  );
}

export default App;
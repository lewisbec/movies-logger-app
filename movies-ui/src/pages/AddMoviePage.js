import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom"

export function CreateMovieForm({ movieToAdd }) {
    const [rating, setRating] = useState("");
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState("");
    const history = useHistory()
    const moviePosterURL = `https://image.tmdb.org/t/p/original/${movieToAdd.poster_path}`;


    const createMovie = async () => {
        const newMovie = {
            title: movieToAdd.title,
            rating,
            notes,
            user_id: "1234",
            poster: movieToAdd.poster_path,
            date
        }
        const response = await fetch("/movies", {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response !== null) {
            alert(`Added ${movieToAdd.title} to movies watched`);
        } else {
            alert("issue adding exercise");
        }
        history.push("/")
    };

    // input form for movie addition
    return (
        <div>
            <h2>Adding <strong><em>{movieToAdd.title}</em></strong> to your watchlist</h2>

            <td>
                <img
                    src={moviePosterURL}
                    width={200}
                    height={300}
                    alt="not available"
                />
            </td>
            <form>
                <label>Rating :</label>
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
                <label>   Notes: </label>
                <textarea
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                ></textarea>
                <label>Date Watched: </label>
                <input type="date" onChange={(e) => {
                    setDate(e.target.value)
                }} value={date}></input>
                <button type="button" onClick={createMovie}>Add Movie Watched</button>
            </form>
        </div>
    );
}

export default CreateMovieForm;
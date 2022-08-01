import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom"

export function CreateMovieForm({ movieToAdd }) {
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const [notes, setNotes] = useState("");
    const history = useHistory()

    const createMovie = async () => {
        const newMovie = {
            title,
            rating,
            notes,
            user_id: "1234",
            poster: movieToAdd.poster_path
        }
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
        history.push("/")
    };

    // input form for movie addition
    return (
        <div>
            
            <form>
                <legend>Adding <strong>{movieToAdd.title}</strong> to your watchlist</legend>
                <input
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
                    placeholder="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                ></textarea>
                <button type="button" onClick={createMovie}>Add Movie Watched</button>
            </form>
        </div>
    );
}

export default CreateMovieForm;
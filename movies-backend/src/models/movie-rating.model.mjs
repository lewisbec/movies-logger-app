import mongoose from "mongoose";

const MovieWatchedSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    date_watched: {
        type: Date,
        default: () => Date.now()
    },
    poster: String,
    notes: {
        optional: true,
        type: String
    },
    user_id: String
})

export default mongoose.model("MovieWatched", MovieWatchedSchema)
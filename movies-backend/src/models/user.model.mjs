import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    password: String,
    email: String,
})

export default mongoose.model("MovieWatched", MovieWatchedSchema)
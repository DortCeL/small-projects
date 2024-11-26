//! steps
// 1. import mongoose
// 2. create schema
// 3. export model

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: String,
	age: Number,
	salary: Number,
});

const User = mongoose.model("user", userSchema);

export default User;

import User from "../models/userModel.js";

export const createUser = async (req, res) => {
	const { name, age, salary } = req.body;
	const newUser = new User({ name, age, salary });
	await newUser.save();
	res.json({ msg: "New user Added!", user: newUser });
	// console.log(`New user added!`);
};

export const getAllUsers = async (req, res) => {
	const users = await User.find({});
	res.json(users);
};

export const deleteUser = async (req, res) => {
	const id = req.params.id;
	const deletedUser = await User.findByIdAndDelete(id);

	// if (!deletedUser) {console.log(`user not found`)}

	res.json({ msg: "user deleted successfully", user: deletedUser });
};

// get all users is not working...

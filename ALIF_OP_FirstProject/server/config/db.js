import mongoose from "mongoose";

const mongoUrl = `mongodb+srv://DortCeL:eitaipassword@learning-backend.eemuwzl.mongodb.net/SocialMedia?retryWrites=true&w=majority&appName=Learning-Backend`;

const connectDB = async () => {
	try {
		await mongoose.connect(mongoUrl);
		console.log(`connected to the Database!`);
	} catch (error) {
		console.log(`Error connecting to the DB! ${error}`);
	}
};

export default connectDB;

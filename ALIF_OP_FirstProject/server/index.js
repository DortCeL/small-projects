import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = 8080;

//$  MIDDLEWARE
app.use(cors());
app.use(express.json());

//$ ROUTES
app.use("/api", userRoutes);

//$  SERVER START
const startServer = async () => {
	await connectDB();
	app.listen(PORT, () => {
		console.log(`listening on port ${PORT}`);
	});
};

startServer();

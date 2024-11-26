import express from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

// api/users/ ...

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

export default router;

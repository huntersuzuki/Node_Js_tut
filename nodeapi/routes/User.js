import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByDynamicId,
  getUserById,
  registerUser,
  updateUser,
} from "../controllers/User.js";

const router = express.Router();

router.get("/users/all", getAllUsers);

router.post("/users/new", registerUser);

router.get("/userid", getUserById);

//path variable or dynamic path
// router.get("/userid/:userID", getUserByDynamicId);
// router.put("/userid/:userID", updateUser);
// router.delete("/userid/:userID", deleteUser);

//alternative method for the above coder

router
  .route("/userid/:userID")
  .get(getUserByDynamicId)
  .put(updateUser)
  .delete(deleteUser);

export default router;

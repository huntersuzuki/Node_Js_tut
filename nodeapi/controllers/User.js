import { user } from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const users = await user.find({});
  res.json({
    success: true,
    users: users,
  });
};
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  await user.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    success: true,
    message: "registered successfully",
  });
};

export const getUserById = async (req, res) => {
  const { id } = req.query;
  const User = await user.findById(id);
  res.json({
    success: true,
    User,
  });
};

export const getUserByDynamicId = async (req, res) => {
  const { userID } = req.params;
  const User = await user.findById(userID);
  res.json({
    success: true,
    User,
  });
};

export const updateUser = async (req, res) => {
  const { userID } = req.params;
  const User = await user.findById(userID);
  res.json({
    success: "Updated",
    User,
  });
};
export const deleteUser = async (req, res) => {
  const { userID } = req.params;
  const User = await user.findById(userID);
  res.json({
    success: "Deleted",
    User,
  });
};

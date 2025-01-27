const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    const checkExistingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists. Please try with different username or email.",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newlyCreatedUser = new User({
        userName,
        email,
        password: hashedPassword,
        role: role || "user",
      });
      await newlyCreatedUser.save();
      if (newlyCreatedUser) {
        res.status(201).json({
          success: true,
          message: "User created successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Unable to resister the user",
        });
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: true,
      message: "Something went wrong.",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid username or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const accessToken = jwt.sign(
      {
        userID: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: true,
      message: "Something went wrong.",
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userID;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordMath = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMath) {
      res.status(400).json({
        success: false,
        message: "Old password entered not correct.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "password changes successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: true,
      message: "Something went wrong.",
    });
  }
};

module.exports = { loginUser, registerUser, changePassword };

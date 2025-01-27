Here’s a **detailed explanation** of the  code, broken down into its components for clarity:

---

### **1. Importing Dependencies**
```javascript
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
```
- **`User`**:
  - A reference to the Mongoose model for interacting with the **users collection** in the database.
  - Used for CRUD operations (e.g., create, read, update, delete) on user data.

- **`bcryptjs`**:
  - A library for hashing and comparing passwords securely.
  - Ensures passwords are not stored in plaintext, enhancing security.

- **`jsonwebtoken` (JWT)**:
  - A library used to create and verify JSON Web Tokens for secure authentication and authorization.
  - Encodes user information (e.g., ID, email) into a token, which can be used to authenticate API requests.

---

### **2. Registering a New User**
#### **Code Block: `registerUser` Function**
```javascript
const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    // Check if the user already exists
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
      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user object
      const newlyCreatedUser = new User({
        userName,
        email,
        password: hashedPassword,
        role: role || "user", // Default role is "user" if none is provided
      });

      // Save the user to the database
      await newlyCreatedUser.save();

      if (newlyCreatedUser) {
        res.status(201).json({
          success: true,
          message: "User created successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Unable to register the user",
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
```

#### **Detailed Steps**
1. **Receive Input**:
  - Extract `userName`, `email`, `password`, and `role` from the `req.body` (HTTP request body).

2. **Check Existing User**:
  - Query the database to see if a user with the same `userName` or `email` already exists.
  - If found, return an error response with status `400`.

3. **Hash Password**:
  - Use `bcrypt.genSalt(10)` to create a salt.
  - Hash the plain text `password` with the salt using `bcrypt.hash`.

4. **Create and Save User**:
  - Create a new `User` document with the provided data and hashed password.
  - Save it to the database using `newlyCreatedUser.save()`.

5. **Return Response**:
  - Send a success response (`201 Created`) if the user is saved successfully.
  - Handle any failures or exceptions gracefully.

---

### **3. Logging In a User**
#### **Code Block: `loginUser` Function**
```javascript
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // Generate a JWT
    const accessToken = jwt.sign(
      {
        userID: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m", // Token expires in 15 minutes
      },
    );

    // Respond with the token
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
```

#### **Detailed Steps**
1. **Receive Input**:
  - Extract `email` and `password` from the `req.body`.

2. **Check User Existence**:
  - Query the database for a user with the provided `email`.
  - If not found, return a `404 Not Found` response.

3. **Verify Password**:
  - Compare the provided `password` with the hashed password in the database using `bcrypt.compare`.

4. **Generate a JWT**:
  - Create a JSON Web Token using `jwt.sign`.
  - Include user-specific data (`userID`, `email`, `role`) in the token payload.
  - Sign it with the `JWT_SECRET_KEY` and set an expiration time (`15 minutes`).

5. **Return Response**:
  - If successful, respond with the JWT in a `200 OK` response.
  - The token can be used for authenticating subsequent requests.

---

### **4. Changing Password**
#### **Code Block: `changePassword` Function**
```javascript
const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userID;
    const { oldPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify the old password
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Old password entered not correct.",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: true,
      message: "Something went wrong.",
    });
  }
};
```

#### **Detailed Steps**
1. **Retrieve User**:
  - Extract the `userID` from `req.userInfo` (populated by middleware).
  - Find the user in the database using `User.findById`.

2. **Verify Old Password**:
  - Compare the provided `oldPassword` with the user’s hashed password in the database using `bcrypt.compare`.

3. **Hash New Password**:
  - Generate a salt and hash the `newPassword` using `bcrypt`.

4. **Save Changes**:
  - Update the user’s password and save it to the database.

5. **Return Response**:
  - Respond with a success message (`200 OK`).

---

### **Purpose of the Code**
1. **User Registration**:
  - Allows users to sign up with unique usernames or emails.
  - Hashes passwords for security.

2. **User Login**:
  - Authenticates users with email and password.
  - Issues a JWT for secure access to protected routes.

3. **Password Change**:
  - Enables authenticated users to update their password securely.

---

### **Key Features**
- **Security**:
  - Password hashing using `bcrypt`.
  - JWT-based authentication for secure, stateless sessions.

- **Validation**:
  - Ensures unique emails/usernames during registration.
  - Verifies credentials during login and password change.

- **Error Handling**:
  - Comprehensive error messages for debugging and user feedback.

This code is a reusable reference for any application requiring user authentication and authorization.
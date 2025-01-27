This code defines a middleware function named `authMiddleWare` that ensures secure access to certain routes in a Node.js application by verifying JSON Web Tokens (JWTs). Middleware functions are executed before the main route handlers and are often used for tasks like authentication and logging.

---

### **1. Imports**
```javascript
const jwt = require("jsonwebtoken");
```

- **`jsonwebtoken`**: A library used to create and verify JSON Web Tokens (JWTs), which are compact, URL-safe tokens used to securely transmit information between parties.

---

### **2. `authMiddleWare` Function**

This middleware checks if the request has a valid JWT. If the token is missing or invalid, access to the route is denied. Here's a breakdown of the function:

#### **Step 1: Extract the Authorization Header**
```javascript
const authHeader = req.headers["authorization"];
console.log(authHeader);
```

- **`req.headers`**: Contains metadata sent with the HTTP request. The `authorization` header typically carries the token.
- **Purpose**: Retrieves the `authorization` header from the incoming request.
- **Logging**: Logs the `authHeader` for debugging purposes.

#### **Step 2: Extract the Token**
```javascript
const token = authHeader && authHeader.split(" ")[1];
```

- **Structure of `authHeader`**: The token is typically provided in the format `Bearer <token>`. For example:
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Splitting**: The `split(" ")` method separates the `Bearer` keyword and the token. `authHeader.split(" ")[1]` retrieves the actual token.
- **Condition**: Uses `authHeader &&` to ensure the header exists before attempting to split it.

#### **Step 3: Check for Missing Token**
```javascript
if (!token) {
  res.status(401).json({
    success: false,
    message: "Access Denied",
  });
}
```

- **Condition**: If `token` is `null` or `undefined`, the client hasn't provided a token.
- **Response**: Sends a `401 Unauthorized` status with a message indicating that access is denied.

#### **Step 4: Verify the Token**
```javascript
try {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decodedToken);
  req.userInfo = decodedToken;
  next();
} catch (e) {
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
}
```

- **Purpose**: Verifies the token using the `jwt.verify` method.
- **Arguments**:
    - `token`: The extracted JWT.
    - `process.env.JWT_SECRET_KEY`: A secret key used to sign and verify tokens. This key is stored securely in environment variables.
- **Decoded Token**: If the token is valid, the payload (data embedded in the token) is extracted and assigned to `decodedToken`.
- **Logging**: Logs the decoded token for debugging purposes.

##### **Handling Valid Tokens**
- **Attach User Info**: The middleware attaches the decoded token (containing user data like ID, email, role, etc.) to `req.userInfo`. This makes it accessible in subsequent middleware or route handlers.
- **Call `next`**: Invokes the `next` function to pass control to the next middleware or route handler.

##### **Handling Invalid Tokens**
- If an error occurs during token verification (e.g., the token is expired or tampered with):
  ```javascript
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
  ```
- **Response**: Sends a `500 Internal Server Error` status with a generic error message.

---

### **3. Export the Middleware**
```javascript
module.exports = authMiddleWare;
```

- **Purpose**: Makes the `authMiddleWare` function available for use in other parts of the application, such as route handlers.

---

### **Flow Summary**
1. **Check Authorization Header**: Extracts the `authorization` header and token.
2. **Verify Token**: Uses the secret key to ensure the token is valid and hasn't been tampered with.
3. **Attach User Data**: Adds the decoded token to `req.userInfo` for later use.
4. **Error Handling**:
    - If no token is provided: Responds with `401 Access Denied`.
    - If token verification fails: Responds with `500 Something Went Wrong`.

---

### **Usage Example**

This middleware can be used in a route as follows:

```javascript
const express = require("express");
const authMiddleWare = require("./path-to-authMiddleware");
const router = express.Router();

router.get("/protected-route", authMiddleWare, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You have access to this protected route!",
    userInfo: req.userInfo,
  });
});

module.exports = router;
```

- **Protected Route**: `authMiddleWare` ensures that only requests with valid tokens can access `/protected-route`.
- **User Info**: The `req.userInfo` contains user data (like `userID` and `role`), which can be used for role-based access control or other purposes.

---

### **Security Features**
1. **JWT Verification**: Ensures that the client provides a valid and untampered token.
2. **Environment Variables**: Keeps the secret key (`JWT_SECRET_KEY`) secure by not hardcoding it.
3. **Access Control**: Protects sensitive routes by requiring valid authentication.


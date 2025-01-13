Here’s a detailed explanation of the code:

---

### **1. Importing the `express` module**
```javascript
const express = require("express");
```
- **Express**: A Node.js framework for building web applications and APIs.
- This imports the `express` module, enabling you to use its features.

---

### **2. Creating an Express application**
```javascript
const app = express();
```
- **`app`** is an instance of an Express application.
- This object is used to define middleware, routes, and other application logic.

---

### **3. Defining a middleware function**
```javascript
const myFirstMiddleWare = (req, res, next) => {
  console.log("The first middleware will run on every request");
  next();
};
```
- **Middleware**:
    - A function that has access to the request (`req`), response (`res`), and the `next` function in the request-response cycle.
    - It can execute code, modify the request/response objects, and decide whether to pass control to the next middleware using the `next()` function.

- **`myFirstMiddleWare`**:
    - Logs the message `"The first middleware will run on every request"` to the console.
    - Calls `next()` to pass control to the next middleware or route handler.

---

### **4. Using the middleware**
```javascript
app.use(myFirstMiddleWare);
```
- **`app.use(middleware)`**:
    - Attaches the middleware globally to all routes.
    - Ensures the middleware function is executed for every incoming request, regardless of the route.

---

### **5. Defining routes**
#### **Home Page (`/`)**
```javascript
app.get("/", (req, res) => {
  res.send("Home page");
});
```
- **`app.get(path, callback)`**:
    - Defines a route to handle GET requests to `/`.
    - Sends the response `"Home page"` when the root URL (`http://localhost:3000/`) is accessed.

#### **About Us Page (`/aboutus`)**
```javascript
app.get("/aboutus", (req, res) => {
  res.send("About us page");
});
```
- Handles GET requests to `/aboutus`.
- Sends the response `"About us page"` when `http://localhost:3000/aboutus` is accessed.

---

### **6. Starting the server**
```javascript
app.listen(3000, () => {
  console.log("Server working on port 3000");
});
```
- **`app.listen(port, callback)`**:
    - Starts the server and listens for incoming requests on port `3000`.
    - Logs the message `"Server working on port 3000"` once the server is successfully running.

---

### **How the application works**:
1. **Middleware**:
    - The middleware function (`myFirstMiddleWare`) runs for every request, logging a message to the console and passing control to the next handler.

2. **Routing**:
    - If the request URL is `/`, the server responds with `"Home page"`.
    - If the request URL is `/aboutus`, the server responds with `"About us page"`.

3. **Request Flow**:
    - Middleware is executed first.
    - Then the appropriate route handler is executed.

---

### **Console Output**:
When accessing the routes:
1. For `http://localhost:3000/`:
    - Console:
      ```
      The first middleware will run on every request
      ```
    - Browser:
      ```
      Home page
      ```

2. For `http://localhost:3000/aboutus`:
    - Console:
      ```
      The first middleware will run on every request
      ```
    - Browser:
      ```
      About us page
      ```

---

### **Summary**:
This code demonstrates how middleware works in Express:
- The middleware runs **before any route handler**.
- Middleware is used for tasks like logging, authentication, and modifying request/response objects.
- The `next()` function ensures the middleware does not block the subsequent handlers.
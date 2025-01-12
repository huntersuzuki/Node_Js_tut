This code demonstrates **callback functions** using two examples:

1. **A simple callback function in a custom function.**
2. **Reading a file asynchronously with a callback.**

---

### **1. Normal Callback Function Example**

```javascript
function person(name, callBackFunction) {
  console.log(`Hii ${name}`);
  callBackFunction(); // Executes the callback function
}
function address() {
  console.log("India, MH");
}
person("Pranay", address);
```

**What’s happening here?**
- The `person` function takes two arguments:
    1. `name`: A string.
    2. `callBackFunction`: A function passed as an argument (the "callback").
- Inside `person`, it first logs `"Hii Pranay"`.
- Then it **calls the callback function**, which is `address`. This logs `"India, MH"`.

**Why use a callback here?**
- A callback allows us to pass a function (`address`) to be executed **after some action** in `person`.

**Output:**
```
Hii Pranay
India, MH
```

---

### **2. File Reading with a Callback**

```javascript
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file");
    return;
  }
  console.log(data);
});
```

**What’s happening here?**
- `fs.readFile()` is a function from Node.js's `fs` (File System) module used to read files.
- It takes three arguments:
    1. `"input.txt"`: The file name to read.
    2. `"utf8"`: Encoding format to interpret the file content as text.
    3. A callback function `(err, data)` that runs after the file reading is done.

**Inside the callback:**
- If there's an error (e.g., the file doesn't exist), `err` will contain the error message.
    - Logs `"Error reading file"` and exits if there's an error.
- If there's no error, `err` will be `null`, and `data` contains the file content.
    - Logs the content of the file to the console.

**Why use a callback here?**
- File reading is an **asynchronous operation**. The program doesn't wait for the file to be read—it moves on and executes the callback when the file is ready.

**Example Output (assuming the file contains "Hello, World!"):**
```
Hello, World!
```

---

### **What is a Callback?**
- A **callback** is a function passed as an argument to another function. It is **called back** (executed) after the main function completes its task.

---

### **Key Differences in the Examples:**
1. **Custom Callback Example:**
    - Shows how to pass and use a callback manually.

2. **File Reading Callback:**
    - A real-world example where callbacks are essential for handling asynchronous operations like file reading.

Callbacks are widely used in Node.js for tasks that take time (like file I/O or network requests) to keep the code **non-blocking**.
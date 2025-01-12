This code contains two parts:

1. **A function to delay an action for a specified time using Promises.**
2. **A function to divide two numbers with error handling using Promises.**

Let's break it down step by step:

---

### **1. Delay Function (`dealyFn`)**
This function creates a delay using a Promise:

```javascript
function dealyFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
```

- `dealyFn(time)` takes a number `time` (in milliseconds) as input.
- It uses `setTimeout` to wait for the given time before calling `resolve`.
- The `resolve` tells the Promise to finish successfully after the delay.

Example usage:

```javascript
console.log("Promise lecture starts");
dealyFn(2000).then(() => console.log("After 2 sec promise resolved"));
console.log("End");
```

**Output:**
1. It logs `"Promise lecture starts"`.
2. Immediately logs `"End"` because `dealyFn(2000)` does not block the code; it works asynchronously.
3. After 2 seconds, the Promise resolves, and `"After 2 sec promise resolved"` is logged.

---

### **2. Division Function with Error Handling (`divideFn`)**
This function performs division but checks for division by zero:

```javascript
function divideFn(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("Cant perform division by zero");
    } else {
      resolve(num1 / num2);
    }
  });
}
```

- `divideFn(num1, num2)` takes two numbers as input.
- If `num2` is 0, the Promise is rejected with an error message: `"Cant perform division by zero"`.
- Otherwise, it resolves and returns the division result (`num1 / num2`).

Example usage:

```javascript
divideFn(10, 0)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

**Output:**
1. Since `num2` is 0, the `reject` function is called.
2. The `.catch()` block handles the error and logs: `"Cant perform division by zero"`.

If you tried `divideFn(10, 2)`, it would log `5` because `num2` is not zero.

---

### **Key Points to Remember:**
- **Promises**: A way to handle asynchronous tasks (like waiting or checking conditions).
- **resolve**: Called when the task is successful.
- **reject**: Called when the task fails.
- **.then()**: Runs if the Promise resolves successfully.
- **.catch()**: Runs if the Promise is rejected with an error.

---

This code demonstrates how Promises can be used for asynchronous operations (like delays) and error handling.
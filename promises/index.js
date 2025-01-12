function dealyFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

console.log("Promise lecture starts");
dealyFn(2000).then(() => console.log("After 2 sec promise resolved"));
console.log("End");

function divideFn(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("Cant perform division by zero");
    } else {
      resolve(num1 / num2);
    }
  });
}

divideFn(10, 0)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

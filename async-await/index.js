function delayFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function delayedGreet(name) {
  await delayFn(2000);
  console.log(`Hii ${name}`);
}

delayedGreet("Pranay");

// error handling in async-await

async function divisionFn(num1, num2) {
  try {
    if (num2 === 0) throw new Error("Cannot divide by zero");
    return num1 / num2;
  } catch (e) {
    console.error("Some error occurred", e);
    return null;
  }
}

async function mainFn() {
  console.log(await divisionFn(10, 5));
  console.log(await divisionFn(10, 0));
}
mainFn();

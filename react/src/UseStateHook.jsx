import React, { useState } from "react";
import UseEffectHook from "./UseEffectHook";

function UseStateHook() {
  let a = 0;

  // [variable, function]
  const [counter, setCounter] = useState(a); // 0

  function incrementA() {
    a = a + 1;
  }

  function incrementCounter() {
    // counter = counter + 1

    setCounter(counter + 1);
    // setCounter(() => counter + 1)
    // setCounter(() => {
    //   return counter + 1;
    // });
    // setCounter((previous) => previous + 1)
  }

  console.log("a", a);
  console.log("counter", counter);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>State Hook</h2>
      <p>a: {a}</p>
      <p>counter: {counter}</p>

      <div
        style={{
          padding: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <button onClick={() => incrementA()}>a+</button>
        <button onClick={() => incrementCounter()}>counter+</button>
      </div>
      {/* <UseEffectHook value={counter} /> */}
    </div>
  );
}

export default UseStateHook;

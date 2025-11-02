import React, { useEffect, useRef, useState } from "react";

function SimpleRef() {
  const [count, setCount] = useState(0); // 1
  const refCount = useRef(0);

  useEffect(() => {
    refCount.current = count; // 0 -> 1
  }, [count]); // 0 -> 1

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Ref Hook</h2>
      <p>State: {count}</p> {/* 1 */}
      <p>Ref: {refCount.current}</p> {/* 0 */}
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

export default SimpleRef;

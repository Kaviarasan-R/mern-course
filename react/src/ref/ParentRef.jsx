import React, { useEffect, useRef } from "react";
import ChildRef from "./ChildRef";

function ParentRef() {
  const childRef = useRef(null);
  const divRef = useRef(null);
  const btnRef = useRef(null);

  // childRef.current = {
  // focus(),
  // blur(),
  // value
  // };

  // useEffect(() => {
  //   childRef.current?.focus();
  // }, []);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = "lightGray";
      divRef.current.style.padding = "20px";
      divRef.current.style.borderRadius = "20px";
    }
  }, []);

  // TODO: Use Ref in Parent Button Element & Use onClick property

  return (
    <div ref={divRef} style={{ backgroundColor: "red" }}>
      <h2>Ref & Imperative Handle Hook</h2>
      <ChildRef ref={childRef} />
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => {
            // childRef.current?.focus();
            childRef.current?.focusInput();
          }}
        >
          Focus
        </button>
        <button
          onClick={() => {
            // childRef.current?.blur();
            childRef.current?.clearInput();
          }}
        >
          Clear
        </button>
        <button onClick={() => childRef.current.loadUser()}>Fetch User</button>
        <button
          onClick={() => {
            console.log(childRef.current.getInputValue());
          }}
        >
          Get Input Value
        </button>
      </div>

      {/* <input ref={childRef} placeholder="Type something..." /> */}
      <button ref={btnRef} onClick={() => console.log(childRef.current?.value)}>
        Get Value
      </button>
    </div>
  );
}

export default ParentRef;

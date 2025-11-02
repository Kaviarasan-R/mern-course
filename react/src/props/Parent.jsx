import Child from "./Child";

function Parent(data) {
  const { name, surname } = data;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Components & Props</h2>
      <br />
      <div>
        Hello {name} <Child surname={surname} />{" "}
      </div>
    </div>
  );
}

export default Parent;

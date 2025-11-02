import React from "react";

/**
 * A simple React Class Component that demonstrates:
 *  - Constructor
 *  - componentDidMount
 *  - componentDidUpdate
 *  - componentWillUnmount
 *  - render
 */
class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      count: 0,
      color: "blue",
    };
    console.log("🔹 constructor() called");
  }

  // Called once right after the component is mounted to the DOM
  componentDidMount() {
    console.log("✅ componentDidMount() - Component mounted");
    // Example: Start an interval or fetch data
    this.timer = setInterval(() => {
      console.log("⏰ Interval running...");
    }, 2000);
  }

  // Called after each render when state or props change
  componentDidUpdate(prevProps, prevState) {
    console.log("🔁 componentDidUpdate() called");

    // Detect specific state changes
    if (prevState.count !== this.state.count) {
      console.log(
        `⚡ Count changed from ${prevState.count} → ${this.state.count}`
      );
    }
    if (prevState.color !== this.state.color) {
      console.log(
        `🎨 Color changed from ${prevState.color} → ${this.state.color}`
      );
    }
  }

  // Called right before the component is unmounted (destroyed)
  componentWillUnmount() {
    console.log("❌ componentWillUnmount() - Cleaning up...");
    clearInterval(this.timer);
  }

  // Example event handlers
  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  toggleColor = () => {
    this.setState((prevState) => ({
      color: prevState.color === "blue" ? "green" : "blue",
    }));
  };

  render() {
    console.log("🎨 render() - Rendering component");

    const { count, color } = this.state;

    return (
      <div
        style={{
          border: "2px solid #444",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color }}>React Class Component Lifecycle</h2>
        <p>Count: {count}</p>
        <button onClick={this.increment} style={{ marginRight: "10px" }}>
          Increment
        </button>
        <button onClick={this.toggleColor}>Toggle Color</button>
        <p style={{ fontSize: "12px", color: "#666" }}>
          (Open console to see lifecycle logs)
        </p>
      </div>
    );
  }
}

/**
 * Wrapper Component to test unmounting behavior
 */
export class LifecycleApp extends React.Component {
  state = { show: true };

  toggle = () => this.setState({ show: !this.state.show });

  render() {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h2>React Lifecycle Demo</h2>
        <br />
        <button onClick={this.toggle}>
          {this.state.show ? "Unmount" : "Mount"} Component
        </button>
        {this.state.show && <LifecycleDemo />}
      </div>
    );
  }
}

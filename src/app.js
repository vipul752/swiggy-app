import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// Main App component

const App = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

// Rendering the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

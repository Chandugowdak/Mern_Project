// src/App.jsx
import React from "react";
import ChatBox from "./components/ChatBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="app-container bg-light text-dark min-vh-100 d-flex align-items-center justify-content-center">
      <ChatBox />
    </div>
  );
}

export default App;

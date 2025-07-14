import React, { useState } from "react";
import axios from "axios";

const ChatBox = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await axios.post("http://localhost:3000/api/chat/ask", {
        message: userInput,
      });

      setMessages([
        ...newMessages,
        { sender: "ai", text: response.data.reply },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "ai", text: "❌ Error from AI." },
      ]);
    }
  };

  return (
    <div className="chat-container shadow p-4 bg-white rounded">
      <h4 className="mb-4 text-center">💬 AI Support Assistant</h4>
      <div className="chat-box mb-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message p-2 my-1 rounded ${
              msg.sender === "user"
                ? "bg-primary text-white text-end"
                : "bg-secondary text-white text-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn btn-success" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

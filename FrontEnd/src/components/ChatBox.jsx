import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatBox = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container my-5">
      <div className="chat-container shadow p-4 bg-white rounded">
        <h4 className="mb-4 text-center">💬 AI Support Assistant</h4>

        <div
          className="chat-box mb-3"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`d-flex ${
                msg.sender === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 my-1 rounded shadow-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-secondary text-white"
                }`}
                style={{ maxWidth: "75%", borderRadius: "12px" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-muted small">AI is typing...</div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type your message..."
            value={userInput}
            disabled={loading}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) handleSend();
            }}
          />
          <button
            className="btn btn-success"
            onClick={handleSend}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

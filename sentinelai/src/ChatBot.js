import React, { useState, useEffect } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, Welcome to SentinelAI! How may I help you?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [documentContent, setDocumentContent] = useState("");  // Keep the document content in a state

  // Fetch document content when the component mounts
  useEffect(() => {
    const fetchDocumentContent = async () => {
      try {
        const response = await fetch("/assets/document.txt");  // Ensure it's in the 'public/assets' directory
        const text = await response.text();
        setDocumentContent(text);
      } catch (error) {
        console.error("Error fetching document content:", error);
      }
    };
    fetchDocumentContent();
  }, []);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");

    setLoading(true);

    try {

      const messages = [
        { 
          role: "system", 
          content: "You are an assistant in the project titled 'Harnessing GANs to generate decoy network packets to mislead cyber attackers by deploying them with each packet transmission.'" 
        },
        { 
          role: "user", 
          content: userInput 
        }
      ];

      // Debug: Log document content to check it’s being fetched correctly
      console.log("Document Content:", documentContent);  // Ensure it's not empty
      console.log("User Input:", userInput);  // Debugging
      const response = await fetch("http://127.0.0.1:11434/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama2",
          messages: messages,
          stream: false  // Setting stream as false for non-streaming responses
        })
      });

      const data = await response.json();
      console.log("receive wala Content:", data); 
      // Debug: Log the full response to investigate its structure
      console.log("Full API Response:", data);  // Log entire response for better debugging

      // Corrected extraction of the assistant's response
      const botMessage = data?.choices?.[0]?.message?.content?.trim();

      if (botMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botMessage },
        ]);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, something went wrong. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-bot">
      <button className="chat-toggle" onClick={toggleChatBot}>
        {isOpen ? "×" : "💬"}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            {loading && <div className="chat-message bot">Typing...</div>}
          </div>

          <form onSubmit={sendMessage} className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

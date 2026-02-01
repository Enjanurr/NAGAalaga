"use client";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

// Define what a message looks like for TypeScript
interface ChatMessage {
  sender: string;
  text: string;
  conversationId: string;
  createdAt?: string; // Optional because new messages won't have it yet
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]); 
  
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling

  const conversationId = "doctor123_parent456";

  // 1. Fetch Chat History from MongoDB on Load
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/messages/history?conversationId=${conversationId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setChat(data);
        }
      } catch (err) {
        console.error("Error loading chat history:", err);
      }
    };

    fetchHistory();
  }, [conversationId]);

  // 2. Setup Socket Connection
  useEffect(() => {
    socketRef.current = io(); 
    const socket = socketRef.current;

    socket.emit("join-chat", conversationId);

    socket.on("receive-message", (data: ChatMessage) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  // 3. Auto-scroll to bottom whenever chat updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const sendChat = async () => {
    if (!message.trim() || !socketRef.current) return;

    const chatData: ChatMessage = { 
      conversationId, 
      text: message, 
      sender: "Doctor" 
    };
    
    // Send to Socket (Real-time)
    socketRef.current.emit("send-message", chatData);

    // Save to MongoDB (Permanent)
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatData),
      });
    } catch (err) {
      console.error("Failed to save message:", err);
    }

    setMessage("");
  };

  return (
    <div className="p-4 max-w-lg mx-auto h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Chat with Doctor</h2>
      
      {/* Scrollable Chat Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto border p-4 mb-4 bg-white rounded-lg shadow-inner"
      >
        {chat.map((msg, i) => (
          <div 
            key={i} 
            className={`mb-4 flex ${msg.sender === "Doctor" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                msg.sender === "Doctor" 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "bg-gray-200 text-black rounded-tl-none"
              }`}
            >
              <strong className={`block text-[10px] uppercase mb-1 ${
                msg.sender === "Doctor" ? "text-blue-200" : "text-gray-500"
              }`}>
                {msg.sender}
              </strong>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="flex gap-2 pb-4">
        <input 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendChat()}
          className="flex-1 border border-gray-300 p-3 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          placeholder="Type your message..."
        />
        <button 
          onClick={sendChat} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md active:scale-95"
        >
          Send
        </button>
      </div>
    </div>
  );
}
"use client";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { 
  FaPaperPlane, 
  FaUserMd, 
  FaEllipsisV, 
  FaPhone, 
  FaVideo, 
  FaCheckDouble, 
  FaCheck,
  FaPaperclip,
  FaMicrophone,
  FaSmile,
  FaImage,
  FaFileAlt,
  FaTimes,
  FaArrowDown,
  FaSearch,
  FaStar,
  FaClock
} from "react-icons/fa";

// Define what a message looks like for TypeScript
interface ChatMessage {
  sender: string;
  text: string;
  conversationId: string;
  createdAt?: string;
  status?: "sent" | "delivered" | "read";
  type?: "text" | "image" | "file";
  attachment?: {
    name: string;
    size: string;
    url: string;
  };
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]); 
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const conversationId = "doctor123_parent456";
  const doctorName = "Dr. Adrian James F. Bona";
  const doctorSpecialty = "General Practice & Family Medicine";

  const emojis = ["😊", "👍", "❤️", "😂", "🙏", "👏", "🎉", "💯", "🔥", "✨", "🤔", "😷", "💊", "🏥"];

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
      setChat((prev) => {
        // Check if this message already exists (from optimistic update)
        const isDuplicate = prev.some(msg => 
          msg.text === data.text && 
          msg.sender === data.sender && 
          Math.abs(new Date(msg.createdAt || '').getTime() - new Date(data.createdAt || '').getTime()) < 2000
        );
        
        if (isDuplicate) {
          // Replace the optimistic message with the real one
          return prev.map(msg => 
            (msg as any).id && msg.text === data.text && msg.sender === data.sender 
              ? data 
              : msg
          );
        }
        
        return [...prev, data];
      });
      setIsTyping(false);
    });

    socket.on("user-typing", () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  // 3. Auto-scroll to bottom whenever chat updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chat, isTyping]);

  // 4. Handle scroll button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200);
      }
    };

    const scrollElement = scrollRef.current;
    scrollElement?.addEventListener("scroll", handleScroll);
    return () => scrollElement?.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  const sendChat = async () => {
    if (!message.trim() || !socketRef.current) return;

    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const chatData: ChatMessage = { 
      conversationId, 
      text: message, 
      sender: "Parent",
      status: "sent",
      type: "text",
      createdAt: new Date().toISOString()
    };
    
    // Optimistically add to UI with temp ID
    const optimisticMessage = { ...chatData, id: tempId } as any;
    setChat((prev) => [...prev, optimisticMessage]);
    
    // Clear input immediately for better UX
    const messageToSend = message;
    setMessage("");
    setShowEmojiPicker(false);
    inputRef.current?.focus();

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
  };

  const handleTyping = () => {
    if (socketRef.current) {
      socketRef.current.emit("typing", conversationId);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage(prev => prev + emoji);
    inputRef.current?.focus();
  };

  const handleFileUpload = (type: string) => {
    console.log("Upload type:", type);
    setShowAttachMenu(false);
    // Handle file upload logic here
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Handle voice recording logic here
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit",
      hour12: true 
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const MessageStatus = ({ status }: { status?: string }) => {
    if (status === "read") return <FaCheckDouble className="text-[#E6E1F2]" size={12} />;
    if (status === "delivered") return <FaCheckDouble className="text-[#E6E1F2]/60" size={12} />;
    return <FaCheck className="text-[#E6E1F2]/60" size={12} />;
  };

  const groupMessagesByDate = () => {
    const groups: { [key: string]: ChatMessage[] } = {};
    chat.forEach(msg => {
      const date = formatDate(msg.createdAt);
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EFF9] via-[#E6E1F2] to-[#F2EFF9] flex items-center justify-center p-2 md:p-4">
      <div className="w-full max-w-5xl h-[95vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border border-[#3F2870]/10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3F2870] via-[#4a3380] to-[#5a3d99] px-4 md:px-6 py-4 flex items-center justify-between shadow-xl relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: "3s" }}></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }}></div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 relative z-10">
            {/* Doctor Avatar with Ring */}
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#E6E1F2] to-white flex items-center justify-center border-3 border-white shadow-lg transform transition-transform hover:scale-105">
                <FaUserMd className="text-[#3F2870]" size={24} />
              </div>
              {isOnline && (
                <>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-md"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                </>
              )}
            </div>
            
            {/* Doctor Info */}
            <div>
              <h2 className="text-white font-bold text-base md:text-lg tracking-wide">{doctorName}</h2>
              <div className="flex items-center gap-2">
                <p className="text-[#E6E1F2] text-xs flex items-center gap-1.5">
                  {isOnline ? (
                    <>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="font-medium">Active now</span>
                    </>
                  ) : (
                    <>
                      <FaClock className="text-[#E6E1F2]" size={10} />
                      <span>Last seen 2h ago</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 relative z-10">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              <FaSearch className="text-white" size={14} />
            </button>
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 group">
              <FaPhone className="text-white group-hover:rotate-12 transition-transform" size={14} />
            </button>
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95">
              <FaVideo className="text-white" size={16} />
            </button>
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95">
              <FaEllipsisV className="text-white" size={14} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="px-4 py-3 bg-[#F2EFF9] border-b border-[#E6E1F2] animate-slideDown">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3F2870]/50" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-11 pr-10 py-2.5 bg-white border-2 border-[#E6E1F2] rounded-full text-sm focus:outline-none focus:border-[#3F2870] transition-all"
              />
              <button 
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3F2870]/50 hover:text-[#3F2870]"
              >
                <FaTimes size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Doctor Specialty Banner */}
        <div className="px-6 py-3 bg-gradient-to-r from-[#E6E1F2] to-[#F2EFF9] border-b border-[#3F2870]/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#3F2870] rounded-full"></div>
              <span className="text-xs font-semibold text-[#3F2870] uppercase tracking-wider">{doctorSpecialty}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500" size={12} />
              <span className="text-xs font-bold text-[#3F2870]">4.9</span>
              <span className="text-xs text-[#3F2870]/60">(234 reviews)</span>
            </div>
          </div>
        </div>
        
        {/* Chat Messages Area */}
        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth"
          style={{
            background: `
              linear-gradient(135deg, rgba(242, 239, 249, 0.5) 0%, rgba(230, 225, 242, 0.3) 100%),
              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(63, 40, 112, 0.02) 10px, rgba(63, 40, 112, 0.02) 20px)
            `
          }}
        >
          {Object.entries(messageGroups).map(([date, messages]) => (
            <div key={date}>
              {/* Date Divider */}
              <div className="flex items-center justify-center mb-6">
                <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-[#E6E1F2]">
                  <span className="text-xs font-bold text-[#3F2870] uppercase tracking-wide">{date}</span>
                </div>
              </div>

              {/* Messages for this date */}
              <div className="space-y-4">
                {messages.map((msg, i) => {
                  const isParent = msg.sender === "Parent";
                  const prevMsg = i > 0 ? messages[i - 1] : null;
                  const showAvatar = !prevMsg || prevMsg.sender !== msg.sender;
                  const isConsecutive = prevMsg && prevMsg.sender === msg.sender;

                  return (
                    <div key={i} className="animate-fadeIn">
                      <div 
                        className={`flex gap-2 ${isParent ? "justify-end" : "justify-start"} ${
                          isConsecutive ? "mt-1" : "mt-4"
                        }`}
                      >
                        {!isParent && (
                          <div className="flex-shrink-0">
                            {showAvatar ? (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E6E1F2] to-white flex items-center justify-center shadow-md border-2 border-white">
                                <FaUserMd className="text-[#3F2870]" size={14} />
                              </div>
                            ) : (
                              <div className="w-8"></div>
                            )}
                          </div>
                        )}
                        
                        <div 
                          className={`max-w-[75%] md:max-w-[65%] group ${
                            isParent ? "animate-slideInRight" : "animate-slideInLeft"
                          }`}
                        >
                          {showAvatar && !isParent && (
                            <div className="flex items-center gap-2 mb-1.5 ml-1">
                              <span className="text-[10px] font-bold text-[#3F2870] uppercase tracking-wider">
                                {doctorName}
                              </span>
                              <span className="text-[9px] text-[#3F2870]/40 font-medium">
                                Medical Professional
                              </span>
                            </div>
                          )}
                          
                          <div 
                            className={`relative px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 ${
                              isParent 
                                ? "bg-gradient-to-br from-[#3F2870] via-[#4a3380] to-[#5a3d99] text-white rounded-2xl rounded-br-md" 
                                : "bg-white text-[#1B1530] rounded-2xl rounded-bl-md border-2 border-[#E6E1F2] hover:border-[#3F2870]/30"
                            }`}
                          >
                            {/* Message Content */}
                            <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                              {msg.text}
                            </p>
                            
                            {/* Attachment Preview */}
                            {msg.attachment && (
                              <div className="mt-3 pt-3 border-t border-white/20">
                                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                                  <FaFileAlt className="text-white" size={20} />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold truncate">{msg.attachment.name}</p>
                                    <p className="text-[10px] opacity-70">{msg.attachment.size}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Message Footer */}
                            <div className={`flex items-center justify-end gap-1.5 mt-2 ${
                              isParent ? "text-white/80" : "text-[#3F2870]/60"
                            }`}>
                              <span className="text-[10px] font-semibold">
                                {formatTime(msg.createdAt)}
                              </span>
                              {isParent && <MessageStatus status={msg.status} />}
                            </div>

                            {/* Hover Actions */}
                            <div className={`absolute top-0 ${isParent ? "left-0 -translate-x-full" : "right-0 translate-x-full"} opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 px-2`}>
                              <button className="w-6 h-6 rounded-full bg-white shadow-md hover:bg-gray-100 flex items-center justify-center text-[#3F2870] transition-transform hover:scale-110">
                                <FaSmile size={12} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {isParent && <div className="w-8"></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2 animate-fadeIn">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E6E1F2] to-white flex items-center justify-center shadow-md border-2 border-white">
                <FaUserMd className="text-[#3F2870]" size={14} />
              </div>
              <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-md shadow-lg border-2 border-[#E6E1F2]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-[#3F2870] rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1s" }}></div>
                  <div className="w-2.5 h-2.5 bg-[#3F2870] rounded-full animate-bounce" style={{ animationDelay: "200ms", animationDuration: "1s" }}></div>
                  <div className="w-2.5 h-2.5 bg-[#3F2870] rounded-full animate-bounce" style={{ animationDelay: "400ms", animationDuration: "1s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute right-6 bottom-32 w-12 h-12 bg-gradient-to-br from-[#3F2870] to-[#5a3d99] text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 animate-fadeIn"
          >
            <FaArrowDown size={18} />
          </button>
        )}
        
        {/* Input Area */}
        <div className="bg-white border-t-2 border-[#E6E1F2] p-3 md:p-4 shadow-2xl relative">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full left-4 mb-2 bg-white rounded-2xl shadow-2xl border-2 border-[#E6E1F2] p-4 animate-slideUp z-30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-[#3F2870]">Quick Reactions</h4>
                <button onClick={() => setShowEmojiPicker(false)} className="text-[#3F2870]/50 hover:text-[#3F2870]">
                  <FaTimes size={12} />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {emojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl hover:scale-125 transition-transform active:scale-95 hover:bg-[#F2EFF9] rounded-lg p-2"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Attachment Menu */}
          {showAttachMenu && (
            <div className="absolute bottom-full left-4 mb-2 bg-white rounded-2xl shadow-2xl border-2 border-[#E6E1F2] p-3 animate-slideUp z-30 min-w-[200px]">
              <button 
                onClick={() => handleFileUpload("image")}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F2EFF9] rounded-xl transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaImage className="text-white" size={16} />
                </div>
                <span className="text-sm font-semibold text-[#3F2870]">Photos</span>
              </button>
              <button 
                onClick={() => handleFileUpload("document")}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F2EFF9] rounded-xl transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaFileAlt className="text-white" size={16} />
                </div>
                <span className="text-sm font-semibold text-[#3F2870]">Documents</span>
              </button>
            </div>
          )}

          <div className="flex items-end gap-2 md:gap-3">
            {/* Attachment Button */}
            <button 
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#F2EFF9] hover:bg-[#E6E1F2] border-2 border-[#E6E1F2] flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
            >
              <FaPaperclip className="text-[#3F2870] group-hover:rotate-45 transition-transform" size={18} />
            </button>

            <div className="flex-1 relative">
              {/* Input Field */}
              <div className="relative">
                <input 
                  ref={inputRef}
                  value={message} 
                  onChange={(e) => {
                    setMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendChat();
                    }
                  }}
                  className="w-full bg-[#F2EFF9] border-2 border-[#E6E1F2] focus:border-[#3F2870] text-[#1B1530] px-5 py-3.5 pr-14 rounded-2xl focus:outline-none transition-all placeholder:text-[#3F2870]/40 text-[15px] shadow-inner"
                  placeholder="Type your message..."
                />
                
                {/* Emoji Button */}
                <button 
                  onClick={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                    setShowAttachMenu(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3F2870] hover:text-[#5a3d99] transition-all hover:scale-110 active:scale-95"
                >
                  <FaSmile size={22} />
                </button>
              </div>
            </div>
            
            {/* Voice/Send Button */}
            {message.trim() ? (
              <button 
                onClick={sendChat}
                className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-[#3F2870] via-[#4a3380] to-[#5a3d99] hover:from-[#5a3d99] hover:to-[#3F2870] text-white rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 group flex items-center justify-center"
              >
                <FaPaperPlane className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={18} />
              </button>
            ) : (
              <button 
                onClick={toggleRecording}
                className={`flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center ${
                  isRecording 
                    ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                    : "bg-gradient-to-br from-[#3F2870] to-[#5a3d99] hover:from-[#5a3d99] hover:to-[#3F2870]"
                }`}
              >
                <FaMicrophone className="text-white" size={18} />
              </button>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            <button className="px-4 py-2 bg-gradient-to-r from-[#E6E1F2] to-[#F2EFF9] hover:from-[#3F2870] hover:to-[#5a3d99] hover:text-white text-[#3F2870] rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-sm hover:shadow-md border border-[#E6E1F2] hover:border-transparent">
              💊 Request Prescription
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-[#E6E1F2] to-[#F2EFF9] hover:from-[#3F2870] hover:to-[#5a3d99] hover:text-white text-[#3F2870] rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-sm hover:shadow-md border border-[#E6E1F2] hover:border-transparent">
              📋 Lab Results
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-[#E6E1F2] to-[#F2EFF9] hover:from-[#3F2870] hover:to-[#5a3d99] hover:text-white text-[#3F2870] rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-sm hover:shadow-md border border-[#E6E1F2] hover:border-transparent">
              📅 Schedule Follow-up
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-[#E6E1F2] to-[#F2EFF9] hover:from-[#3F2870] hover:to-[#5a3d99] hover:text-white text-[#3F2870] rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-sm hover:shadow-md border border-[#E6E1F2] hover:border-transparent">
              🏥 Book Appointment
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #F2EFF9;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3F2870 0%, #5a3d99 100%);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5a3d99 0%, #3F2870 100%);
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
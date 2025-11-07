

"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Assistant() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      type: "greeting",
      text: "Hi! Welcome to Indore! Ask me about places, food, hotels & culture ✨",
      links: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showText, setShowText] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Floating button text animation
  useEffect(() => {
    const interval = setInterval(() => setShowText((prev) => !prev), 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "bot", type: "response", text: data.reply, links: data.links || [] },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          type: "error",
          text: "Oops! Something went wrong. Try again later.",
          links: [],
        },
      ]);
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessage = (msg) => {
    if (msg.from === "bot") {
      return (
        <div>
          <span style={{ whiteSpace: "pre-line" }}>{msg.text}</span>
          {msg.links?.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-2">
              {msg.links.map((linkObj, idx) => (
                <a
                  key={idx}
                  href={linkObj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded shadow text-xs hover:bg-gray-200"
                >
                  <ExternalLink size={14} /> {linkObj.name}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }
    return msg.text;
  };

  const getBotColor = (msg) => {
    if (msg.type === "hotel") return "bg-orange-200";
    if (msg.type === "food") return "bg-green-200";
    return "bg-gray-200";
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-black hover:shadow-md hover:shadow-gray-400 text-white font-semibold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 overflow-hidden"
      >
        {/* Vibrating Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        >
          <MessageCircle size={22} />
        </motion.div>

        {/* Animated Text */}
        <AnimatePresence>
          {showText && (
            <motion.span
              key="chatText"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="hidden sm:inline"
            >
              Namaste Indore Chatbot
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-96 h-[460px] bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl border-2 border-gray-700 shadow-2xl flex flex-col overflow-hidden z-50">
          <div className="bg-gray-700 text-white py-3 text-center font-bold text-lg shadow-md">
            💬 Namaste Indore
          </div>
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => {
              const isBot = msg.from === "bot";
              return (
                <div
                  key={i}
                  className={`mb-2 p-2 rounded-md shadow text-sm break-words ${
                    isBot ? `${getBotColor(msg)} font-medium text-left` : "bg--100 text-right"
                  }`}
                >
                  <b>{isBot ? "Bot: " : "You: "}</b>
                  {renderMessage(msg)}
                </div>
              );
            })}
            {isTyping && (
              <div className="mb-2 p-2 rounded-md shadow text-sm bg-gray-200 font-medium">
                Bot is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t border-gray-300 bg-white p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="flex-1 p-2 border border-gray-600 rounded-md text-sm outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 px-4 py-2 bg-gray-700 text-white font-bold rounded-md shadow hover:bg-gray-900"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

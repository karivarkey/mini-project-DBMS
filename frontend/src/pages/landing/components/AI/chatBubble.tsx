// ChatBox.tsx
import React, { useEffect, useState } from "react";

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the entrance animation when the component mounts
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white p-4 w-64 h-80 rounded-lg shadow-lg z-30 flex flex-col
      transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0" // Fully visible, normal position
          : "opacity-0 translate-y-10" // Hidden and translated down
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chat</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-100 p-2 rounded-md">
        {/* Messages will go here */}
        <p className="text-sm text-gray-600">
          Hello! How can I help you today?
        </p>
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        className="mt-4 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default ChatBox;

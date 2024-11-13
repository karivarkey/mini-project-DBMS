// AiBubble.tsx
import React, { useState } from "react";
import bubble from "./assets/bubble.svg";
import ChatBox from "./chatBubble";

const AiBubble: React.FC = () => {
  const [isChatBoxOpen, setChatBoxOpen] = useState(false);

  const toggleChatBox = () => {
    setChatBoxOpen(!isChatBoxOpen);
  };

  return (
    <>
      <button
        onClick={toggleChatBox}
        className="fixed z-20 bottom-4 left-4 bg-white p-3 rounded-full shadow-lg flex items-center justify-center"
      >
        <img src={bubble} alt="AI Bubble" className="w-8 h-8" />
      </button>
      {isChatBoxOpen && <ChatBox onClose={toggleChatBox} />}
    </>
  );
};

export default AiBubble;

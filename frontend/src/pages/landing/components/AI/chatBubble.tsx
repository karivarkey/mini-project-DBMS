// ChatBox.tsx
import React, { useEffect, useState } from "react";
import { sendMessageToGeminiAI } from "./geminiAPI"; // Import the utility function
import axios from "axios";

interface Toy {
  _id: string;
  productName: string;
  manufacturer: {
    _id: string;
  };
  price: number;
  category: {
    type: string; // This matches the "type" property in the category object
    features: string[];
  };
  ageGroup: number[];
  stockLeft: number;
  popularity: {
    views: number;
    purchases: number;
    _id: string;
  };
  __v: number;
}

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

interface ChatBoxProps {
  onClose: () => void;
}

const fetchToysByCategories = async (categories: string[]): Promise<Toy[]> => {
  try {
    // Make the API call to fetch all toys
    const response = await axios.get<Toy[]>("http://localhost:5000/api/toys");

    // Log the API response for debugging
    console.log("API Response:", response.data);

    // Filter the toys based on the provided categories
    const filteredToys = response.data.filter((toy) => {
      const categoryType = toy.category.type; // Access the category type
      const isIncluded = categories.includes(categoryType); // Check if it matches the provided categories
      console.log(
        `Checking toy: ${toy.productName}, category: ${categoryType}, included: ${isIncluded}`
      );
      return isIncluded;
    });

    // Log the filtered toys
    console.log("Filtered Toys:", filteredToys);

    return filteredToys; // Return the filtered array of toys
  } catch (error) {
    console.error("Error fetching toys:", error);
    return []; // Return an empty array on error
  }
};

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  // Trigger the entrance animation when the component mounts
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // Function to handle sending a message to the AI
  const handleSendMessageToAI = async (userMessage: string) => {
    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userMessage },
    ]);

    try {
      // Fetch all toys to get the list of categories
      const response = await axios.get<Toy[]>("http://localhost:5000/api/toys");
      const allToys = response.data;

      // Extract unique categories from the toys
      const uniqueCategories = Array.from(
        new Set(allToys.map((toy) => toy.category.type))
      );

      // Send message to Gemini AI along with the available categories
      const aiResponse = await sendMessageToGeminiAI(
        userMessage,
        uniqueCategories
      );

      // Check the AI response and add it to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: aiResponse.response }, // Use the response field from the API response
      ]);

      // If the AI response contains categories, fetch products related to those categories
      if (aiResponse.categories && aiResponse.categories.length > 0) {
        // Fetch products based on the selected categories
        const products = await fetchToysByCategories(aiResponse.categories);
        console.log(products);

        // Format product links and add them to the chat
        const productLinks = products.map(
          (product) => `${product.productName} - $${product.price}`
        );

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: `Here are some products you might like:\n${productLinks
              .map(
                (product) => `• ${product}` // Prefix each product with a bullet point
              )
              .join("\n")}`, // Join each product with a new line
          },
        ]);
      }
    } catch (error) {
      console.error("Error processing AI message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Sorry, there was an error fetching products." },
      ]);
    }
  };

  // Handle message submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return; // Ignore empty messages

    handleSendMessageToAI(input);
    setInput("");
  };

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white p-4 w-64 lg:w-96 h-96 rounded-lg shadow-lg z-30 flex flex-col
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
        {/* Render chat messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              message.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="mt-4 flex">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;

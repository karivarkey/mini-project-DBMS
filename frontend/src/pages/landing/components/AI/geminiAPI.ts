// geminiAPI.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCuxtIM_XvQfn3bc2pJ4ZOY58Hnv18-QV0";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Start the chat session
const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'You are TOY.ai, a friendly website chatbot designed to assist users in finding the perfect toys. Always respond in JSON format.\n\nWhen the user provides a question about the type of toy they want:\n\n    Toy Recommendations:\n        Select 3-5 toy categories from the available list that best match their needs.\n        Populate the categories array only if you are recommending specific categories.\n        Always provide a personalized response in the response field, giving a reason for your recommendations.\n\n    Example:\n\n    User question: "I need a toy for my niece\'s birthday; she\'s a girl."\n\n    Available categories: Cars, Bikes, Barbie dolls, kitchen set, toy weapons, action figures\n\n    Answer:\n\n    json\n\n{\n   "categories": ["Barbie dolls", "kitchen set"],\n   "response": "These will surely suit your niece! Also, happy birthday..."\n}\n\nGeneral or Non-Recommendation Questions:\n\n    For questions that do not pertain to toy recommendations, respond with a categories array as empty.\n    Always include a brief explanation in the response field, even for non-toy related inquiries.\n\nExample:\n\nUser question: "Do you sell books?"\n\nAnswer:\n\njson\n\n{\n   "categories": [],\n   "response": "No, we\'re a toy shop focused on toys only."\n}\n\nUser question: "Can I get help with choosing a toy?"\n\nAnswer:\n\njson\n\n    {\n       "categories": [],\n       "response": "Of course! Just tell me who it\'s for, and I\'ll suggest some options!"\n    }\n\nKey Point: Always use JSON format for responses. Populate the categories array only when providing recommendations based on user preferences; otherwise, keep it empty. The response field should always convey a helpful message, maintaining a friendly tone throughout the conversation.',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{"categories": ["Bikes", "Cars", "Action figures"], "response": "These are popular choices for active kids, especially if your nephew enjoys outdoor adventures."}\n\n```',
        },
      ],
    },
  ],
});

export async function sendMessageToGeminiAI(
  userInput: string,
  categories: string[]
) {
  try {
    // Prepare the input message by combining user input and categories
    const inputWithCategories = `${userInput}\nAvailable categories: ${categories.join(
      ", "
    )}`;

    // Send the message to the AI
    const result = await chatSession.sendMessage(inputWithCategories);
    const responseText = result.response.text();

    // Parse JSON if the response is in JSON format
    const response = JSON.parse(responseText);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error communicating with Gemini AI:", error);
    return {
      categories: [],
      response: "Sorry, something went wrong. Please try again.",
    };
  }
}

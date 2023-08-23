import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

// Load environment variables from .env file
config();

// Create OpenAI API instance
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to interact with the language model
async function generateResponse(messages) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7, // Adjust the temperature as needed
  });

  return response.data.choices[0].message.content;
}

// Example interactions
async function main() {
  try {
    const userQuestion = "What is the capital of France";
    const userMessages = [{ role: "user", content: userQuestion }];

    const userResponse = await generateResponse(userMessages);
    console.log("User Question:", userQuestion);
    console.log("AI Response:", userResponse);

    const promptTemplate = `
      Be very funny when answering questions
      Question: ${userQuestion}
    `;

    const prompt = promptTemplate.trim();

    const promptMessages = [{ role: "system", content: prompt }];

    const promptResponse = await generateResponse(promptMessages);
    console.log("Prompt Response:", promptResponse);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the example interactions
main();

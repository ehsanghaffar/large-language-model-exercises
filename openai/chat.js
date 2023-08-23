// Import required modules and libraries
import { config } from "dotenv";
import OpenAI from "openai";

// Load environment variables from .env file
config();

// Create an instance of the OpenAI API
const openai = new OpenAI();

// Function to generate responses from the language model
async function generateResponse(messages, temperature = 0.7) {
  // Create a chat completion request using OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // Select the language model
    messages: messages,    // Messages array for conversation context
    temperature: temperature, // Temperature controls randomness of output
  });

  // Return the content of the generated response
  return response.choices[0].message.content;
}

// Main function to demonstrate example interactions
async function main(input) {
  try {
    

    // Create user messages array
    const userMessages = [{ role: "user", content: input }];

    // Generate AI response for the user question
    const userResponse = await generateResponse(userMessages);
    console.log("User Question:", input);
    console.log("AI Response:", userResponse);

    // Define a system prompt template
    const promptTemplate = `
      Be very funny when answering questions
      Question: ${input}
    `;

    // Trim the prompt template
    const prompt = promptTemplate.trim();

    // Create system prompt messages array
    const promptMessages = [{ role: "system", content: prompt }];

    // Generate AI response for the system prompt
    const promptResponse = await generateResponse(promptMessages);
    console.log("Prompt Response:", promptResponse);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Define a user question
const userQuestion = "What is the capital of France";

// Execute the main function
main(userQuestion);

import 'dotenv/config';
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

// Simplified version that uses LangChain's built-in functionality
async function main() {
    try {
        // Get API key from environment variables
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error("GROQ_API_KEY not found in environment variables");
        }

        // Create Groq client using LangChain's implementation
        const model = new ChatGroq({
            apiKey: apiKey,
            model: "deepseek-r1-distill-llama-70b",
            temperature: 0.7,
        });

        // Create messages using LangChain's message classes
        const messages = [
            new SystemMessage("You are a helpful translator. Translate the user sentence to Bangla."),
            new HumanMessage("I love programming."),
        ];

        // Generate response
        const response = await model.invoke(messages);
        
        console.log("\nResponse:\n");
        console.log(response.content);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Run the program
main();
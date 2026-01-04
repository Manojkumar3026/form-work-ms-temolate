import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the client. Note: In a real app, handle missing key gracefully in UI.
const ai = new GoogleGenAI({ apiKey });

/**
 * Sends a message to the Gemini AI model specialized in Medical Regulations.
 */
export const sendRegulatoryChatMessage = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    if (!apiKey) throw new Error("API Key is missing");

    // We use a fresh chat session for simplicity in this demo, 
    // but you could persist the chat object in a real app.
    // We convert our ChatMessage type to the format expected by the SDK if needed, 
    // but here we will just use a single turn or simple history for the prompt context 
    // since the 'chat' object maintains its own history if reused. 
    // For this stateless service function, we'll start a new chat and preload history if needed,
    // or just treat it as a single request with context. 
    
    // Let's use the chat feature properly.
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are a highly experienced Regulatory Affairs Consultant for medical devices. 
        You specialize in ISO 13485, EU MDR 2017/745, and FDA 21 CFR Part 820. 
        Your tone is professional, precise, and helpful. 
        Always cite the relevant standard or regulation clause when possible.
        Keep answers concise but thorough.`,
      },
    });

    // In a robust implementation, we would replay the history here.
    // For now, we will just send the user's latest message to the fresh chat 
    // (or you could append the previous context as text).
    // Let's just send the message directly for this stateless simulation.
    
    const response: GenerateContentResponse = await chat.sendMessage({ 
      message: newMessage 
    });

    return response.text || "I could not generate a response. Please check the logs.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with the Regulatory Assistant.");
  }
};

/**
 * Generates a draft SOP or Policy based on a title/topic.
 */
export const generateDocumentDraft = async (topic: string, type: 'SOP' | 'Work Instruction'): Promise<string> => {
    try {
        if (!apiKey) throw new Error("API Key is missing");

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Draft a medical device ${type} for: "${topic}". 
            Include standard sections: Purpose, Scope, Definitions, Responsibilities, Procedure, and References.
            Format it in Markdown.`,
        });
        
        return response.text || "";
    } catch (error) {
        console.error("Gemini Document Gen Error:", error);
        throw error;
    }
}
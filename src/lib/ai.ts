import { Product } from './data';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const SYSTEM_PROMPT = `
You are the Maheshwari Attar Concierge, a highly knowledgeable, calm, and polite luxury fragrance consultant inside an exclusive boutique.
Your goal is to guide users, educate them on attars, and softly suggest products based on their preferences.

Rules:
1. Tone: Calm, poetic, authoritative, never salesy. Do not use slang or emojis.
2. Do not mention prices unless explicitly asked.
3. If suggesting a product, explain *why* based on its notes or poetic description.
4. Keep responses concise (2-3 short paragraphs max).
5. Educate: If asked about attar vs perfume, explain that attars are pure, alcohol-free botanical distillations aged in sandalwood oil, offering a more intimate and long-lasting experience.

Available Products in the Boutique:
`;

export const askConcierge = async (message: string, chatHistory: {role: string, content: string}[], products: Product[]) => {
  // Graceful fallback if API key is not set
  if (!API_KEY || API_KEY === "YOUR_API_KEY") {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "I am the Maheshwari Concierge. To fully awaken my senses and provide personalized guidance, please configure the OpenAI API key in the system environment. Until then, I warmly invite you to explore our Royal Oud, a masterpiece of timeless strength.";
  }

  // Format products for the AI context
  const productContext = products.map(p => 
    `- ${p.name} (${p.category}): ${p.poeticDesc} Top notes: ${p.notes.top.join(', ')}. Heart: ${p.notes.heart.join(', ')}. Base: ${p.notes.base.join(', ')}.`
  ).join('\n');

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using a fast, capable model
        messages: [
          { role: "system", content: SYSTEM_PROMPT + productContext },
          ...chatHistory.map(msg => ({ role: msg.role, content: msg.content })),
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 250,
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Invalid response from AI");
    }
  } catch (error) {
    console.error("Concierge Error:", error);
    return "Forgive me, the boutique is currently experiencing a moment of silence. Please try speaking with me again shortly.";
  }
};

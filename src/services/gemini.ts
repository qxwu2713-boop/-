import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getTravelAdvice(userQuery: string, currentDeals: any[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `你是一个专业的特价机票分析专家。以下是当前平台上的特价机票数据：
              ${JSON.stringify(currentDeals)}
              
              用户的需求是：${userQuery}
              
              请根据用户需求，从数据中挑选最合适的1-2个方案，并给出专业的分析建议（包括为什么划算、注意事项等）。
              请用中文回答，语气亲切专业。`
            }
          ]
        }
      ],
      config: {
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，AI 助手暂时无法提供建议，请稍后再试。";
  }
}


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateGoodNightWish = async (name: string = "Chị Vân"): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Hãy viết một lời chúc ngủ ngon thật ngọt ngào, tinh tế, và đầy cảm xúc dành cho một người chị tên là '${name}'. 
      Lời chúc nên mang phong cách thơ mộng, nhắc đến ánh trăng, các vì sao và sự bình yên sau một ngày làm việc mệt mỏi. 
      Đừng quá dài, khoảng 3-4 câu. Chỉ trả lời nội dung lời chúc, không thêm text thừa.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });

    return response.text || "Chúc chị Vân ngủ thật ngon, có những giấc mơ đẹp và thức dậy với thật nhiều năng lượng vào ngày mai nhé!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Chúc chị Vân ngủ thật ngon, vạn dặm bình yên trong những giấc mơ hồng!";
  }
};

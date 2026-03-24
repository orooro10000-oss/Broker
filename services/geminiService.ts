import { GoogleGenAI } from "@google/genai";
import { RentalData } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
أنت مساعد ذكي ومحترف لسمسار عقاري (وسيط) في المغرب.
دورك: كتابة رسالة رد عبر واتساب لزبون مهتم بكراء شقة.

المواصفات المطلوبة في الرد:
1. **اللهجة:** دارجة مغربية مهذبة جداً واحترافية (Professional & Polite).
2. **الشكل:** منظم في فقرات قصيرة مع استخدام الإيموجي المناسب بشكل معتدل.
3. **المحتوى:**
   - ابدأ بترحيب حار ومحترم.
   - ذكر حالة التوفر بوضوح.
   - ذكر التفاصيل المالية وشروط الحجز بوضوح لتفادي سوء الفهم.
   - ذكر 3 نقاط قوة للشقة (Amenities) بشكل مغري.
   - اختم بسؤال مفتوح ومهذب يشجع الزبون على تأكيد الحجز.
4. **تنبيه:** لا تذكر العنوان الدقيق للشقة في الرسالة الأولية.

الهدف: إقناع الزبون بالاحترافية والشفافية.
`;

export const generateWhatsAppReply = async (data: RentalData): Promise<string> => {
  const availabilityLine = data.availability === 'available' ? "✅ الشقة متوفرة فالتواريخ لي طلبتي." : "❌ للأسف، الشقة محجوزة فهاذ التواريخ.";
  
  const clientTypeMap: Record<string, string> = {
    family: "عائلة",
    couple: "زوجين",
    mixed: "مجموعة مختلطة",
    singles: "شباب"
  };

  const userPrompt = `
معلومات الطلب:
- الحالة: ${availabilityLine}
- المدينة/الحي: ${data.city} (${data.landmark})
- المدة: من ${data.checkInDate} (${data.checkInTime}) إلى ${data.checkOutDate} (${data.checkOutTime})
- الزبون: ${clientTypeMap[data.clientType] || data.clientType} (${data.guests} أشخاص)
- تفاصيل الشقة: ${data.roomsSetup}
- المزايا: ${data.amenities}
- السعر: ${data.pricePerNight} درهم/ليلة
- الضمان/العربون: ${data.depositPolicy}
- القواعد: ${data.rules}

${data.availability === 'unavailable' ? `اقتراح بديل: ${data.alternativeOffer}` : ''}

قم بصياغة رسالة واتساب واحدة، جاهزة للنسخ والإرسال.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { 
          role: "user", 
          parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${userPrompt}` }] 
        }
      ]
    });

    return response.text || "عذراً، وقع خطأ بسيط. المرجو المحاولة مرة أخرى.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("فشل الاتصال بالخدمة. تأكد من الإنترنت وحاول مجدداً.");
  }
};
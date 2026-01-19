
import { GoogleGenAI, Type } from "@google/genai";
import { ToolType, AnalysisResult, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const analyzeContent = async (tool: ToolType, input: string, lang: Language): Promise<AnalysisResult> => {
  const modelName = 'gemini-3-flash-preview';
  const targetLang = lang === 'ar' ? 'Arabic' : 'English';
  
  let systemInstruction = "";
  let responseSchema: any = {
    type: Type.OBJECT,
    properties: {
      status: { type: Type.STRING, description: "Must be 'safe', 'warning', or 'danger'." },
      judgment: { type: Type.STRING, description: `A short conclusive verdict in ${targetLang}.` },
      confidence: { type: Type.NUMBER, description: "Numerical percentage from 0 to 100." },
      explanation: { type: Type.STRING, description: `Detailed analysis report in ${targetLang}. Use bullet points and clear sections.` },
      sources: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: { title: { type: Type.STRING }, uri: { type: Type.STRING } }
        }
      }
    },
    required: ["status", "judgment", "confidence", "explanation"]
  };

  if (tool === ToolType.FAKE_NEWS) {
    systemInstruction = `Professional Fact-Checker Persona. Verify news, social media posts, or URLs using Google Search grounding. 
    Analyze the context and credibility. Provide findings in ${targetLang}. 
    Focus on truth and misinformation. List references where possible.`;
  } else if (tool === ToolType.MALWARE) {
    systemInstruction = `Cybersecurity Specialist Persona. Scan code snippets, text-based scripts, or software URLs for malicious patterns, viruses, or security vulnerabilities. 
    Provide technical safety findings in ${targetLang}. Focus on software safety.`;
  } else if (tool === ToolType.DEEPFAKE) {
    systemInstruction = `Digital Forensics Expert Persona. Detect AI-generated manipulation in media based on the provided text description or URL content. 
    Provide forensic analysis results in ${targetLang}. Focus on visual/auditory authenticity indicators.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Perform specialized ${tool} analysis on the following input: ${input}`,
      config: {
        systemInstruction,
        tools: tool === ToolType.FAKE_NEWS ? [{ googleSearch: {} }] : undefined,
        responseMimeType: "application/json",
        responseSchema
      }
    });

    const result = JSON.parse(response.text || "{}");
    result.tool = tool;

    if (tool === ToolType.FAKE_NEWS && response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
       const chunks = response.candidates[0].groundingMetadata.groundingChunks;
       const searchSources = chunks.map((c: any) => ({
         title: c.web?.title || (lang === 'ar' ? 'مصدر خارجي' : 'External Source'),
         uri: c.web?.uri || '#'
       })).filter((s: any) => s.uri !== '#' && s.uri !== '');
       result.sources = [...(result.sources || []), ...searchSources];
    }

    return result as AnalysisResult;
  } catch (error) {
    console.error("Specialized Analysis Failed:", error);
    throw error;
  }
};

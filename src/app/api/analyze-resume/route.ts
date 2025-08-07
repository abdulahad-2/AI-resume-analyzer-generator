import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this resume and provide detailed feedback. Please format your response exactly as follows:

Strengths:
- [List 3-5 key strengths from the resume]

Weaknesses:
- [List 3-5 areas that need improvement]

Suggestions:
- [List 3-5 specific actionable recommendations]

Improved Resume:
[Provide a complete, enhanced version of the resume with better formatting, stronger action words, quantified achievements, and professional improvements. Keep the same basic information but make it more compelling and ATS-friendly]

Here is the resume to analyze:
${resumeText}`;

    const result = await model.generateContent(prompt);
    const aiResponseContent = result.response.text();

    // Parse the AI response into structured feedback
    const sections = aiResponseContent.split(/\n\n(?=Strengths:|Weaknesses:|Suggestions:|Improved Resume:)/);
    
    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let suggestions: string[] = [];
    let improvedResume = "";

    for (const section of sections) {
      if (section.startsWith("Strengths:")) {
        strengths = section
          .replace("Strengths:", "")
          .split("\n")
          .filter(line => line.trim().startsWith("-"))
          .map(line => line.replace(/^-\s*/, "").trim())
          .filter(item => item.length > 0);
      } else if (section.startsWith("Weaknesses:")) {
        weaknesses = section
          .replace("Weaknesses:", "")
          .split("\n")
          .filter(line => line.trim().startsWith("-"))
          .map(line => line.replace(/^-\s*/, "").trim())
          .filter(item => item.length > 0);
      } else if (section.startsWith("Suggestions:")) {
        suggestions = section
          .replace("Suggestions:", "")
          .split("\n")
          .filter(line => line.trim().startsWith("-"))
          .map(line => line.replace(/^-\s*/, "").trim())
          .filter(item => item.length > 0);
      } else if (section.startsWith("Improved Resume:")) {
        improvedResume = section
          .replace("Improved Resume:", "")
          .trim();
      }
    }

    // Fallback parsing if the above doesn't work well
    if (strengths.length === 0 || weaknesses.length === 0 || suggestions.length === 0) {
      // Try alternative parsing method
      const strengthsMatch = aiResponseContent.match(/Strengths:\s*((?:\s*-.*\n?)*)/i);
      const weaknessesMatch = aiResponseContent.match(/Weaknesses:\s*((?:\s*-.*\n?)*)/i);
      const suggestionsMatch = aiResponseContent.match(/Suggestions:\s*((?:\s*-.*\n?)*)/i);
      const improvedMatch = aiResponseContent.match(/Improved Resume:\s*([\s\S]*?)$/i);

      if (strengthsMatch) {
        strengths = strengthsMatch[1].split('\n')
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.replace(/^-\s*/, '').trim())
          .filter(item => item.length > 0);
      }

      if (weaknessesMatch) {
        weaknesses = weaknessesMatch[1].split('\n')
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.replace(/^-\s*/, '').trim())
          .filter(item => item.length > 0);
      }

      if (suggestionsMatch) {
        suggestions = suggestionsMatch[1].split('\n')
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.replace(/^-\s*/, '').trim())
          .filter(item => item.length > 0);
      }

      if (improvedMatch) {
        improvedResume = improvedMatch[1].trim();
      }
    }

    // Final fallback - provide default values if parsing completely fails
    if (strengths.length === 0) {
      strengths = ["Professional experience clearly outlined", "Technical skills are relevant", "Educational background is appropriate"];
    }
    if (weaknesses.length === 0) {
      weaknesses = ["Could benefit from more quantified achievements", "Missing some industry keywords", "Formatting could be improved"];
    }
    if (suggestions.length === 0) {
      suggestions = ["Add specific metrics and numbers to achievements", "Include relevant certifications", "Optimize for applicant tracking systems"];
    }
    if (!improvedResume) {
      improvedResume = aiResponseContent; // Use the full AI response as fallback
    }

    console.log("AI Analysis completed successfully");

    return NextResponse.json(
      { strengths, weaknesses, suggestions, improvedResume },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error in Gemini API route:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: errorMessage,
        // Provide fallback data so the frontend doesn't break
        strengths: ["Unable to analyze strengths due to API error"],
        weaknesses: ["Unable to analyze weaknesses due to API error"], 
        suggestions: ["Please try uploading your resume again"],
        improvedResume: "Error occurred during resume enhancement. Please try again."
      },
      { status: 500 }
    );
  }
}
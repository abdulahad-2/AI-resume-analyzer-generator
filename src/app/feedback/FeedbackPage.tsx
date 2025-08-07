"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle, AlertTriangle, Lightbulb, FileText, Download, ArrowRight, Star, Target, Zap
} from "lucide-react";

const FeedbackPage = () => {
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState<{
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    improvedResume: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const strengths = searchParams.get("strengths");
    const weaknesses = searchParams.get("weaknesses");
    const suggestions = searchParams.get("suggestions");
    const improvedResume = searchParams.get("improvedResume");

    if (strengths && weaknesses && suggestions && improvedResume) {
      setFeedback({
        strengths: JSON.parse(strengths),
        weaknesses: JSON.parse(weaknesses),
        suggestions: JSON.parse(suggestions),
        improvedResume: improvedResume,
      });
    } else {
      setFeedback({
        strengths: ["Strong technical background", "Clear project descriptions", "Good use of metrics"],
        weaknesses: ["Lack of leadership examples", "Missing soft skills", "Limited industry keywords"],
        suggestions: ["Add quantified achievements", "Include relevant certifications", "Improve formatting consistency"],
        improvedResume: `JOHN SMITH
Senior Software Engineer

📧 john.smith@email.com | 📱 (555) 123-4567 | 🏢 San Francisco, CA
💼 LinkedIn: linkedin.com/in/johnsmith | 🌐 Portfolio: johnsmith.dev

PROFESSIONAL SUMMARY
════════════════════════════════════════════════════════════════
Results-driven Senior Software Engineer with 8+ years of experience developing scalable web applications and leading cross-functional teams. Proven track record of increasing system performance by 40% and reducing deployment time by 60% through innovative solutions and best practices.

CORE COMPETENCIES
════════════════════════════════════════════════════════════════
• Languages: JavaScript, TypeScript, Python, Java, Go
• Frontend: React, Vue.js, Angular, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Django, Spring Boot, Express.js
• Databases: PostgreSQL, MongoDB, Redis, MySQL
• Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes
• Tools: Git, Jenkins, Jira, Figma

PROFESSIONAL EXPERIENCE
════════════════════════════════════════════════════════════════

SENIOR SOFTWARE ENGINEER | TechCorp Solutions | 2021 - Present
• Led development of microservices architecture serving 2M+ daily users
• Implemented automated testing pipeline, reducing bugs by 45%
• Mentored 5 junior developers and conducted technical interviews
• Optimized database queries, improving response time by 35%

SOFTWARE ENGINEER | InnovateTech | 2019 - 2021
• Developed responsive web applications using React and Node.js
• Collaborated with UX team to improve user engagement by 28%
• Built RESTful APIs handling 500K+ requests daily
• Integrated third-party payment systems (Stripe, PayPal)

JUNIOR DEVELOPER | StartupXYZ | 2017 - 2019
• Built e-commerce platform features using Django and PostgreSQL
• Participated in agile development cycles and code reviews
• Implemented responsive UI components, increasing mobile traffic by 20%

EDUCATION
════════════════════════════════════════════════════════════════
Bachelor of Science in Computer Science
University of California, Berkeley | 2017
GPA: 3.8/4.0

CERTIFICATIONS & ACHIEVEMENTS
════════════════════════════════════════════════════════════════
• AWS Certified Solutions Architect (2023)
• Google Cloud Professional Developer (2022)
• Speaker at React Conference 2023
• Hackathon Winner - Best Innovation Award (2022)`,
      });
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Analyzing your feedback...</p>
        </div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl text-white">Feedback not found.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="h-10 w-10 text-purple-400" />
              <h1 className="text-5xl font-bold text-white">
                AI Resume Analysis
              </h1>
            </div>
            <p className="text-purple-200 text-lg">
              Professional feedback to enhance your career prospects
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Enhanced Resume Preview */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="p-8" style={{ fontFamily: 'Georgia, serif', minHeight: 400 }}>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300 uppercase tracking-wide">
                  AI-Enhanced Resume Preview
                </h2>
                <pre
                  className="whitespace-pre-wrap text-slate-800"
                  style={{ fontFamily: 'Georgia, serif', fontSize: "1.1rem" }}
                >
                  {feedback.improvedResume}
                </pre>
              </div>
            </div>
          </div>

          {/* Right Column - Feedback Sections */}
          <div className="space-y-6">
            {/* Strengths Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-green-400/30 shadow-2xl">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-white" />
                  <h2 className="text-lg font-bold text-white">Strengths</h2>
                  <Star className="h-4 w-4 text-yellow-300" />
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {feedback.strengths.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 bg-green-500/10 rounded-lg p-2 border-l-4 border-green-400">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weaknesses Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-red-400/30 shadow-2xl">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-t-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-white" />
                  <h2 className="text-lg font-bold text-white">Areas to Improve</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {feedback.weaknesses.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 bg-red-500/10 rounded-lg p-2 border-l-4 border-red-400">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-blue-400/30 shadow-2xl">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-white" />
                  <h2 className="text-lg font-bold text-white">Smart Suggestions</h2>
                  <Zap className="h-4 w-4 text-yellow-300" />
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {feedback.suggestions.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 bg-blue-500/10 rounded-lg p-2 border-l-4 border-blue-400">
                      <Lightbulb className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Call-to-Action Button */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-purple-400/30 shadow-2xl p-6">
              <button
                onClick={() =>
                  (window.location.href = `/generated?resume=${encodeURIComponent(
                    feedback.improvedResume
                  )}`)
                }
                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl border border-purple-400/30 flex items-center justify-center gap-3 group"
              >
                <Download className="h-6 w-6 group-hover:animate-bounce" />
                Generate Professional Resume
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-purple-200 text-center mt-3 text-sm">
                Get your enhanced resume in professional format
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <CheckCircle className="h-10 w-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg">Strengths Identified</h3>
            <p className="text-purple-200 text-3xl font-bold mt-2">{feedback.strengths.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <Target className="h-10 w-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg">Areas to Improve</h3>
            <p className="text-purple-200 text-3xl font-bold mt-2">{feedback.weaknesses.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <Lightbulb className="h-10 w-10 text-blue-400 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg">Smart Suggestions</h3>
            <p className="text-purple-200 text-3xl font-bold mt-2">{feedback.suggestions.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
"use client";
import React, { useState } from "react";
import { Upload, FileText, Zap, Brain, CheckCircle } from "lucide-react";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("Analyzing your resume...");

        // Send the parsed text for AI analysis
        const analyzeRes = await fetch("/api/analyze-resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeText: result.resumeText }),
        });

        if (analyzeRes.ok) {
          const feedback = await analyzeRes.json();
          // Redirect to feedback page with the analysis results
          const params = new URLSearchParams({
            strengths: JSON.stringify(feedback.strengths),
            weaknesses: JSON.stringify(feedback.weaknesses),
            suggestions: JSON.stringify(feedback.suggestions),
            improvedResume: feedback.improvedResume,
          });
          window.location.href = `/feedback?${params.toString()}`;
        } else {
          setStatus(
            "Failed to analyze resume: " + (await analyzeRes.json()).error
          );
        }
      } else {
        setStatus("Upload failed: " + result.error);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setStatus("Upload failed: " + errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Brain className="w-16 h-16 text-blue-400 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
            AI Resume Analyzer
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Upload your resume and let our advanced AI provide intelligent insights and improvements
          </p>
        </div>

        {/* Main upload card */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            {/* Upload area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                isDragOver
                  ? 'border-blue-400 bg-blue-500/10'
                  : 'border-slate-600 hover:border-blue-500 hover:bg-blue-500/5'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              
              <div className="text-center">
                <div className="mx-auto mb-4">
                  {file ? (
                    <div className="flex items-center justify-center">
                      <FileText className="w-16 h-16 text-green-400" />
                      <CheckCircle className="w-6 h-6 text-green-400 -ml-2 -mt-8" />
                    </div>
                  ) : (
                    <Upload className="w-16 h-16 text-slate-400 mx-auto animate-bounce" />
                  )}
                </div>
                
                {file ? (
                  <div className="space-y-2">
                    <p className="text-green-400 font-semibold">File selected:</p>
                    <p className="text-slate-300 font-mono text-sm bg-slate-700/50 px-3 py-1 rounded-lg inline-block">
                      {file.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-slate-200">
                      Drop your resume here
                    </p>
                    <p className="text-slate-400">
                      or click to browse files
                    </p>
                    <p className="text-sm text-slate-500">
                      Supports PDF, DOC, DOCX, TXT formats
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={handleUpload}
              disabled={!file || status.includes("...")}
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {status.includes("...") ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Analyze with AI
                </>
              )}
            </button>

            {/* Status display */}
            {status && (
              <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex items-center gap-2">
                  {status.includes("...") && (
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <p className="text-slate-200 font-medium">Status: {status}</p>
                </div>
              </div>
            )}
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-4 mt-8 text-center">
            {[
              { icon: Brain, title: "AI-Powered", desc: "Advanced machine learning analysis" },
              { icon: Zap, title: "Instant Results", desc: "Get feedback in seconds" },
              { icon: CheckCircle, title: "Actionable Tips", desc: "Concrete improvement suggestions" }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4">
                <feature.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-slate-200 font-semibold">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(147, 197, 253, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
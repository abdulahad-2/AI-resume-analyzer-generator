"use client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FileText, Download } from "lucide-react";

// --- Types ---
type ResumeData = {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  location?: string;
  summary?: string;
  rawText: string;
};

// --- Helper: Very basic parser for name/email/phone/linkedin/location ---
function parseImprovedResume(resumeText: string): ResumeData {
  const lines = resumeText.split("\n").map((l) => l.trim());
  let name = "";
  let email = "";
  let phone = "";
  let linkedin = "";
  let location = "";

  // Name (first non-empty line, remove ** if present)
  let i = 0;
  while (i < lines.length && !lines[i]) i++;
  name = lines[i]?.replace(/\*\*/g, "") || "";

  // Contact info (next line)
  i++;
  if (i < lines.length) {
    const contactLine = lines[i];
    const emailMatch = contactLine.match(
      /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
    );
    const phoneMatch = contactLine.match(/(\+?\d[\d\s\-()]{7,})/);
    const linkedinMatch = contactLine.match(/linkedin\.com\/[^\s|]+/i);
    email = emailMatch ? emailMatch[1] : "";
    phone = phoneMatch ? phoneMatch[1] : "";
    linkedin = linkedinMatch ? linkedinMatch[0] : "";
    // If you have a portfolio or location, extract here
    const locMatch = contactLine.match(/([A-Za-z\s]+,\s*[A-Za-z\s]+)/);
    location = locMatch ? locMatch[1] : "";
  }

  return {
    name,
    email,
    phone,
    linkedin,
    location,
    rawText: resumeText,
  };
}

const GeneratedResumePage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  // Parse resume from query param, with URI error handling
  useEffect(() => {
    const resumeText = searchParams.get("resume");
    if (resumeText) {
      try {
        setResumeData(parseImprovedResume(decodeURIComponent(resumeText)));
      } catch {
        setResumeData(parseImprovedResume(resumeText));
      }
    }
  }, [searchParams]);

  const handleDownload = async (format: "pdf" | "docx") => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    try {
      if (format === "pdf") {
        const element = resumeRef.current;
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(
          `${(resumeData?.name || "Resume").replace(/\s+/g, "_")}_Resume.pdf`
        );
      } else {
        // DOCX Generation (just puts the raw text in the doc)
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: [
                new Paragraph({
                  text: resumeData?.name || "Resume",
                  heading: HeadingLevel.HEADING_1,
                  alignment: "center",
                }),
                new Paragraph({ text: "" }),
                new Paragraph({
                  text: resumeData?.rawText || "",
                }),
              ],
            },
          ],
        });

        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${
          (resumeData?.name || "Resume").replace(/\s+/g, "_")
        }_Resume.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch {
      alert("Error generating file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!resumeData) {
    return <div className="p-8 text-center">Loading resume...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-800 border-b border-purple-500 shadow-lg min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-full sm:max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
                Your Professional Resume
              </h1>
              <p className="text-black-100 text-sm sm:text-base">
                Ready to download in multiple formats
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleDownload("docx")}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                <FileText size={18} />
                {isDownloading ? "Preparing..." : "Download DOCX"}
              </button>
              <button
                onClick={() => handleDownload("pdf")}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                <Download size={18} />
                {isDownloading ? "Preparing..." : "Download PDF"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full sm:max-w-5xl mx-auto px-2 sm:px-6 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
          {/* Resume Content */}
          <div
            ref={resumeRef}
            className="resume-content p-3 sm:p-6 md:p-12"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              minHeight: "400px",
            }}
          >
            {/* Name and contact */}
            <div className="text-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-slate-200">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2 sm:mb-4 tracking-tight">
                {resumeData.name}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-6 text-slate-600">
                {resumeData.email && (
                  <span className="text-xs sm:text-sm">{resumeData.email}</span>
                )}
                {resumeData.phone && (
                  <span className="text-xs sm:text-sm">{resumeData.phone}</span>
                )}
                {resumeData.linkedin && (
                  <span className="text-xs sm:text-sm">{resumeData.linkedin}</span>
                )}
                {resumeData.location && (
                  <span className="text-xs sm:text-sm">{resumeData.location}</span>
                )}
              </div>
            </div>

            {/* Render the full AI resume as preformatted text */}
            <div
              className="prose max-w-none text-slate-800 text-sm sm:text-base"
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: "1.05rem",
                minHeight: "300px",
              }}
            >
              {resumeData.rawText}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bg-gradient-to-r from-slate-800 to-purple-900 px-3 sm:px-8 md:px-12 py-4 sm:py-6 border-t border-purple-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <p className="text-purple-200 font-medium text-sm sm:text-base">
                  Professional resume ready for download
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleDownload("docx")}
                  disabled={isDownloading}
                  className="flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  <FileText size={16} />
                  DOCX Format
                </button>
                <button
                  onClick={() => handleDownload("pdf")}
                  disabled={isDownloading}
                  className="flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  <Download size={16} />
                  PDF Format
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedResumePage;
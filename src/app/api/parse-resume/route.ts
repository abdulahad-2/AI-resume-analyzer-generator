import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { extractText, getDocumentProxy } from "unpdf";
import mammoth from "mammoth";

export const config = {
  api: {
    bodyParser: false, // This is explicitly for Pages Router, but good to keep it for clarity if needed
  },
};

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File | null;

    if (!resumeFile) {
      return NextResponse.json(
        { error: "No resume file uploaded" },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());
    const fileExtension = path.extname(resumeFile.name || "").toLowerCase();
    let resumeText = "";

    switch (fileExtension) {
      case ".pdf": {
        const pdf = await getDocumentProxy(new Uint8Array(fileBuffer));
        const { text } = await extractText(pdf, { mergePages: true });
        resumeText = text;
        break;
      }
      case ".docx": {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        resumeText = result.value;
        break;
      }
      case ".txt": {
        resumeText = fileBuffer.toString("utf-8");
        break;
      }
      default:
        return NextResponse.json(
          { error: "Unsupported file type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ resumeText }, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as { message?: string }).message || errorMessage;
    }
    console.error("Error:", errorMessage);
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}

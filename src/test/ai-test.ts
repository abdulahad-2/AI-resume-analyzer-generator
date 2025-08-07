import OpenAI from "openai";

const sampleResume = `
John Doe
Software Developer
email@example.com

Experience
- Worked on web development projects
- Helped team with coding
- Did bug fixes
- Used React and Node.js

Education
Bachelor in Computer Science
University of Example, 2020

Skills
JavaScript, React, Node.js
`;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testResumeImprovement() {
  try {
    // First Analysis
    const analysis = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume analyzer. Analyze this resume and provide specific improvements needed.",
        },
        {
          role: "user",
          content: `Analyze this resume and list specific problems:\n\n${sampleResume}`,
        },
      ],
    });

    console.log("=== Resume Analysis ===");
    console.log(analysis.choices[0].message.content);

    // Generate Improved Version
    const improvement = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert resume improver. Improve this resume by:
          1. Adding strong action verbs
          2. Quantifying achievements
          3. Highlighting specific technical skills
          4. Improving formatting
          5. Making achievements more impactful`,
        },
        {
          role: "user",
          content: `Improve this resume:\n\n${sampleResume}`,
        },
      ],
    });

    console.log("\n=== Improved Resume ===");
    console.log(improvement.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the test
testResumeImprovement();

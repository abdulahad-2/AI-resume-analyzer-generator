# 🚀 AI Resume Analyzer & Generator

<div align="center">

![AI Resume Analyzer](https://img.shields.io/badge/AI-Resume%20Analyzer-blue?style=for-the-badge&logo=artificial-intelligence)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Transform your resume with AI-powered insights and analysis**

[🌐 Live Demo](https://ai-resume-analyzer-generator.vercel.app) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing) • [🐛 Issues](https://github.com/abdulahad-2/AI-resume-analyzer-generator/issues)

</div>

---

## 🎯 Overview

AI Resume Analyzer & Generator is a cutting-edge web application that leverages artificial intelligence to analyze resumes, provide actionable feedback, and help job seekers optimize their applications. Built with modern web technologies, it offers instant analysis with professional recommendations.

### ✨ Key Features

🔍 **Smart Analysis** - Advanced AI algorithms analyze resume content, structure, and formatting  
⚡ **Instant Feedback** - Get comprehensive analysis results in seconds  
📄 **Multi-Format Support** - Upload PDF, DOC, DOCX, or TXT files  
🎯 **ATS Optimization** - Ensure your resume passes Applicant Tracking Systems  
💡 **Actionable Insights** - Receive specific, implementable improvement suggestions  
📊 **Detailed Scoring** - Get scored feedback on various resume aspects  
🔧 **Resume Generation** - Create optimized resumes from scratch  
📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first CSS framework |
| **AI Integration** | OpenAI/Gemini API for resume analysis |
| **PDF Processing** | PDF parsing and text extraction |
| **Vercel** | Deployment and hosting |

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** or **pnpm** or **bun**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdulahad-2/AI-resume-analyzer-generator.git
   cd AI-resume-analyzer-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   # AI API Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME="AI Resume Analyzer"

   # Optional: Database (if using)
   DATABASE_URL=your_database_url_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
AI-resume-analyzer-generator/
├── 📁 app/                      # Next.js App Router
│   ├── 📁 api/                  # API routes
│   │   ├── analyze/             # Resume analysis endpoint
│   │   ├── upload/              # File upload endpoint
│   │   └── generate/            # Resume generation endpoint
│   ├── 📁 components/           # React components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── FileUpload.tsx       # File upload component
│   │   ├── AnalysisResult.tsx   # Analysis display component
│   │   └── ResumeGenerator.tsx  # Resume generation component
│   ├── 📁 lib/                  # Utility libraries
│   │   ├── ai-analyzer.ts       # AI analysis logic
│   │   ├── pdf-parser.ts        # PDF processing
│   │   ├── resume-generator.ts  # Resume generation logic
│   │   └── utils.ts             # Helper functions
│   ├── 📁 types/                # TypeScript type definitions
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── 📁 public/                   # Static assets
├── 📁 docs/                     # Documentation
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

## 🔧 API Endpoints

### `POST /api/analyze`
Analyzes uploaded resume content using AI.

**Request:**
```typescript
{
  resumeText: string;
  fileName: string;
  analysisType?: 'basic' | 'detailed' | 'ats';
}
```

**Response:**
```typescript
{
  success: boolean;
  analysis: {
    overallScore: number;           // 0-100
    sections: {
      contact: ScoreDetail;
      summary: ScoreDetail;
      experience: ScoreDetail;
      education: ScoreDetail;
      skills: ScoreDetail;
    };
    strengths: string[];
    improvements: string[];
    atsCompatibility: number;
    keywords: string[];
    suggestions: string[];
  };
}
```

### `POST /api/upload`
Handles file uploads and text extraction.

### `POST /api/generate`
Generates optimized resume content based on user input.

## 🎨 Features in Detail

### 📊 Comprehensive Analysis
- **Content Quality**: Evaluates writing quality, clarity, and impact
- **Structure Assessment**: Analyzes resume organization and flow
- **ATS Compatibility**: Checks formatting for Applicant Tracking Systems
- **Keyword Optimization**: Suggests industry-relevant keywords
- **Length Analysis**: Recommends optimal resume length

### 🔍 Smart Recommendations
- **Section-by-Section Feedback**: Detailed analysis of each resume section
- **Industry-Specific Tips**: Tailored advice based on target industry
- **Skills Gap Analysis**: Identifies missing skills for target roles
- **Achievement Enhancement**: Suggests quantifiable accomplishments
- **Format Optimization**: Recommendations for better visual appeal

### 🎯 AI-Powered Generation
- **Custom Templates**: Professional resume templates
- **Content Suggestions**: AI-generated content based on user input
- **Skills Matching**: Aligns skills with job requirements
- **Experience Optimization**: Enhances work experience descriptions

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Environment Variables on Vercel**
   Add these in your Vercel dashboard:
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_APP_URL`

### Alternative Deployment Options

<details>
<summary>Click to expand other deployment methods</summary>

#### Netlify
```bash
npm run build
# Deploy the 'out' folder to Netlify
```

#### AWS Amplify
```bash
amplify init
amplify add hosting
amplify publish
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

</details>

## 📚 Documentation

### Usage Guide

1. **Upload Resume**: Drag & drop or select your resume file
2. **Choose Analysis Type**: Select basic, detailed, or ATS-focused analysis
3. **Get Results**: Review comprehensive feedback and suggestions
4. **Implement Changes**: Apply recommended improvements
5. **Re-analyze**: Upload updated version to track progress

### Configuration

The app can be customized through environment variables and configuration files:

- **AI Model Settings**: Configure in `lib/ai-analyzer.ts`
- **UI Themes**: Modify `tailwind.config.js`
- **API Endpoints**: Customize in `app/api/` directory

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add some amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- ✅ Follow TypeScript best practices
- ✅ Use ESLint and Prettier for code formatting
- ✅ Write tests for new features
- ✅ Update documentation
- ✅ Ensure responsive design
- ✅ Follow semantic commit messages

## 🛡️ Security & Privacy

- 🔒 Files are processed securely and not stored permanently
- 🔐 API keys are properly secured with environment variables
- 🛡️ Input validation prevents malicious uploads
- 🚫 No personal data is retained after analysis

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Gemini](https://ai.google.dev/gemini-api/docs/api-key) for free api keys 
- [Vercel](https://vercel.com) for seamless deployment
- [Next.js](https://nextjs.org) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for beautiful styling
- All contributors and users who provide feedback

## 📞 Support & Contact

- 🌐 **Website**: [https://ai-resume-analyzer-generator.vercel.app](https://ai-resume-analyzer-generator.vercel.app)
- 📧 **Issues**: [GitHub Issues](https://github.com/abdulahad-2/AI-resume-analyzer-generator/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/abdulahad-2/AI-resume-analyzer-generator/discussions)

## 🗺️ Roadmap

- [ ] 🌍 Multi-language support
- [ ] 📱 Mobile app (React Native)
- [ ] 🔗 LinkedIn integration
- [ ] 📊 Advanced analytics dashboard
- [ ] 🤖 Multiple AI model support
- [ ] 🎨 Custom resume templates
- [ ] 📈 Job market insights
- [ ] 🔄 Resume version control
- [ ] 👥 Team/recruiter features
- [ ] 📤 Export to multiple formats

---

<div align="center">

**⭐ Star this repository if it helped you!**

Made with ❤️ by [Abdul Ahad](https://github.com/abdulahad-2)

</div>

import { NextResponse } from "next/server"

// TalGo platform information to provide context to the AI
const TALGO_CONTEXT = `
You are the AI assistant for TalGo, an internship platform that connects students with tech companies.

About TalGo:
- TalGo is a platform where "Interns Level Up, Companies Grow Up"
- We offer various tech internship programs including Software Development, AI & Machine Learning, Cloud Architecture, DevOps Engineering, Cybersecurity, Data Engineering, Mobile App Development, and Blockchain Development
- Each program runs for 10-16 weeks depending on the specialization

Our internship programs:

1. Full Stack Development (12 weeks)
 - Build modern web applications using React, Node.js, and cloud technologies
 - Weekly curriculum includes frontend, backend, database, and deployment topics
 - Mentors from companies like Tech Solutions Inc. and Web Innovations

2. AI & Machine Learning (16 weeks)
 - Learn to build and deploy AI models using PyTorch and TensorFlow
 - Weekly curriculum includes data preprocessing, model training, and deployment
 - Mentors from AI-focused companies

3. Cloud Architecture (14 weeks)
 - Master AWS, Azure, and GCP for modern cloud infrastructure
 - Weekly curriculum includes cloud services, infrastructure as code, and security
 - Mentors from cloud service providers

4. DevOps Engineering (12 weeks)
 - Learn CI/CD, containerization, and infrastructure automation
 - Weekly curriculum includes Docker, Kubernetes, and CI/CD pipelines
 - Mentors from DevOps-focused companies

5. Cybersecurity (14 weeks)
 - Master ethical hacking, security analysis, and threat prevention
 - Weekly curriculum includes network security, penetration testing, and security audits
 - Mentors from cybersecurity firms

6. Data Engineering (12 weeks)
 - Build data pipelines and infrastructure for big data processing
 - Weekly curriculum includes ETL processes, data warehousing, and data lakes
 - Mentors from data-driven companies

7. Mobile App Development (10 weeks)
 - Create cross-platform mobile apps using React Native and Flutter
 - Weekly curriculum includes UI/UX, state management, and app deployment
 - Mentors from mobile app development companies

8. Blockchain Development (12 weeks)
 - Build decentralized applications and smart contracts
 - Weekly curriculum includes blockchain fundamentals, smart contracts, and dApp development
 - Mentors from blockchain startups

Application process:
1. Students create a profile on TalGo
2. They browse available programs and apply
3. Companies review applications and schedule interviews
4. Selected students are matched with mentors
5. Internship begins with weekly tasks and feedback

Platform features:
- Dashboard: Overview of activities and stats
- Profile: User information and settings
- Chat: This conversation interface
- Users: Directory of platform users
- My Applications: Track internship applications
- Available Programs: Browse internship opportunities
- Payment Methods: Manage payment options
- Settings: Configure account preferences
- Contact Us: Get help and support

When answering questions, respond as if you are the official TalGo assistant with complete knowledge of our platform and programs.

IMPORTANT: You can use Markdown formatting in your responses. Use **bold** for emphasis, ## for headings, * for bullet points, etc. The chat interface will render your markdown properly.
`

// Simple rule-based response system as a fallback
function getFallbackResponse(question: string): string {
  // Convert question to lowercase for easier matching
  const q = question.toLowerCase()

  // Common greetings
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "👋 Hello! I'm your TalGo Assistant. How can I help you today?"
  }

  // Program information
  if (q.includes("program") || q.includes("internship") || q.includes("course")) {
    return `## Our Internship Programs

We offer several specialized tech internship programs:

* **Full Stack Development** (12 weeks)
* **AI & Machine Learning** (16 weeks)
* **Cloud Architecture** (14 weeks)
* **DevOps Engineering** (12 weeks)
* **Cybersecurity** (14 weeks)
* **Data Engineering** (12 weeks)
* **Mobile App Development** (10 weeks)
* **Blockchain Development** (12 weeks)

Would you like more details about any specific program?`
  }

  // Application process
  if (q.includes("apply") || q.includes("application") || q.includes("how to join")) {
    return `## Application Process

Our application process is straightforward:

1. Create a profile on TalGo
2. Browse available programs and apply
3. Companies review applications and schedule interviews
4. Selected students are matched with mentors
5. Internship begins with weekly tasks and feedback

Is there a specific part of the process you'd like to know more about?`
  }

  // Default response for unrecognized queries
  return `I'm currently operating in fallback mode. I can provide basic information about:

* Our internship programs
* Application process
* Program pricing
* Platform features

Please ask about one of these topics, or visit our help center for more detailed assistance.`
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { messages } = await req.json()

    // Get the latest user message
    const latestMessage = messages[messages.length - 1]

    if (!latestMessage || latestMessage.sender !== "user") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 })
    }

    // Always use the fallback response system for now
    // This ensures the chat functionality works while we resolve API issues
    const fallbackResponse = getFallbackResponse(latestMessage.content)

    return NextResponse.json({
      sender: "bot",
      content: fallbackResponse,
      timestamp: new Date().toISOString(),
      isApiLimited: true,
    })
  } catch (error: any) {
    console.error("Error in chat API:", error.message)

    // Return a more detailed error message for debugging
    return NextResponse.json(
      {
        sender: "bot",
        content: "Sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date().toISOString(),
        error: error.message, // Include error message for debugging
      },
      { status: 200 }, // Return 200 even for errors to prevent client-side error handling
    )
  }
}

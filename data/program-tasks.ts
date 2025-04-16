// Define the task type
export interface ProgramTask {
  id: number
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

// Define the program tasks
export const programTasks: Record<number, ProgramTask[]> = {
  // Full Stack Development
  1: [
    {
      id: 1,
      title: "Build a Responsive Landing Page",
      description:
        "Create a responsive landing page using HTML, CSS, and JavaScript that showcases a product or service.",
      duration: "1 week",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Develop a RESTful API",
      description: "Build a RESTful API using Node.js and Express that handles CRUD operations for a resource.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Create a Full-Stack Application",
      description:
        "Develop a full-stack application using React for the frontend and Node.js for the backend with database integration.",
      duration: "3 weeks",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Implement Authentication",
      description: "Add user authentication to your application using JWT or OAuth.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Deploy to Cloud",
      description: "Deploy your application to a cloud provider like AWS, Azure, or Vercel.",
      duration: "1 week",
      difficulty: "Intermediate",
    },
  ],

  // AI & Machine Learning
  2: [
    {
      id: 1,
      title: "Data Preprocessing",
      description: "Clean and preprocess a dataset for machine learning using pandas and numpy.",
      duration: "2 weeks",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Build a Classification Model",
      description: "Create a classification model using scikit-learn to predict outcomes based on features.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Implement a Neural Network",
      description: "Build and train a neural network using TensorFlow or PyTorch for image recognition.",
      duration: "3 weeks",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Natural Language Processing",
      description: "Develop a sentiment analysis model using NLP techniques.",
      duration: "2 weeks",
      difficulty: "Advanced",
    },
    {
      id: 5,
      title: "Deploy ML Model as API",
      description: "Create an API that serves predictions from your machine learning model.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
  ],

  // Cloud Architecture
  3: [
    {
      id: 1,
      title: "Set Up Cloud Infrastructure",
      description: "Create a basic cloud infrastructure using AWS, Azure, or GCP with proper security configurations.",
      duration: "2 weeks",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Implement Infrastructure as Code",
      description: "Use Terraform or CloudFormation to define and provision infrastructure.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Design Microservices Architecture",
      description: "Design and implement a microservices architecture for a scalable application.",
      duration: "3 weeks",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Set Up CI/CD Pipeline",
      description: "Create a continuous integration and deployment pipeline for a cloud application.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Implement Cloud Monitoring",
      description: "Set up monitoring and alerting for your cloud infrastructure.",
      duration: "1 week",
      difficulty: "Intermediate",
    },
  ],

  // DevOps Engineering
  4: [
    {
      id: 1,
      title: "Containerize an Application",
      description: "Create Docker containers for a multi-tier application.",
      duration: "1 week",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Set Up Kubernetes Cluster",
      description: "Deploy and manage a Kubernetes cluster for container orchestration.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Implement GitOps Workflow",
      description: "Set up a GitOps workflow using tools like ArgoCD or Flux.",
      duration: "2 weeks",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Create Monitoring Dashboard",
      description: "Implement a monitoring dashboard using Prometheus and Grafana.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Automate Infrastructure Testing",
      description: "Implement automated testing for infrastructure code.",
      duration: "1 week",
      difficulty: "Advanced",
    },
  ],

  // Cybersecurity
  5: [
    {
      id: 1,
      title: "Perform Security Assessment",
      description: "Conduct a security assessment of a web application and document findings.",
      duration: "2 weeks",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Implement Secure Authentication",
      description: "Add secure authentication mechanisms to an application, including MFA.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Conduct Penetration Testing",
      description: "Perform a penetration test on a system and create a detailed report.",
      duration: "3 weeks",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Set Up Security Monitoring",
      description: "Implement security monitoring and incident response procedures.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Secure Cloud Infrastructure",
      description: "Apply security best practices to cloud infrastructure.",
      duration: "1 week",
      difficulty: "Advanced",
    },
  ],

  // Data Engineering
  6: [
    {
      id: 1,
      title: "Build ETL Pipeline",
      description: "Create an ETL pipeline to extract, transform, and load data from various sources.",
      duration: "2 weeks",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Implement Data Warehouse",
      description: "Design and implement a data warehouse solution.",
      duration: "3 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Create Data Processing Framework",
      description: "Build a data processing framework using Apache Spark or similar technologies.",
      duration: "3 weeks",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Implement Data Quality Checks",
      description: "Add data quality validation to your data pipeline.",
      duration: "1 week",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Build Real-time Data Pipeline",
      description: "Create a real-time data processing pipeline using streaming technologies.",
      duration: "2 weeks",
      difficulty: "Advanced",
    },
  ],

  // Mobile App Development
  7: [
    {
      id: 1,
      title: "Design Mobile UI",
      description: "Create a user interface design for a mobile application.",
      duration: "1 week",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Develop Cross-platform App",
      description: "Build a cross-platform mobile app using React Native or Flutter.",
      duration: "3 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Implement State Management",
      description: "Add state management to your mobile app using Redux or similar libraries.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 4,
      title: "Add Offline Functionality",
      description: "Implement offline functionality and data synchronization.",
      duration: "2 weeks",
      difficulty: "Advanced",
    },
    {
      id: 5,
      title: "Publish to App Stores",
      description: "Prepare and publish your app to the Apple App Store and Google Play Store.",
      duration: "1 week",
      difficulty: "Beginner",
    },
  ],

  // Blockchain Development
  8: [
    {
      id: 1,
      title: "Create Smart Contract",
      description: "Develop and deploy a smart contract on a blockchain platform.",
      duration: "2 weeks",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Build dApp Frontend",
      description: "Create a frontend for interacting with your smart contract.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Implement Token Standard",
      description: "Create a token that implements a standard like ERC-20 or ERC-721.",
      duration: "2 weeks",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Add Wallet Integration",
      description: "Integrate cryptocurrency wallets into your application.",
      duration: "1 week",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Audit Smart Contract",
      description: "Perform a security audit of your smart contract.",
      duration: "2 weeks",
      difficulty: "Advanced",
    },
  ],

  // Computer Vision
  9: [
    {
      id: 1,
      title: "Image Processing Basics",
      description: "Implement basic image processing techniques using OpenCV.",
      duration: "2 weeks",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Object Detection",
      description: "Create an object detection system using deep learning.",
      duration: "3 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Image Segmentation",
      description: "Implement image segmentation algorithms for scene understanding.",
      duration: "2 weeks",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Face Recognition",
      description: "Build a face recognition system with real-time capabilities.",
      duration: "2 weeks",
      difficulty: "Advanced",
    },
    {
      id: 5,
      title: "Deploy Vision Model",
      description: "Deploy your computer vision model as a service.",
      duration: "1 week",
      difficulty: "Intermediate",
    },
  ],

  // Natural Language Processing
  10: [
    {
      id: 1,
      title: "Text Classification",
      description: "Build a text classification model for categorizing documents.",
      duration: "2 weeks",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Sentiment Analysis",
      description: "Create a sentiment analysis model for social media content.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Chatbot Development",
      description: "Develop a conversational chatbot using NLP techniques.",
      duration: "3 weeks",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Named Entity Recognition",
      description: "Implement a named entity recognition system.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Language Translation",
      description: "Build a language translation model using sequence-to-sequence learning.",
      duration: "3 weeks",
      difficulty: "Advanced",
    },
  ],

  // Backend Engineering
  11: [
    {
      id: 1,
      title: "API Development",
      description: "Create a RESTful API with proper documentation.",
      duration: "2 weeks",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Database Design",
      description: "Design and implement a database schema for a complex application.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Authentication System",
      description: "Build a secure authentication and authorization system.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 4,
      title: "Microservices Architecture",
      description: "Implement a microservices-based backend architecture.",
      duration: "3 weeks",
      difficulty: "Advanced",
    },
    {
      id: 5,
      title: "Performance Optimization",
      description: "Optimize backend performance and implement caching strategies.",
      duration: "2 weeks",
      difficulty: "Advanced",
    },
  ],

  // Frontend Engineering
  12: [
    {
      id: 1,
      title: "Responsive Web Design",
      description: "Create a responsive website using modern CSS techniques.",
      duration: "1 week",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Interactive UI Components",
      description: "Build reusable UI components with React or Vue.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "State Management",
      description: "Implement state management using Redux, Vuex, or similar libraries.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 4,
      title: "Frontend Testing",
      description: "Create a comprehensive test suite for a frontend application.",
      duration: "2 weeks",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Performance Optimization",
      description: "Optimize frontend performance and implement lazy loading.",
      duration: "1 week",
      difficulty: "Advanced",
    },
  ],
}

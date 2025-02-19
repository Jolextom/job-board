import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clientIds = [
  "0ca40e38-9b82-463a-8d71-256087bdda9d",
  "69083275-f0c2-45d2-a0c9-be104b06b675",
];

const sampleJobs = [
  {
    title: "Frontend Developer",
    description: "Looking for a React developer to build a company dashboard.",
    location: "Remote",
    salary: 60000,
  },
  {
    title: "Backend Developer",
    description: "Node.js developer needed to create RESTful APIs.",
    location: "New York, USA",
    salary: 80000,
  },
  {
    title: "UI/UX Designer",
    description: "Design a modern SaaS platform UI.",
    location: "London, UK",
    salary: 55000,
  },
  {
    title: "Full Stack Engineer",
    description: "Looking for someone skilled in both frontend and backend.",
    location: "San Francisco, USA",
    salary: 90000,
  },
  {
    title: "Mobile App Developer",
    description: "Flutter developer needed for an e-commerce app.",
    location: "Berlin, Germany",
    salary: 70000,
  },
  {
    title: "Data Scientist",
    description: "AI and machine learning engineer needed for analytics.",
    location: "Toronto, Canada",
    salary: 100000,
  },
  {
    title: "Cybersecurity Specialist",
    description: "Seeking an expert in penetration testing and security.",
    location: "Austin, USA",
    salary: 85000,
  },
  {
    title: "Cloud Engineer",
    description: "AWS and Azure specialist needed for migration project.",
    location: "Remote",
    salary: 95000,
  },
  {
    title: "DevOps Engineer",
    description: "CI/CD automation specialist needed.",
    location: "Amsterdam, Netherlands",
    salary: 78000,
  },
  {
    title: "Blockchain Developer",
    description: "Build smart contracts and DApps on Ethereum.",
    location: "Dubai, UAE",
    salary: 120000,
  },
  {
    title: "AI Researcher",
    description: "Work on cutting-edge AI models.",
    location: "Boston, USA",
    salary: 130000,
  },
  {
    title: "Game Developer",
    description: "Unity developer needed for an indie game project.",
    location: "Los Angeles, USA",
    salary: 60000,
  },
  {
    title: "Network Engineer",
    description: "Optimize and secure enterprise networks.",
    location: "Paris, France",
    salary: 75000,
  },
  {
    title: "Embedded Systems Engineer",
    description: "Work on IoT and hardware integration projects.",
    location: "Munich, Germany",
    salary: 80000,
  },
  {
    title: "Product Manager",
    description: "Oversee development of a B2B SaaS product.",
    location: "Remote",
    salary: 90000,
  },
  {
    title: "AR/VR Developer",
    description: "Develop immersive VR applications.",
    location: "San Diego, USA",
    salary: 110000,
  },
  {
    title: "Database Administrator",
    description: "Manage SQL and NoSQL databases.",
    location: "Chicago, USA",
    salary: 85000,
  },
  {
    title: "Technical Writer",
    description: "Create documentation for APIs and software tools.",
    location: "Remote",
    salary: 55000,
  },
  {
    title: "Marketing Specialist",
    description: "Digital marketing expert needed for a SaaS company.",
    location: "New York, USA",
    salary: 65000,
  },
];

async function seedJobs() {
  console.log("Seeding jobs...");

  for (let i = 0; i < sampleJobs.length; i++) {
    const job = sampleJobs[i];
    const clientId = clientIds[i % clientIds.length]; // Assigns jobs to clients alternately

    await prisma.job.create({
      data: {
        title: job.title,
        description: job.description,
        budget: job.salary,
        clientId: clientId,
      },
    });
  }

  console.log("✅ Jobs seeded successfully!");
}

seedJobs()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

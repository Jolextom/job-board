import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Clients
  const client1 = await prisma.user.upsert({
    where: { email: "jolextom@gmail.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "jolextom@gmail.com",
      password: "secret123", // Ensure to hash this in production!
      role: "CLIENT",
    },
  });

  // Create Freelancers
  const freelancer1 = await prisma.user.upsert({
    where: { email: "jolextom01@gmail.com" },
    update: {},
    create: {
      name: "Jane Smith",
      email: "jolextom01@gmail.com",
      password: "secret123", // Ensure to hash this in production!
      role: "FREELANCER",
    },
  });

  // Create Jobs
  const job1 = await prisma.job.create({
    data: {
      title: "Web Developer Needed",
      description:
        "Looking for an experienced developer to build a portfolio site.",
      budget: 1000,
      clientId: client1.id,
    },
  });

  const job2 = await prisma.job.create({
    data: {
      title: "Graphic Designer Wanted",
      description: "Need a logo and branding design for my startup.",
      budget: 500,
      clientId: client1.id,
    },
  });

  console.log("Database seeded successfully! ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

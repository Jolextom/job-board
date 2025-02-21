import { prisma } from "../utils/prisma"; // Ensure correct path

afterAll(async () => {
  await prisma.$disconnect(); // Ensure Prisma disconnects
});

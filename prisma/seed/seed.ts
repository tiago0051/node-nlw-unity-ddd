import { PrismaProvider } from "../../src/data/provider/prisma.provider";
const { prisma } = new PrismaProvider();

async function seed() {}

seed().then(async () => {
  console.log("Database seeded");
  await prisma.$disconnect();
});

// test-prisma.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cars = await prisma.car.findMany();
  console.log(cars);
}

main().finally(() => prisma.$disconnect());

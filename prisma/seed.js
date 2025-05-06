// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Loading example vehicles...');

  await prisma.car.createMany({
    data: [
      {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2021,
        price: 15000,
        imageUrl: 'https://example.com/corolla.jpg',
        vin: '1HGCM82633A000001',
        engineSerial: 'ENG123456001',
      },
      {
        brand: 'Ford',
        model: 'Focus',
        year: 2019,
        price: 12000,
        imageUrl: 'https://example.com/focus.jpg',
        vin: '1HGCM82633A000002',
        engineSerial: 'ENG123456002',
      },
      {
        brand: 'Chevrolet',
        model: 'Cruze',
        year: 2020,
        price: 13000,
        imageUrl: 'https://example.com/cruze.jpg',
        vin: '1HGCM82633A000003',
        engineSerial: 'ENG123456003',
      },
    ],
  });

  console.log('✅ Vehicles inserted correctly');
}

main()
  .catch((e) => {
    console.error('❌ Error during inserting:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
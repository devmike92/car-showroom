// routes/cars.js

async function carRoutes(fastify, options) {
  fastify.get('/cars', async (request, reply) => {
    const cars = await fastify.prisma.car.findMany();
    return cars;
  });

  fastify.post('/cars', async (request, reply) => {
    const { brand, model, year, price, imageUrl, vin, engineSerial } = request.body;

    const errors = [];

    if (!brand || typeof brand !== 'string' || brand.trim() === '') {
      errors.push('Invalid brand');
    }

    if (!model || typeof model !== 'string' || model.trim() === '') {
      errors.push('Invalid model');
    }

    const currentYear = new Date().getFullYear();
    if (!year || typeof year !== 'number' || year < 1920 || year > currentYear) {
      errors.push(`Invalid year (must be between 1920 and ${currentYear})`);
    }

    if (!price || typeof price !== 'number' || price <= 0) {
      errors.push('Invalid price');
    }

    if (!imageUrl || typeof imageUrl !== 'string' || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(imageUrl)) {
      errors.push('Invalid image URL (must be a valid HTTP image link)');
    }

    if (!vin || typeof vin !== 'string' || vin.trim().length < 8) {
      errors.push('Invalid VIN (must be at least 8 characters)');
    }

    if (!engineSerial || typeof engineSerial !== 'string' || engineSerial.trim().length < 4) {
      errors.push('Invalid engine serial (must be at least 4 characters)');
    }

    if (errors.length > 0) {
      return reply.code(400).send({ errors });
    }

    // Verifica duplicado por VIN o Engine Serial
    const duplicate = await fastify.prisma.car.findFirst({
      where: {
        OR: [
          { vin },
          { engineSerial }
        ]
      }
    });

    if (duplicate) {
      return reply.code(400).send({
        error: 'A car with the same VIN or engine serial already exists.'
      });
    }

    const newCar = await fastify.prisma.car.create({
      data: { brand, model, year, price, imageUrl, vin, engineSerial },
    });

    return reply.code(201).send(newCar);
  });
}

module.exports = carRoutes;

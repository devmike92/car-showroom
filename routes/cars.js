// routes/cars.js

async function carRoutes(fastify, options) {
    fastify.get('/cars', async (request, reply) => {
      const cars = await fastify.prisma.car.findMany();
      return cars;
    });
  
    fastify.post('/cars', async (request, reply) => {
      const { brand, model, year, price, imageUrl } = request.body;
  
      if (!brand || !model || !year || !price || !imageUrl) {
        return reply.code(400).send({ error: 'Datos incompletos' });
      }
  
      const newCar = await fastify.prisma.car.create({
        data: { brand, model, year, price, imageUrl },
      });
  
      return reply.code(201).send(newCar);
    });
  }
  
  module.exports = carRoutes;
  
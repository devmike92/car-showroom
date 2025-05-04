// index.js

const Fastify = require('fastify');
const cors = require('@fastify/cors');
const prismaPlugin = require('./plugins/prisma');
const carRoutes = require('./routes/cars');

const app = Fastify({ logger: true });

app.register(cors);             // CORS para conectar frontend luego
app.register(prismaPlugin);     // Plugin Prisma
app.register(carRoutes);        // Rutas

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('🚀 Servidor escuchando en http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

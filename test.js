const { PrismaClient } = require('@prisma/client');
const config = require('./prisma.config.ts').default;

console.log(config);

try {
  const prisma = new PrismaClient(config); // try passing config
  console.log("Success with config");
} catch (e) {
  console.log("Error with config", e.message);
}

try {
  const prisma2 = new PrismaClient({ log: ['query'] }); // try passing some valid option
  console.log("Success with log");
} catch (e) {
  console.log("Error with log", e.message);
}

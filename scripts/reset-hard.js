const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, '../prisma/showroom.db');
const migrationsPath = path.join(__dirname, '../prisma/migrations');

function resetHard() {
  console.log('Erasing DB and migrations...');

  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('DB erased...');
  }

  if (fs.existsSync(migrationsPath)) {
    fs.rmSync(migrationsPath, { recursive: true, force: true });
    console.log('Migration folder erased...');
  }

  console.log('Executing new migration...');
  try {
    execSync('npx prisma migrate dev --name fresh', { stdio: 'inherit' });
    console.log('Hard reset completed');
  } catch (err) {
    console.error('❌ Error executing migration:', err.message);
    process.exit(1);
  }
}

resetHard();

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../prisma/showroom.db');

function resetDB() {
  console.log(' Resetting DB...');

  // 1. Erase DB if exists
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('🗑️  File showroom.db erased');
  } else {
    console.log('📭 showroom.db not found, creating from scratch...');
  }

  // 2. Execute migration from scratch
  try {
    execSync('npx prisma migrate dev --name reset', { stdio: 'inherit' });
    console.log('Migration succesfully applied');
  } catch (error) {
    console.error('❌ Error applying migration:', error);
    process.exit(1);
  }
}

resetDB();

const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(process.cwd(), '.env') });

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing env var ${name}. Create a .env file (you can copy from .env.example).`
    );
  }
  return value;
}

function getEnv() {
  return {
    BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    SAUCE_USERNAME: requireEnv('SAUCE_USERNAME'),
    SAUCE_PASSWORD: requireEnv('SAUCE_PASSWORD')
  };
}

module.exports = { getEnv };

const getEnvVar = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

module.exports = getEnvVar; // Експорт функції для використання змінних середовища


import 'dotenv/config';
import initMongoConnection from './db/initMongoConnection.js';
import setupServer        from './server.js';

(async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.error('✖️ Failed to start app:', err);
    process.exit(1);
  }
})();

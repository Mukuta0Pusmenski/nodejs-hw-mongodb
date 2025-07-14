// test-email.js
import 'dotenv/config';
import emailService from './src/services/emailService.js';

(async () => {
  try {
    await emailService.sendResetEmail(
      'твоя_тестова_пошта@domain.com',
      'test-token-123'
    );
    console.log('✅ Email sent');
  } catch (err) {
    console.error('❌ Failed to send:', err);
  }
})();

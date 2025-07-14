import mongoose from 'mongoose';
import User from './src/models/user.js'; // шлях до вашої моделі

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findById('6874d4b1136392c530104e48');
  console.log('User from DB:', user);
  await mongoose.disconnect();
}

run().catch(console.error);

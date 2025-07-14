// test-smtp-conn.js
import net from 'net';
import 'dotenv/config';

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT);

const socket = net.createConnection({ host, port }, () => {
  console.log(`✅ Connected to ${host}:${port}`);
  socket.end();
});

socket.on('error', err => {
  console.error(`❌ Connection error to ${host}:${port}`, err.message);
});

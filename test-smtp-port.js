// test-smtp-port.js
import net from 'net';

const HOST = 'smtp.ukr.net';
const PORTS = [465, 587, 2525];

for (const port of PORTS) {
  const socket = new net.Socket();
  socket.setTimeout(5000);

  socket.on('connect', () => {
    console.log(`✅ Port ${port} is OPEN`);
    socket.destroy();
  });

  socket.on('timeout', () => {
    console.log(`❌ Port ${port} TIMED OUT`);
    socket.destroy();
  });

  socket.on('error', err => {
    console.log(`❌ Port ${port} ERROR: ${err.code}`);
  });

  socket.connect(port, HOST);
}

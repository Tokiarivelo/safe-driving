// server.js
// Chargez le module Passenger si présent
let passenger;
if (process.env.PHUSION_PASSENGER_ENABLED === 'true') {
  passenger = require('phusion_passenger');
  // Désactive l’auto-installation : on spécifie explicitement le serveur à écouter
  passenger.configure({ autoInstall: false });
}

const { createServer } = require('http');
const next = require('next');

const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Désactive le timeout natif de Node (0 = infinite)
    res.setTimeout(0);
    return handle(req, res);
  });

  if (passenger) {
    // Reverse port binding : Passenger injecte le socket Unix
    server.listen('passenger');
    console.log('✅ Listening via Passenger reverse port binding');
  } else {
    // Mode développement / PM2, Docker, etc.
    const port = process.env.PORT || 3000;
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});

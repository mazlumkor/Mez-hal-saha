import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';

// In-memory store for reservations (for demo purposes)
// In a real app, use a database like SQLite or MongoDB
interface Reservation {
  date: string;
  slot: string;
  userEmail?: string;
}

let reservations: Reservation[] = [];

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/reservations', (req, res) => {
    res.json(reservations);
  });

  app.post('/api/reserve', (req, res) => {
    const { date, slot, userEmail } = req.body;
    
    // Check if already reserved
    const exists = reservations.find(r => r.date === date && r.slot === slot);
    if (exists) {
      return res.status(400).json({ error: 'Bu saat zaten rezerve edilmiş.' });
    }

    const newReservation = { date, slot, userEmail };
    reservations.push(newReservation);

    // Broadcast update to all clients
    io.emit('reservation_update', reservations);

    // Mock email notification
    console.log(`[EMAIL NOTIFICATION] Yeni Rezervasyon: ${date} - ${slot} (${userEmail || 'Misafir'})`);

    res.json({ success: true, reservation: newReservation });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // WebSocket connection
  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('reservation_update', reservations);
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

startServer();

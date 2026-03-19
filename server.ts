import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';

// In-memory store for reservations and users
interface Reservation {
  date: string;
  slot: string;
  userEmail?: string;
  userName?: string;
}

interface User {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  teamName?: string;
}

let reservations: Reservation[] = [];
let users: User[] = [
  {
    email: 'admin@mezhalisaha.com',
    password: 'admin',
    name: 'Admin MEZ',
    role: 'admin'
  }
];

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

  // Auth Routes
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'E-posta veya şifre hatalı.' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token: 'mock-jwt-token' });
  });

  app.post('/api/register', (req, res) => {
    const { email, password, name, teamName, role = 'user' } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanımda.' });
    }

    const newUser: User = { email, password, name, teamName, role };
    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ user: userWithoutPassword, token: 'mock-jwt-token' });
  });

  // API Routes
  app.get('/api/reservations', (req, res) => {
    res.json(reservations);
  });

  app.post('/api/reserve', (req, res) => {
    const { date, slot, userEmail, userName } = req.body;
    
    const exists = reservations.find(r => r.date === date && r.slot === slot);
    if (exists) {
      return res.status(400).json({ error: 'Bu saat zaten rezerve edilmiş.' });
    }

    const newReservation = { date, slot, userEmail, userName };
    reservations.push(newReservation);

    io.emit('reservation_update', reservations);
    console.log(`[EMAIL NOTIFICATION] Yeni Rezervasyon: ${date} - ${slot} (${userName || userEmail || 'Misafir'})`);

    res.json({ success: true, reservation: newReservation });
  });

  // Admin Routes
  app.delete('/api/reservations/:date/:slot', (req, res) => {
    const { date, slot } = req.params;
    reservations = reservations.filter(r => !(r.date === date && r.slot === slot));
    io.emit('reservation_update', reservations);
    res.json({ success: true });
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

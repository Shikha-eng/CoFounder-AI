const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth');
const analysisRoutes = require('./routes/analysis');
const competitorRoutes = require('./routes/competitors');
const insightRoutes = require('./routes/insights');
const reportRoutes = require('./routes/reports');

// Middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/analyze', analysisRoutes);
app.use('/api/competitors', competitorRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/report', reportRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║    CoFoundr AI Backend Server         ║
║    Running on http://localhost:${PORT}  ║
║    Environment: ${process.env.NODE_ENV || 'development'}        ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;

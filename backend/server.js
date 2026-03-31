const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection and initialization
const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cofoundr-ai');
    console.log('✅ MongoDB connected');
    
    // Initialize dummy data
    const { initializeDummyData } = require('./initData');
    await initializeDummyData();
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    // Don't exit, let server run anyway
  }
};

// Initialize database
initializeDatabase();

// Routes
app.use('/api/ideas', require('./routes/ideas'));
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/competitors', require('./routes/competitors'));
app.use('/api/insights', require('./routes/insights'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

// Development: Reseed database
if (process.env.NODE_ENV !== 'production') {
  app.post('/api/dev/reseed', async (req, res) => {
    try {
      const User = require('./models/User');
      const Idea = require('./models/Idea');
      const { DUMMY_DATA } = require('./initData');

      // Clear existing data
      await User.deleteMany({});
      await Idea.deleteMany({});

      // Create users (password will be hashed by pre-save hook)
      const createdUsers = [];
      for (const userData of DUMMY_DATA.users) {
        const user = await User.create({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          company: userData.company,
          role: userData.role,
          tier: userData.tier,
          credits: userData.credits
        });
        createdUsers.push(user);
      }

      // Create ideas
      const ideas = [];
      for (let i = 0; i < DUMMY_DATA.ideas.length; i++) {
        const idea = await Idea.create({
          ...DUMMY_DATA.ideas[i],
          userId: createdUsers[i % createdUsers.length]._id
        });
        ideas.push(idea);
      }

      // Link ideas to users
      for (let i = 0; i < createdUsers.length; i++) {
        const userIdeas = ideas.filter((_, idx) => idx % createdUsers.length === i);
        await User.findByIdAndUpdate(
          createdUsers[i]._id,
          { $set: { ideas: userIdeas.map(idea => idea._id) } }
        );
      }

      res.json({
        success: true,
        message: 'Database reseeded successfully',
        usersCreated: createdUsers.length,
        ideasCreated: ideas.length,
        credentials: DUMMY_DATA.users.map(u => ({ email: u.email, password: u.password }))
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/api/`);
});

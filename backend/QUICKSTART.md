# Backend Quick Start Guide

## ✅ What's Been Created

A complete **Node.js/Express backend API** with:

- ✅ User Authentication (JWT)
- ✅ Startup Idea Management
- ✅ AI Analysis Engine
- ✅ Competitor Research
- ✅ Market Insights
- ✅ Report Generation
- ✅ CORS Configured
- ✅ Error Handling

## 📂 Backend Structure

```
backend/
├── controllers/          # Business logic (6 files)
├── models/              # Database schemas (2 files)
├── routes/              # API endpoints (6 files)
├── middleware/          # Auth middleware
├── server.js            # Main server entry
├── package.json         # Dependencies (all installed)
├── .env                 # Environment variables
└── BACKEND_README.md    # Full documentation
```

## 🚀 Running the Backend

### Option 1: With Local MongoDB (Recommended)

1. **Start MongoDB:**
   ```bash
   # On Windows, using MongoDB Community Edition
   net start MongoDB
   
   # Or if installed differently
   mongod
   ```

2. **Start backend:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Server runs at:** http://localhost:3001

### Option 2: With MongoDB Cloud (Atlas)

1. **Update `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cofoundr-ai
   ```

2. **Start backend:**
   ```bash
   npm run dev
   ```

### Option 3: Without MongoDB (Testing Only)

The API will start but won't persist data:

```bash
npm run dev
# API available at http://localhost:3001
# /api/health endpoint works without MongoDB
```

## 🔌 API Endpoints Ready

### Authentication
```
POST   /api/auth/register      - Register user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user
POST   /api/auth/logout        - Logout
POST   /api/auth/refresh       - Refresh token
```

### Ideas
```
POST   /api/ideas              - Create idea
GET    /api/ideas              - Get all ideas
GET    /api/ideas/:id          - Get single idea
PUT    /api/ideas/:id          - Update idea
DELETE /api/ideas/:id          - Delete idea
```

### Analysis
```
POST   /api/analyze            - Analyze startup idea
GET    /api/analyze/:ideaId    - Get analysis results
```

### Competitors
```
GET    /api/competitors/:ideaId        - Get competitors
GET    /api/competitors/category/:cat  - By category
```

### Insights
```
GET    /api/insights/:category  - Market insights
GET    /api/insights            - All market data
```

### Reports
```
POST   /api/reports/:ideaId         - Generate report
GET    /api/reports/:ideaId         - Get report
GET    /api/reports/:ideaId/export  - Export as PDF
```

### Health
```
GET    /api/health             - API status
```

## 📝 Quick API Test

### Test Health Endpoint (No Auth Required)
```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "API is running",
  "timestamp": "2026-03-31T..."
}
```

### Test Register
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Copy the returned `token` and use for authenticated endpoints:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/ideas
```

## 🗄️ Setting Up MongoDB

### Windows - MongoDB Community Edition

1. **Download:** https://www.mongodb.com/try/download/community
2. **Install** with default settings
3. **Start MongoDB:**
   ```bash
   net start MongoDB
   ```
4. **Verify:** MongoDB Compass (GUI) or `mongosh` command line

### MongoDB Atlas (Cloud) - Free

1. **Create account:** https://www.mongodb.com/cloud/atlas
2. **Create free cluster**
3. **Get connection string**
4. **Update `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cofoundr-ai
   ```

## 🔐 Environment Variables

In `.env` file:

| Variable | Value | Notes |
|----------|-------|-------|
| PORT | 3001 | Server port |
| MONGODB_URI | mongodb://localhost:27017/cofoundr-ai | Local or Atlas |
| JWT_SECRET | cofoundr-ai-secret-key-development | Change in production |
| FRONTEND_URL | http://localhost:5173 | Frontend CORS origin |
| NODE_ENV | development | development or production |

## 🔗 Frontend Integration

### Update Frontend API URL

In `frontend-react/.env.local`:

```env
VITE_API_URL=http://localhost:3001/api
```

Or in code:
```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:3001/api';
```

## 📊 Controllers Overview

### authController.js
- Register, Login, Get User, Logout, Refresh Token
- Uses JWT for authentication
- Password hashing with bcrypt

### ideaController.js
- Create, Read, Update, Delete ideas
- Filters by user ID
- Validates ownership

### analyzeController.js
- Analyzes startup idea
- Generates viability score
- Returns market insights
- Mock AI integration (ready for GPT-4)

### competitorController.js
- Fetches competitor data
- Groups by category
- Mock data included

### insightController.js
- Market insights data
- TAM, growth rate, trends
- Mock data for 3 categories

### reportController.js
- Generates comprehensive reports
- Includes timeline, risks, recommendations
- PDF export ready

## 🚀 Development Features

### Hot Reload
```bash
npm run dev
# Uses nodemon - restarts on file changes
```

### Production Build
```bash
npm start
# Runs without nodemon
```

## ⚙️ Connecting Backend to Frontend

### Step 1: Start Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:3001
```

### Step 2: Create API Service (Frontend)
```javascript
// src/services/api.js
const API_BASE = 'http://localhost:3001/api';

export const register = (data) => {
  return fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json());
};

export const analyzeIdea = (data, token) => {
  return fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(r => r.json());
};
```

### Step 3: Use in Components
```jsx
import { analyzeIdea } from '../services/api';

const handleAnalyze = async () => {
  const result = await analyzeIdea(ideaData, token);
  // Use result
};
```

## 🧪 Testing Workflow

1. **Test API with cURL/Postman:**
   ```bash
   # Register
   curl -X POST http://localhost:3001/api/auth/register ...
   
   # Get token from response
   
   # Test protected endpoint
   curl -H "Authorization: Bearer TOKEN" http://localhost:3001/api/ideas
   ```

2. **Test Frontend Integration:**
   - Frontend at http://localhost:5173
   - Backend at http://localhost:3001
   - APIs call backend
   - Data persists in MongoDB

3. **Debug:**
   - Check .env variables
   - Check MongoDB connection
   - Check CORS settings
   - Check browser console errors

## 📋 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection timeout | Install MongoDB or use Atlas |
| Port 3001 in use | Change PORT in .env |
| CORS errors | Check FRONTEND_URL in .env |
| Auth failures | Verify JWT_SECRET is set |
| 404 errors | Check route paths are exact |

## 📚 Files Overview

### Models (Database Schemas)
- **User.js** - User registration, login, profile
- **Idea.js** - Startup ideas, analysis, scores

### Controllers (Business Logic)
- **authController.js** - Auth operations
- **ideaController.js** - Idea CRUD
- **analyzeController.js** - Analysis engine
- **competitorController.js** - Competitor data
- **insightController.js** - Market insights
- **reportController.js** - Report generation

### Routes (Endpoints)
- **auth.js** - /api/auth/*
- **ideas.js** - /api/ideas/*
- **analyze.js** - /api/analyze/*
- **competitors.js** - /api/competitors/*
- **insights.js** - /api/insights/*
- **reports.js** - /api/reports/*

## 🔄 Full Stack Running

**Terminal 1: Backend**
```bash
cd backend
npm run dev
# http://localhost:3001
```

**Terminal 2: Frontend**
```bash
cd frontend-react
npm run dev
# http://localhost:5173
```

Now you have:
- ✅ Frontend at http://localhost:5173
- ✅ Backend at http://localhost:3001
- ✅ Mock database in memory (or MongoDB if running)
- ✅ Full API integration ready

## 🚀 Next Steps

1. ✅ Start backend: `npm run dev`
2. ✅ Test health endpoint: `/api/health`
3. ✅ Test auth: Register & Login
4. ✅ Connect frontend to backend
5. ✅ Test idea creation & analysis
6. ✅ Deploy to production

## 📖 Full Documentation

See `BACKEND_README.md` for:
- Complete API reference
- All endpoints with examples
- Database schema details
- Deployment instructions
- Production considerations

---

**Backend is ready!** 🎉

Start the server and begin testing its API endpoints.

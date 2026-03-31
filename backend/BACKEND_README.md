# CoFoundr AI - Backend API

Complete backend API for the CoFoundr AI startup validation platform.

## 🚀 Features

- ✅ User Authentication (JWT)
- ✅ Startup Idea Management
- ✅ AI-Powered Analysis
- ✅ Competitor Research
- ✅ Market Insights
- ✅ Report Generation
- ✅ CORS Enabled
- ✅ Error Handling

## 📋 Prerequisites

- Node.js 16+
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Create .env file:**
```bash
cp .env.example .env
```

3. **Update .env with your values:**
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/cofoundr-ai
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:5173
```

## 🎯 Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will start at: **http://localhost:3001**

## 📁 Project Structure

```
backend/
├── controllers/          # Business logic
│   ├── authController.js
│   ├── ideaController.js
│   ├── analyzeController.js
│   ├── competitorController.js
│   ├── insightController.js
│   └── reportController.js
├── models/              # Database schemas
│   ├── User.js
│   └── Idea.js
├── routes/              # API endpoints
│   ├── auth.js
│   ├── ideas.js
│   ├── analyze.js
│   ├── competitors.js
│   ├── insights.js
│   └── reports.js
├── middleware/          # Custom middleware
│   └── auth.js
├── server.js            # Main server file
├── package.json         # Dependencies
├── .env.example         # Environment variables template
└── README.md            # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token

### Ideas
- `POST /api/ideas` - Create new idea
- `GET /api/ideas` - Get all user ideas
- `GET /api/ideas/:id` - Get specific idea
- `PUT /api/ideas/:id` - Update idea
- `DELETE /api/ideas/:id` - Delete idea

### Analysis
- `POST /api/analyze` - Analyze idea
- `GET /api/analyze/:ideaId` - Get analysis results

### Competitors
- `GET /api/competitors/:ideaId` - Get competitors for idea
- `GET /api/competitors/category/:category` - Get competitors by category

### Insights
- `GET /api/insights/:category` - Get market insights
- `GET /api/insights` - Get all market data

### Reports
- `POST /api/reports/:ideaId` - Generate report
- `GET /api/reports/:ideaId` - Get report
- `GET /api/reports/:ideaId/export` - Export as PDF

### Health
- `GET /api/health` - Health check

## 📝 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "company": "My Startup",
    "role": "founder"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Idea
```bash
curl -X POST http://localhost:3001/api/ideas \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI Validator",
    "description": "An AI tool for validating startup ideas",
    "targetAudience": "Solo founders",
    "revenueModel": "SaaS Subscription",
    "category": "AI/ML SaaS"
  }'
```

### Analyze Idea
```bash
curl -X POST http://localhost:3001/api/analyze \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "An AI tool for validating startup ideas",
    "targetAudience": "Solo founders",
    "revenueModel": "SaaS Subscription",
    "category": "AI/ML SaaS"
  }'
```

## 🔐 Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Token is returned when:
- User registers
- User logs in

## 📊 Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": {...}
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## 🗄️ Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  company: String,
  role: String (founder|investor|advisor),
  ideas: [ObjectId],
  credits: Number,
  tier: String (free|pro|enterprise),
  createdAt: Date,
  updatedAt: Date
}
```

### Idea Schema
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  description: String,
  targetAudience: String,
  revenueModel: String,
  category: String,
  viabilityScore: Number (0-100),
  marketSize: String,
  growthRate: String,
  competitionLevel: String,
  risks: Array,
  recommendations: Array,
  competitors: Array,
  status: String (draft|analyzed|archived),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Connecting Frontend

Frontend URL is configured in `.env` CORS setting:

```env
FRONTEND_URL=http://localhost:5173
```

Update `.env` to match your frontend URL in production.

## 🚀 Deployment

### Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create cofoundr-ai

# Set environment variables
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set JWT_SECRET=<your-secret>

# Deploy
git push heroku main
```

### AWS/DigitalOcean
1. Install Node.js
2. Clone repository
3. Set environment variables
4. Start server with PM2 or similar

## 📚 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3001 | Server port |
| NODE_ENV | development | Environment |
| MONGODB_URI | mongodb://localhost:27017/cofoundr-ai | Database URI |
| JWT_SECRET | - | JWT secret key (required) |
| JWT_EXPIRE | 7d | Token expiration |
| FRONTEND_URL | http://localhost:5173 | Frontend URL |

## 🧪 Testing

Test endpoints using Postman or cURL. Collection available in `/postman-collection.json`.

## 🐛 Troubleshooting

### MongoDB Connection Error
```
npm install mongodb
# Make sure MongoDB is running locally or update MONGODB_URI
```

### Port Already in Use
```bash
# Change port in .env or kill process
lsof -i :3001
kill -9 <PID>
```

### CORS Errors
- Check FRONTEND_URL in .env
- Make sure frontend is running at specified URL

### JWT Errors
- Change JWT_SECRET in .env
- Clear localStorage on frontend

## 📖 Next Steps

1. ✅ Start backend server: `npm run dev`
2. ✅ Test API endpoints
3. ✅ Connect frontend to backend
4. ✅ Add AI/GPT integration (optional)
5. ✅ Deploy to production

## 🤝 Contributing

Contributions welcome! Please:
1. Create feature branch
2. Make changes
3. Submit pull request

## 📄 License

MIT License - Feel free to use for any purpose

---

**Backend is ready to go!** 🎉

Start the server with `npm run dev` and test endpoints.

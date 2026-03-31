# API Testing Quick Reference

## 🚀 Quick Test Endpoint List

Copy & paste these commands to test your API.

---

## 1️⃣ Health Check (No Auth Required)

### Test if backend is running
```bash
curl http://localhost:3001/api/health
```

**Expected Response:**
```json
{
  "status": "API is running",
  "timestamp": "2024-03-31T10:30:45.123Z"
}
```

---

## 2️⃣ Register New User

### Create a test account
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**💾 Copy the token and save it somewhere - you'll need it for other tests!**

---

## 3️⃣ Login

### Get token for existing user
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 4️⃣ Get Current User

### Get logged-in user info
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:3001/api/auth/me
```

**Replace `YOUR_TOKEN_HERE` with actual token from login/register**

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "ideas": []
  }
}
```

---

## 5️⃣ Create an Idea

### Submit a startup idea for analysis
```bash
curl -X POST http://localhost:3001/api/ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "AI-Powered Analytics Dashboard",
    "description": "A real-time analytics platform that uses machine learning to provide actionable business insights. Target SMBs with 10-500 employees.",
    "category": "AI/ML",
    "targetAudience": "Small and medium businesses",
    "revenueModel": "SaaS subscription (monthly/annual)"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "idea": {
    "_id": "507f191e810c19729de860ea",
    "userId": "507f1f77bcf86cd799439011",
    "title": "AI-Powered Analytics Dashboard",
    "description": "A real-time analytics platform...",
    "category": "AI/ML",
    "status": "draft",
    "createdAt": "2024-03-31T10:35:20.123Z"
  }
}
```

**💾 Copy the `_id` value - you'll need it for analyze!**

---

## 6️⃣ Analyze Idea

### Get AI analysis of your idea
```bash
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "ideaId": "507f191e810c19729de860ea",
    "description": "A real-time analytics platform that uses machine learning to provide actionable business insights."
  }'
```

**Replace:**
- `YOUR_TOKEN_HERE` with your JWT token
- `507f191e810c19729de860ea` with the idea ID from step 5

**Expected Response:**
```json
{
  "success": true,
  "viabilityScore": 78,
  "marketSize": "$2.5B",
  "growthRate": 32,
  "competitionLevel": "High",
  "risks": [
    "High market competition",
    "Significant capital requirements",
    "Need for strong data science team"
  ],
  "recommendations": [
    "Focus on underserved B2B niche",
    "Build partnerships with industry leaders",
    "Invest in proprietary algorithms"
  ]
}
```

---

## 7️⃣ Get All Ideas

### List all your startup ideas
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:3001/api/ideas
```

**Expected Response:**
```json
{
  "success": true,
  "ideas": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "AI-Powered Analytics Dashboard",
      "description": "...",
      "status": "draft",
      "createdAt": "2024-03-31T10:35:20.123Z"
    }
  ]
}
```

---

## 8️⃣ Get Single Idea

### Get details of one idea
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:3001/api/ideas/507f191e810c19729de860ea
```

**Expected Response:**
```json
{
  "success": true,
  "idea": {
    "_id": "507f191e810c19729de860ea",
    "userId": "507f1f77bcf86cd799439011",
    "title": "AI-Powered Analytics Dashboard",
    "description": "...",
    "category": "AI/ML",
    "targetAudience": "SMBs",
    "revenueModel": "SaaS subscription",
    "status": "draft"
  }
}
```

---

## 9️⃣ Get Competitors

### Get competitor analysis for your idea
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:3001/api/competitors/507f191e810c19729de860ea
```

**Expected Response:**
```json
{
  "success": true,
  "competitors": [
    {
      "name": "Tableau",
      "similarity": 85,
      "stage": "Mature",
      "funding": "$1.2B",
      "tags": ["BI", "Enterprise"]
    },
    {
      "name": "Looker",
      "similarity": 82,
      "stage": "Acquired",
      "funding": "$Google",
      "tags": ["Analytics", "ML"]
    }
  ]
}
```

---

## 🔟 Get Market Insights

### Get market data for a category
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:3001/api/insights/AI%2FML
```

**Note:** `AI%2FML` is URL-encoded "AI/ML"

**Expected Response:**
```json
{
  "success": true,
  "category": "AI/ML",
  "tam": "$15.8B",
  "growth_rate": 42,
  "saturation": "Medium",
  "active_companies": 2400,
  "annual_funding": "$24.5B",
  "insights": [
    {
      "title": "Enterprise AI Adoption",
      "description": "85% of enterprises investing in AI by 2024"
    }
  ]
}
```

---

## 1️⃣1️⃣ Update Idea

### Modify an existing idea
```bash
curl -X PUT http://localhost:3001/api/ideas/507f191e810c19729de860ea \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "AI-Powered Business Intelligence Platform",
    "description": "Enhanced description",
    "status": "analyzed"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Idea updated successfully",
  "idea": {
    "_id": "507f191e810c19729de860ea",
    "title": "AI-Powered Business Intelligence Platform",
    "description": "Enhanced description",
    "status": "analyzed"
  }
}
```

---

## 1️⃣2️⃣ Delete Idea

### Remove an idea
```bash
curl -X DELETE http://localhost:3001/api/ideas/507f191e810c19729de860ea \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Idea deleted successfully"
}
```

---

## 1️⃣3️⃣ Generate Report

### Create analysis report
```bash
curl -X POST http://localhost:3001/api/reports/507f191e810c19729de860ea \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "report": {
    "ideaId": "507f191e810c19729de860ea",
    "viabilityScore": 78,
    "summary": "...",
    "recommendations": ["..."],
    "createdAt": "2024-03-31T10:40:00.000Z"
  }
}
```

---

## 🔄 Step-by-Step Testing Workflow

### 1. Test Health (no auth needed)
```bash
curl http://localhost:3001/api/health
```
✅ Backend running?

### 2. Register Account
```bash
# Use register endpoint above
# Copy the token from response
```
✅ User account created?

### 3. Create Idea
```bash
# Use create idea endpoint with your token
# Copy the idea ID from response
```
✅ Idea stored?

### 4. Analyze Idea
```bash
# Use analyze endpoint with your token and idea ID
```
✅ Analysis working?

### 5. Get Competitors
```bash
# Use competitors endpoint with your idea ID
```
✅ Competitor data available?

### 6. Get Market Insights
```bash
# Use insights endpoint
```
✅ Market data available?

---

## 💡 Pro Tips

### Save Your Token
```bash
export TOKEN="your_token_here"
# Then use: $TOKEN in curl commands
curl -H "Authorization: Bearer $TOKEN" http://localhost:3001/api/ideas
```

### Test Multiple Categories
```bash
# Test different idea categories
curl -X POST http://localhost:3001/api/ideas \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"...","category":"E-Commerce",...}'

curl -X POST http://localhost:3001/api/ideas \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"...","category":"FinTech",...}'
```

### Use Postman
- Import the API URLs above
- Set `Authorization: Bearer <token>` in headers
- Save tokens as variables
- Create a test collection

### VS Code REST Client
Create `test.rest` file:
```
@baseUrl = http://localhost:3001/api
@token = your_token_here

### Health Check
GET {{baseUrl}}/health

### Get Ideas
GET {{baseUrl}}/ideas
Authorization: Bearer {{token}}

### Create Idea
POST {{baseUrl}}/ideas
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "title": "Test Idea",
  "description": "Test description"
}
```

---

## 🆘 Troubleshooting

| Error | Solution |
|-------|----------|
| `Connection refused` | Is backend running? `npm run dev` |
| `CORS error` | Check FRONTEND_URL in .env |
| `401 Unauthorized` | Is token in Authorization header? |
| `404 Not Found` | Is endpoint path correct? |
| `MongoDB connection error` | Start MongoDB with `mongod` |
| `Invalid token` | Expired? Re-login for new token |

---

## 📊 All Endpoints at a Glance

```
Authentication:
  POST   /api/auth/register
  POST   /api/auth/login
  GET    /api/auth/me
  POST   /api/auth/logout
  POST   /api/auth/refresh

Ideas:
  POST   /api/ideas
  GET    /api/ideas
  GET    /api/ideas/:id
  PUT    /api/ideas/:id
  DELETE /api/ideas/:id

Analysis:
  POST   /api/analyze
  GET    /api/analyze/:ideaId

Competitors:
  GET    /api/competitors/:ideaId
  GET    /api/competitors/category/:category

Insights:
  GET    /api/insights/:category
  GET    /api/insights

Reports:
  POST   /api/reports/:ideaId
  GET    /api/reports/:ideaId
  GET    /api/reports/:ideaId/export

Health:
  GET    /api/health
```

---

**Happy testing!** 🎉

Start with health check → Register → Create Idea → Analyze → View Results

# 🌱 Dummy Data Setup Guide

This guide will help you seed your CoFoundr AI backend with sample data so you can immediately test graphs, features, and the full application without manual data entry.

---

## 🚀 Quick Start (Automatic)

The **easiest way** - dummy data is automatically seeded on first run!

### 1. Start Backend
```bash
cd backend
npm run dev
```

### Expected Output
```
✅ MongoDB connected
🌱 Initializing dummy data...
  ✅ Created user: sarah@startup.com
  ✅ Created user: alex@startup.com
  ✅ Created idea: AI-Powered Analytics Dashboard
  ... (more ideas)

✅ Dummy data initialized!

🧪 Test Credentials:
  Email: sarah@startup.com | Password: password123
  Email: alex@startup.com | Password: password123

🚀 Server running on http://localhost:3001
```

🎉 **Done!** Your backend now has sample data and is ready to use.

---

## 📋 Manual Seeding (If Needed)

If you want to manually seed or reseed the database:

### Option 1: Node Seed Script
```bash
cd backend
npm run seed
```

This will:
- Connect to MongoDB
- Clear all existing data
- Create test users
- Create 8 startup ideas
- Link ideas to users
- Display test credentials

### Option 2: API Reseed Endpoint
```bash
curl -X POST http://localhost:3001/api/dev/reseed
```

Response:
```json
{
  "success": true,
  "message": "Database reseeded successfully",
  "usersCreated": 2,
  "ideasCreated": 8,
  "credentials": [
    {"email": "sarah@startup.com", "password": "password123"},
    {"email": "alex@startup.com", "password": "password123"}
  ]
}
```

---

## 📊 What Data Gets Seeded?

### Users Created
| Email | Password | Role | Tier |
|-------|----------|------|------|
| sarah@startup.com | password123 | Founder | Pro |
| alex@startup.com | password123 | Founder | Enterprise |

### Ideas Created (8 Total)

#### 1. **AI-Powered Analytics Dashboard**
- Viability Score: **82/100**
- Market Size: $2.5B
- Growth Rate: 32%
- Competition: High
- Status: Analyzed ✅

#### 2. **Sustainable Packaging Solutions**
- Viability Score: **71/100**
- Market Size: $8.2B
- Growth Rate: 28%
- Competition: Medium
- Status: Analyzed ✅

#### 3. **Virtual Event Management Platform**
- Viability Score: **76/100**
- Market Size: $1.8B
- Growth Rate: 25%
- Competition: High
- Status: Analyzed ✅

#### 4. **Personal Finance AI Assistant**
- Viability Score: **78/100**
- Market Size: $4.1B
- Growth Rate: 38%
- Competition: High
- Status: Analyzed ✅

#### 5. **Marketplace for Remote Developers**
- Viability Score: **85/100** ⭐ (Highest)
- Market Size: $3.2B
- Growth Rate: 42%
- Competition: Medium
- Status: Analyzed ✅

#### 6. **Supply Chain Blockchain Solution**
- Viability Score: **68/100**
- Market Size: $9.8B
- Growth Rate: 35%
- Competition: Medium
- Status: Analyzed ✅

#### 7. **Mental Health App for Teens**
- Viability Score: **79/100**
- Market Size: $5.2B
- Growth Rate: 45%
- Competition: High
- Status: Analyzed ✅

#### 8. **AI Content Generator for Marketing**
- Viability Score: **81/100**
- Market Size: $2.8B
- Growth Rate: 40%
- Competition: High
- Status: Analyzed ✅

---

## ✅ What You Can Now Test

### 1. **Authentication**
```bash
# Login with seeded user
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "sarah@startup.com",
    "password": "password123"
  }'
```

### 2. **Ideas List**
```bash
# Get all ideas from authenticated user
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/ideas
```

### 3. **Idea Analysis**
```bash
# View analysis for an idea (already calculated)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/analyze/IDEA_ID
```

### 4. **Competitors Data**
```bash
# Get competitors for an idea category
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/competitors/IDEA_ID
```

### 5. **Market Insights**
```bash
# Get market data by category
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/insights/AI%2FML
```

### 6. **Dashboard Display**
- Open http://localhost:5173
- Login with any seeded user
- See pre-analyzed ideas
- View viability scores (ranging 68-85)
- See growth projections
- View competitor analysis
- Check market insights
- View all recommendations

---

## 🎯 Frontend Testing With Dummy Data

Now that your backend has data, test the frontend:

### 1. Login Page
```
Email: sarah@startup.com
Password: password123
```

### 2. Dashboard
After login, you'll see:
- ✅ 3 analyzed startup ideas ready to view
- ✅ Viability scores displayed
- ✅ Growth charts with data
- ✅ Risk assessments
- ✅ Competitor information
- ✅ Market insights

### 3. Features That Will Work
- ✅ **Dashboard Charts**: Growth trajectory and market share graphs
- ✅ **Competitors Page**: 3-5 competitors per idea
- ✅ **Insights Page**: Market data by category
- ✅ **Timeline Page**: Roadmap with real data
- ✅ **Pitch Page**: Investment slides with analysis
- ✅ **Report Page**: Full analysis document

---

## 🔄 Reseed Data Anytime

If you want to reset and reload dummy data:

### Command Line
```bash
cd backend
npm run seed
```

### API Endpoint
```bash
curl -X POST http://localhost:3001/api/dev/reseed
```

### Watch Mode (Auto-reseed on changes)
```bash
cd backend
npm run seed:watch
```

---

## 📝 Seed File Structure

The seed data is defined in two files:

### `seed.js` - Manual Seeding Script
- Connects to MongoDB
- Clears existing data
- Creates users with bcrypt-hashed passwords
- Creates 8 ideas with full analysis data
- Links ideas to users

### `initData.js` - Auto-Initialization
- Contains DUMMY_DATA constant
- `initializeDummyData()` function
- Automatically called on server startup
- Only seeds if no data exists

---

## 🧪 Data Includes

Each seeded idea includes:

### Analyzing Will Show
✅ Viability Score (out of 100)
✅ Market Size (e.g., "$2.5B")
✅ Growth Rate (percentage)
✅ Competition Level
✅ Listed Risks (3-4 items)
✅ Recommendations (3-4 items)
✅ Status (analyzed)

### Competitors Include
✅ Company names
✅ Similarity percentage
✅ Funding amount
✅ Development stage
✅ Tags/categories

### Market Insights Include
✅ Total Addressable Market (TAM)
✅ Growth rate trends
✅ Saturation level
✅ Active company count
✅ Annual funding totals
✅ Key insights (6+ per category)

---

## 🛠️ Customizing Dummy Data

To add your own dummy data:

1. Edit `initData.js`
2. Add your ideas to `DUMMY_DATA.ideas`
3. Run reseed
```bash
npm run seed
```

Example:
```javascript
{
  title: 'Your Idea',
  description: 'Your description',
  category: 'AI/ML',
  targetAudience: 'Your audience',
  revenueModel: 'Your model',
  viabilityScore: 75,
  marketSize: '$5B',
  growthRate: 30,
  competitionLevel: 'High',
  risks: ['Risk 1', 'Risk 2'],
  recommendations: ['Rec 1', 'Rec 2'],
  status: 'analyzed'
}
```

---

## 📊 Test Workflow

### 1. Backend Setup
```bash
cd backend
npm run dev
# Wait for "🌱 Initializing dummy data..." message
```

### 2. Frontend Setup (in new terminal)
```bash
cd frontend-react
npm run dev
# Open http://localhost:5173
```

### 3. Login & Test
1. Login: `sarah@startup.com` / `password123`
2. Click "View Ideas" or navigate to dashboard
3. See all pre-analyzed ideas with data
4. View:
   - ✅ Viability scores
   - ✅ Growth charts
   - ✅ Competitors
   - ✅ Market insights
   - ✅ Recommendations
   - ✅ Risk assessments

### 4. Full Feature Testing
- [ ] Login works
- [ ] Ideas display
- [ ] Viability scores show
- [ ] Charts render with data
- [ ] Competitors display
- [ ] Insights show market data
- [ ] Everything interactive

---

## 🔧 Troubleshooting

### No data appears after login
```bash
# Manually reseed
curl -X POST http://localhost:3001/api/dev/reseed

# Or
npm run seed
```

### Data doesn't persist
- Check MongoDB is running
- Verify MONGODB_URI in .env
- Check for connection errors in terminal

### Charts are empty
- Make sure data is seeded (`npm run seed`)
- Check browser console for errors
- Verify API requests in Network tab

### Users can't login
```bash
# Check seeded credentials
npm run seed
# Look for "🧪 Test Credentials" section
```

---

## ✨ You're All Set!

Your CoFoundr AI backend now has:
- ✅ 2 Test users
- ✅ 8 Startup ideas
- ✅ Full analysis data
- ✅ Viability scores
- ✅ Competitor info
- ✅ Market insights
- ✅ Charts & visualizations ready

**All features are now testable without manual data entry!**

---

## 📚 Next Steps

1. ✅ Start backend (`npm run dev`)
2. ✅ Start frontend (`npm run dev`)
3. ✅ Login with `sarah@startup.com`
4. ✅ Explore all pages and features
5. ✅ Create your own ideas
6. ✅ Test analysis API

---

**Happy testing!** 🚀

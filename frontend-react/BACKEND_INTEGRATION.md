# Backend Integration Guide

## How to Connect Your Backend API

This guide shows you how to connect your CoFoundr AI React frontend to a backend API.

## 1. Basic API Service Setup

Create a new file: `src/services/api.js`

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Analyze startup idea
export const analyzeIdea = async (ideaData) => {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ideaData)
  });
  
  if (!response.ok) throw new Error('Analysis failed');
  return response.json();
};

// Get competitor data
export const getCompetitors = async (ideaId) => {
  const response = await fetch(`${API_BASE_URL}/competitors/${ideaId}`);
  if (!response.ok) throw new Error('Failed to fetch competitors');
  return response.json();
};

// Get market insights
export const getMarketInsights = async (category) => {
  const response = await fetch(`${API_BASE_URL}/insights?category=${category}`);
  if (!response.ok) throw new Error('Failed to fetch insights');
  return response.json();
};

// Get full report
export const getReport = async (ideaId) => {
  const response = await fetch(`${API_BASE_URL}/report/${ideaId}`);
  if (!response.ok) throw new Error('Failed to fetch report');
  return response.json();
};
```

## 2. Update Environment Variables

Create `.env.local` file in project root:

```
VITE_API_URL=http://localhost:3001/api
```

Update `api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

## 3. Update Dashboard Page

Replace mock data with API calls:

```jsx
// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { analyzeIdea } from '../services/api';

export default function Dashboard() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const idea = location.state?.idea;
    
    if (!idea) {
      setError('No idea provided');
      setLoading(false);
      return;
    }

    analyzeIdea({ 
      idea,
      audience: location.state?.audience,
      revenue: location.state?.revenue
    })
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [location]);

  if (loading) return <div className="page">Loading analysis...</div>;
  if (error) return <div className="page">Error: {error}</div>;
  if (!data) return <div className="page">No data</div>;

  return (
    <div className="dash-container">
      {/* Render data from API */}
      <h1>{data.title}</h1>
      <p>Score: {data.score}</p>
      {/* ... rest of dashboard */}
    </div>
  );
}
```

## 4. Update Idea Input Page

Capture form data before navigation:

```jsx
// src/pages/IdeaInput.jsx
import { useNavigate } from 'react-router-dom';

export default function IdeaInput() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [audience, setAudience] = useState('');
  const [revenue, setRevenue] = useState('');

  const handleAnalyze = () => {
    if (!idea.trim()) {
      setToast('Please describe your idea');
      return;
    }

    // Pass data to dashboard via state
    navigate('/dashboard', {
      state: { idea, audience, revenue }
    });
  };

  // ... rest of component
}
```

## 5. Error Handling

Create error boundary:

```jsx
// src/components/ErrorBoundary.jsx
import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Error</h1>
      <p>{error?.message || 'Something went wrong'}</p>
      <button onClick={() => window.location.href = '/'}>
        Go Home
      </button>
    </div>
  );
}
```

## 6. Loading States

Add global loading context:

```jsx
// src/context/LoadingContext.jsx
import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <div className="loading-overlay">Analyzing...</div>}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
```

## 7. Authentication (Optional)

Add auth service:

```jsx
// src/services/auth.js
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

export const getToken = () => localStorage.getItem('token');

export const logout = () => localStorage.removeItem('token');
```

## 8. Protected Routes

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/auth';

export default function ProtectedRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
}
```

## 9. Backend API Specification (Expected)

Your backend should provide these endpoints:

### Analysis
```
POST /api/analyze
Body: { idea, audience, revenue }
Response: { 
  id, 
  score, 
  title, 
  summary,
  marketSize,
  growthRate,
  riskLevel,
  recommendations
}
```

### Competitors
```
GET /api/competitors/:ideaId
Response: [
  { 
    name, 
    similarity, 
    stage, 
    funding, 
    tags 
  }
]
```

### Insights
```
GET /api/insights?category=:category
Response: {
  tamSize,
  growthRate,
  saturation,
  insights: []
}
```

### Report
```
GET /api/report/:ideaId
Response: {
  title,
  summary,
  market,
  competitors,
  businessModel,
  recommendations,
  // ... full report data
}
```

## 10. Example Backend Stack

**Node.js + Express:**
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { idea } = req.body;
  // Call GPT-4 API or your analysis service
  const result = await analyzeIdea(idea);
  res.json(result);
});

app.get('/api/competitors/:ideaId', async (req, res) => {
  // Fetch from database
  const competitors = await Competitor.find({ ideaId });
  res.json(competitors);
});

app.listen(3001);
```

## 11. Testing API Locally

Start both servers:

```bash
# Terminal 1: Frontend
cd frontend-react
npm run dev
# Runs on http://localhost:5173

# Terminal 2: Backend
cd backend
npm start
# Runs on http://localhost:3001
```

## 12. Production Deployment

Before deploying:

1. **Update API URL in .env:**
   ```
   VITE_API_URL=https://api.yourapp.com
   ```

2. **Build Frontend:**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel/Netlify:**
   - Connect your GitHub repo
   - Set environment variables
   - Deploy `dist/` folder

4. **Deploy Backend:**
   - Use Heroku, AWS, DigitalOcean, etc.
   - Set database connections
   - Enable CORS for frontend domain

## Common Issues

### CORS Errors
Add CORS headers in backend:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### API Timeout
Increase timeout in fetch requests:
```javascript
const controller = new AbortController();
setTimeout(() => controller.abort(), 30000); // 30s timeout

fetch(url, { signal: controller.signal });
```

### State Management
For complex data flows, consider:
- `useReducer` hook
- Context API
- Zustand
- Redux

---

Your frontend is ready for backend integration! Start by creating the API service file and endpoints, then connect page by page.


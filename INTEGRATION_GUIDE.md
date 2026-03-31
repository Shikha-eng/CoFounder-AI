# Frontend-Backend Integration Guide

This guide walks through connecting the React frontend to the Express backend API.

## ✅ Prerequisites

- ✅ Backend running: `http://localhost:3001`
- ✅ Frontend running: `http://localhost:5173`
- ✅ MongoDB running (or use mock mode)
- ✅ Both servers functional

## 🔗 Integration Points

### 1. Create API Service

Create `frontend-react/src/services/apiClient.js`:

```javascript
// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API fetch wrapper
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Authentication Endpoints
export const authAPI = {
  register: (data) =>
    apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  login: (data) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getMe: () => apiFetch('/auth/me'),
  logout: () => apiFetch('/auth/logout', { method: 'POST' }),
};

// Ideas Endpoints
export const ideasAPI = {
  create: (data) =>
    apiFetch('/ideas', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAll: () => apiFetch('/ideas'),
  getById: (id) => apiFetch(`/ideas/${id}`),
  update: (id, data) =>
    apiFetch(`/ideas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    apiFetch(`/ideas/${id}`, { method: 'DELETE' }),
};

// Analysis Endpoints
export const analyzeAPI = {
  analyze: (data) =>
    apiFetch('/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAnalysis: (ideaId) => apiFetch(`/analyze/${ideaId}`),
};

// Competitors Endpoints
export const competitorsAPI = {
  getByIdea: (ideaId) => apiFetch(`/competitors/${ideaId}`),
  getByCategory: (category) => apiFetch(`/competitors/category/${category}`),
};

// Insights Endpoints
export const insightsAPI = {
  getByCategory: (category) => apiFetch(`/insights/${category}`),
  getAll: () => apiFetch('/insights'),
};

// Reports Endpoints
export const reportsAPI = {
  generate: (ideaId) =>
    apiFetch(`/reports/${ideaId}`, { method: 'POST' }),
  getReport: (ideaId) => apiFetch(`/reports/${ideaId}`),
  export: (ideaId) => apiFetch(`/reports/${ideaId}/export`),
};

// Health Check
export const healthAPI = {
  check: () => apiFetch('/health'),
};
```

### 2. Update `.env.local`

In `frontend-react/.env.local`:

```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Update IdeaInput Page

Update `frontend-react/src/pages/IdeaInput.jsx`:

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeAPI, ideasAPI } from '../services/apiClient';
import Toast from '../components/Toast';

export default function IdeaInput() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAnalyze = async () => {
    if (description.trim().length < 10) {
      showToast('Please describe your idea (at least 10 characters)', 'error');
      return;
    }

    try {
      setLoading(true);

      // Step 1: Create the idea
      const ideaResponse = await ideasAPI.create({
        title: description.substring(0, 50) + '...',
        description,
        category: 'AI/ML',
        targetAudience: 'Tech enthusiasts',
        revenueModel: 'SaaS',
      });

      const ideaId = ideaResponse.idea._id;
      showToast('Idea created! Analyzing...', 'success');

      // Step 2: Analyze the idea
      const analysisResponse = await analyzeAPI.analyze({
        ideaId,
        description,
      });

      showToast('Analysis complete!', 'success');

      // Step 3: Navigate to dashboard with idea ID
      navigate('/dashboard', { state: { ideaId } });
    } catch (error) {
      console.error('Error:', error);
      showToast(error.message || 'Failed to analyze idea', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="idea-input-container">
      <h1>Describe Your Startup Idea</h1>
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Tell us about your startup idea..."
        maxLength={500}
        disabled={loading}
      />

      <div className="char-count">
        {description.length}/500
      </div>

      <button 
        onClick={handleAnalyze} 
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Analyzing...' : 'Analyze Idea'}
      </button>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
```

### 4. Update Dashboard Page

Update `frontend-react/src/pages/Dashboard.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyzeAPI, competitorsAPI, insightsAPI } from '../services/apiClient';
import Sidebar from '../components/Sidebar';
import Charts from '../components/Charts';

export default function Dashboard() {
  const location = useLocation();
  const ideaId = location.state?.ideaId;
  
  const [analysis, setAnalysis] = useState(null);
  const [competitors, setCompetitors] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (ideaId) {
          // Fetch analysis
          const analysisData = await analyzeAPI.getAnalysis(ideaId);
          setAnalysis(analysisData);

          // Fetch competitors
          const competitorsData = await competitorsAPI.getByIdea(ideaId);
          setCompetitors(competitorsData);

          // Fetch insights
          const insightsData = await insightsAPI.getByCategory('AI/ML');
          setInsights(insightsData);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ideaId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <Sidebar viabilityScore={analysis?.viabilityScore || 0} />
      
      <div className="dashboard-content">
        <h2>Analysis Results</h2>

        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Viability Score</h3>
            <p className="score">{analysis?.viabilityScore || 0}/100</p>
          </div>
          
          <div className="metric-card">
            <h3>Market Size</h3>
            <p>${analysis?.marketSize || 'N/A'}</p>
          </div>
          
          <div className="metric-card">
            <h3>Growth Rate</h3>
            <p>{analysis?.growthRate || 'N/A'}%</p>
          </div>
        </div>

        <Charts 
          growthData={analysis?.growthProjection || []}
          marketData={insights?.data || []}
        />

        {analysis?.recommendations && (
          <div className="recommendations">
            <h3>Recommendations</h3>
            <ul>
              {analysis.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 5. Add Auth Context (Optional)

Create `frontend-react/src/context/AuthContext.jsx`:

```jsx
import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/apiClient';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (token) {
      authAPI
        .getMe()
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const register = async (data) => {
    const response = await authAPI.register(data);
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    authAPI.logout();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## 🧪 Testing Integration

### Test 1: Health Check Endpoint
```bash
# No auth required
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "API is running",
  "timestamp": "..."
}
```

### Test 2: Register & Login Flow
```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Response includes token - copy it

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test 3: Create Idea & Analyze
```bash
# Create idea
curl -X POST http://localhost:3001/api/ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "AI Analytics Tool",
    "description": "A tool that analyzes business metrics using AI",
    "category": "AI/ML",
    "targetAudience": "Startups",
    "revenueModel": "SaaS subscription"
  }'

# Get idea ID from response, then analyze
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "ideaId": "IDEA_ID_HERE",
    "description": "A tool that analyzes business metrics using AI"
  }'
```

### Test 4: Frontend to Backend
In browser console (http://localhost:5173):

```javascript
// Test API service
import { analyzeAPI, ideasAPI } from './services/apiClient';

// Create and analyze
const idea = await ideasAPI.create({
  title: 'Test Idea',
  description: 'Testing frontend-backend integration'
});

const analysis = await analyzeAPI.analyze({
  ideaId: idea.idea._id,
  description: 'Testing'
});

console.log(analysis);
```

## 🔄 Data Flow

### Analyze Idea Flow
1. User inputs description in **IdeaInput.jsx**
2. Click "Analyze Idea"
3. Creates idea via `ideasAPI.create()`
4. Analyzes via `analyzeAPI.analyze()`
5. Navigates to **Dashboard.jsx** with ideaId
6. Dashboard fetches analysis, competitors, insights
7. Display results with charts

### Authentication Flow
1. User registers via **IdeaInput.jsx** or login page
2. Backend sends JWT token
3. Frontend stores in localStorage
4. API service adds token to all requests
5. Backend validates token in middleware
6. Protected routes only accessible with token

## 📝 Environment Variables

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=CoFoundr AI
```

### Backend (.env)
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/cofoundr-ai
JWT_SECRET=cofoundr-ai-secret-key-development
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 🛠️ Running Full Stack

**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd frontend-react
npm run dev
```

## 📊 API Response Examples

### Analyze Endpoint Response
```json
{
  "success": true,
  "viabilityScore": 78,
  "marketSize": "$2.5B",
  "growthRate": 32,
  "risks": [
    "High competition",
    "Market saturation"
  ],
  "recommendations": [
    "Focus on niche market",
    "Build strategic partnerships"
  ]
}
```

### Ideas Endpoint Response
```json
{
  "success": true,
  "idea": {
    "_id": "abc123",
    "userId": "user123",
    "title": "AI Analytics Tool",
    "description": "...",
    "viabilityScore": 78,
    "createdAt": "2024-01-15T..."
  }
}
```

## ✅ Integration Checklist

- [ ] Backend running at http://localhost:3001
- [ ] Frontend running at http://localhost:5173
- [ ] Create `apiClient.js` service
- [ ] Add `VITE_API_URL` to `.env.local`
- [ ] Update `IdeaInput.jsx` to use API
- [ ] Update `Dashboard.jsx` to fetch data
- [ ] Test authentication flow
- [ ] Test idea creation & analysis
- [ ] Test competitor & insight fetching
- [ ] Verify token persistence

## 🚀 Next Steps

1. **Test individual endpoints** with curl/Postman
2. **Implement AuthContext** for global user state
3. **Add Protected Routes** for authenticated pages
4. **Connect all pages** to backend APIs
5. **Add error handling** and loading states
6. **Test full user flow** end-to-end

---

**Integration is ready!** Start both servers and test the API connections.

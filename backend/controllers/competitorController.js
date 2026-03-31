// Mock competitor data
const competitorDatabase = {
  'AI/ML SaaS': [
    {
      name: 'Startup.ai',
      similarity: 92,
      stage: 'Series B',
      funding: '$12M',
      tags: ['AI', 'Validation', 'B2B'],
      description: 'Enterprise AI platform for startups'
    },
    {
      name: 'IdeaVault',
      similarity: 78,
      stage: 'Series A',
      funding: '$4.2M',
      tags: ['Market Research', 'SaaS'],
      description: 'Startup idea management platform'
    },
    {
      name: 'ValidateHub',
      similarity: 65,
      stage: 'Seed',
      funding: '$800K',
      tags: ['MVP Testing', 'Analytics'],
      description: 'Product validation tools'
    }
  ],
  'E-Commerce Tool': [
    {
      name: 'ShopFlow',
      similarity: 88,
      stage: 'Series A',
      funding: '$5M',
      tags: ['E-Commerce', 'Optimization'],
      description: 'E-commerce optimization platform'
    },
    {
      name: 'StoreBoost',
      similarity: 72,
      stage: 'Seed',
      funding: '$1.5M',
      tags: ['Analytics', 'Growth'],
      description: 'Store analytics and growth'
    }
  ],
  'Analytics Platform': [
    {
      name: 'DataDash',
      similarity: 85,
      stage: 'Series B',
      funding: '$9.5M',
      tags: ['Analytics', 'Real-time', 'B2B'],
      description: 'Real-time analytics platform'
    },
    {
      name: 'InsightPro',
      similarity: 70,
      stage: 'Series A',
      funding: '$3.8M',
      tags: ['Data Visualization'],
      description: 'Advanced data visualization'
    }
  ]
};

exports.getCompetitors = async (req, res) => {
  try {
    const { category } = req.query;
    
    if (!category) {
      return res.status(400).json({ error: 'Category required' });
    }

    const competitors = competitorDatabase[category] || [];

    res.json({
      count: competitors.length,
      category,
      competitors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompetitorsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const competitors = competitorDatabase[category] || [];

    if (competitors.length === 0) {
      return res.json({
        count: 0,
        category,
        competitors: [],
        message: 'No competitors found for this category'
      });
    }

    res.json({
      count: competitors.length,
      category,
      competitors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

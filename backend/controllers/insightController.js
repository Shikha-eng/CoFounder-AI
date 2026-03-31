// Mock market insights data
const marketInsights = {
  'AI/ML SaaS': {
    tamSize: '$15.2B',
    growthRate: '38% YoY',
    saturation: 'Moderate',
    activeCompanies: 2400,
    annualFunding: '$2.8B',
    insights: [
      { title: 'Market Opportunity', text: 'Rapid growth driven by increased AI adoption and founder demand for automation tools.' },
      { title: 'Customer Trends', text: 'Founders are seeking AI-powered solutions for startup validation and market analysis.' },
      { title: 'Innovation Focus', text: 'Real-time insights, predictive analytics, and API integrations are becoming standard.' },
      { title: 'Geographic Growth', text: 'North America leads, but Asia-Pacific shows fastest growth at 45% YoY.' },
      { title: 'Pricing Trends', text: 'Freemium models dominate, with $99-500/month for Pro tiers.' },
      { title: 'Growth Catalysts', text: 'Increased VC funding, startup acceleration, and ecosystem growth support market expansion.' }
    ]
  },
  'E-Commerce Tool': {
    tamSize: '$12.8B',
    growthRate: '22% YoY',
    saturation: 'High',
    activeCompanies: 1800,
    annualFunding: '$1.5B',
    insights: [
      { title: 'Market Opportunity', text: 'Stable market with consistent growth driven by e-commerce expansion.' },
      { title: 'Customer Trends', text: 'Focus on mobile optimization, personalization, and customer retention.' },
      { title: 'Innovation Focus', text: 'AI recommendations, predictive analytics, and multi-channel integration.' },
      { title: 'Geographic Growth', text: 'Emerging markets in Southeast Asia showing rapid growth potential.' },
      { title: 'Pricing Trends', text: 'SaaS subscriptions dominate with percentage-of-revenue models gaining traction.' },
      { title: 'Growth Catalysts', text: 'Mobile commerce growth and omnichannel retail expansion driving demand.' }
    ]
  },
  'Analytics Platform': {
    tamSize: '$18.5B',
    growthRate: '28% YoY',
    saturation: 'Moderate',
    activeCompanies: 1200,
    annualFunding: '$2.1B',
    insights: [
      { title: 'Market Opportunity', text: 'Growing demand for real-time data analytics and business intelligence.' },
      { title: 'Customer Trends', text: 'No-code/low-code platforms gaining popularity, focus on data privacy.' },
      { title: 'Innovation Focus', text: 'Machine learning integration, natural language processing, and automation.' },
      { title: 'Geographic Growth', text: 'Enterprise adoption in developed markets, startup growth in emerging regions.' },
      { title: 'Pricing Trends', text: 'Enterprise contracts with usage-based pricing becoming standard.' },
      { title: 'Growth Catalysts', text: 'Data explosion, AI advancement, and regulatory compliance requirements.' }
    ]
  }
};

exports.getInsights = async (req, res) => {
  try {
    const { category } = req.params;
    
    const insights = marketInsights[category];

    if (!insights) {
      return res.status(404).json({ error: 'Insights not found for this category' });
    }

    res.json({
      category,
      ...insights
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMarketData = async (req, res) => {
  try {
    const allData = {};

    for (const [category, data] of Object.entries(marketInsights)) {
      allData[category] = data;
    }

    res.json({
      categories: Object.keys(allData),
      data: allData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

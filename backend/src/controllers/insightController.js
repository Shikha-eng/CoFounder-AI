const Insight = require('../models/Insight');
const { mockInsights } = require('../utils/mockData');

// Get Market Insights
exports.getInsights = async (req, res) => {
  try {
    const { ideaId } = req.query;

    let insights = [];
    if (ideaId) {
      insights = await Insight.find({ ideaId });
    } else {
      insights = await Insight.find();
    }

    // If no insights in DB, return mock data
    if (insights.length === 0) {
      return res.json({
        success: true,
        source: 'mock',
        tamSize: '$2.4B',
        growthRate: '24%',
        saturation: 4.2,
        count: mockInsights.length,
        data: mockInsights,
      });
    }

    res.json({
      success: true,
      source: 'database',
      count: insights.length,
      data: insights,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Add Insight
exports.addInsight = async (req, res) => {
  try {
    const { ideaId, title, description, category, impact, icon } = req.body;

    const insight = new Insight({
      ideaId,
      title,
      description,
      category,
      impact,
      icon,
      relevance: Math.floor(Math.random() * 40) + 60, // 60-100
    });

    const saved = await insight.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get Market Statistics
exports.getMarketStats = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        tamSize: '$2.4B',
        growthRate: '24%',
        saturation: 4.2,
        activeCompanies: 1200,
        annualFunding: '$48M',
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

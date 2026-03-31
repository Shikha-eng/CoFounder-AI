const Competitor = require('../models/Competitor');
const { mockCompetitors } = require('../utils/mockData');

// Get Competitors for Idea
exports.getCompetitors = async (req, res) => {
  try {
    const { ideaId } = req.params;

    // Check if competitors exist in DB
    let competitors = await Competitor.find({ ideaId });

    // If not, return mock data
    if (competitors.length === 0) {
      return res.json({
        success: true,
        source: 'mock',
        count: mockCompetitors.length,
        data: mockCompetitors,
      });
    }

    res.json({
      success: true,
      source: 'database',
      count: competitors.length,
      data: competitors,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Add Competitor
exports.addCompetitor = async (req, res) => {
  try {
    const { ideaId, name, similarity, fundingStage, totalFunding, tags } = req.body;

    const competitor = new Competitor({
      ideaId,
      name,
      similarity,
      fundingStage,
      totalFunding,
      tags,
    });

    const saved = await competitor.save();

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

// Get All Competitors
exports.getAllCompetitors = async (req, res) => {
  try {
    const competitors = await Competitor.find();

    res.json({
      success: true,
      count: competitors.length,
      data: competitors,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

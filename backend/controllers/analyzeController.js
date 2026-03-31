const Idea = require('../models/Idea');

// Mock AI analysis - replace with your actual AI/GPT-4 integration
const performAnalysis = (idea) => {
  const scores = {
    'AI/ML SaaS': 85,
    'E-Commerce Tool': 78,
    'Analytics Platform': 82,
    'Other': 72
  };

  const marketData = {
    'AI/ML SaaS': {
      marketSize: '$8.5B',
      growthRate: '38% YoY',
      saturation: 'Moderate',
      tam: '$15.2B'
    },
    'E-Commerce Tool': {
      marketSize: '$6.2B',
      growthRate: '22% YoY',
      saturation: 'High',
      tam: '$12.8B'
    },
    'Analytics Platform': {
      marketSize: '$9.1B',
      growthRate: '28% YoY',
      saturation: 'Moderate',
      tam: '$18.5B'
    }
  };

  const category = idea.category || 'Other';
  const score = scores[category] || 72;
  const market = marketData[category] || marketData['Other'];

  return {
    score,
    marketSize: market.marketSize,
    growthRate: market.growthRate,
    tam: market.tam,
    saturation: market.saturation,
    risks: [
      { category: 'Market', level: 'Medium', description: 'Market competition is increasing' },
      { category: 'Technical', level: 'Low', description: 'Technology feasible with current stack' },
      { category: 'Funding', level: 'Low', description: 'Good potential for funding' }
    ],
    recommendations: [
      'Focus on unique value proposition',
      'Build MVP quickly for validation',
      'Engage with early adopters',
      'Plan second version with more features',
      'Prepare pitch deck for fundraising'
    ],
    competitionLevel: score > 80 ? 'Moderate' : 'High'
  };
};

exports.analyzeIdea = async (req, res) => {
  try {
    const { description, targetAudience, revenueModel, category } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Idea description required' });
    }

    // Create idea in database
    const idea = new Idea({
      userId: req.userId,
      title: 'Analyzed Idea',
      description,
      targetAudience,
      revenueModel,
      category: category || 'Other',
      status: 'analyzed'
    });

    // Perform analysis
    const analysis = performAnalysis(idea);

    // Update idea with analysis results
    idea.viabilityScore = analysis.score;
    idea.marketSize = analysis.marketSize;
    idea.growthRate = analysis.growthRate;
    idea.competitionLevel = analysis.competitionLevel;
    idea.risks = analysis.risks;
    idea.recommendations = analysis.recommendations;

    await idea.save();

    res.status(201).json({
      message: 'Analysis completed',
      ideaId: idea._id,
      analysis: {
        viabilityScore: analysis.score,
        marketSize: analysis.marketSize,
        growthRate: analysis.growthRate,
        tam: analysis.tam,
        saturation: analysis.saturation,
        competitionLevel: analysis.competitionLevel,
        risks: analysis.risks,
        recommendations: analysis.recommendations
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalysisResults = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.ideaId);

    if (!idea) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    if (idea.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      analysis: {
        viabilityScore: idea.viabilityScore,
        marketSize: idea.marketSize,
        growthRate: idea.growthRate,
        competitionLevel: idea.competitionLevel,
        risks: idea.risks,
        recommendations: idea.recommendations
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Idea = require('../models/Idea');
const Analysis = require('../models/Analysis');
const Competitor = require('../models/Competitor');

// Mock analysis function - replace with real AI/ML service
const generateAnalysis = async (ideaData) => {
  return {
    executiveSummary: `CoFoundr AI analysis for: ${ideaData.description.substring(0, 50)}...`,
    marketAnalysis: {
      tamSize: '$2.4B',
      growthRate: '24%',
      saturation: 4.2,
      trends: [
        'Increasing founder awareness',
        'Growing venture capital activity',
        'Rising adoption of validation tools'
      ],
      drivers: [
        'Founder education',
        'Startup ecosystem growth',
        'Data-driven decision making'
      ],
    },
    competitiveAnalysis: {
      directCompetitors: ['Startup.ai', 'IdeaVault', 'ValidateHub'],
      gapAnalysis: [
        'Lack of AI-powered insights',
        'Poor founder UX',
        'Limited integrations'
      ],
      advantages: [
        'AI-powered analysis',
        'Founder-focused UX',
        'Real-time data integration'
      ],
    },
    businessModel: 'Freemium SaaS',
    pricingStrategy: {
      freetier: 'Free - 1 analysis/month',
      proTier: 'Pro - $99/month',
      enterprise: 'Custom enterprise pricing',
    },
    goToMarketStrategy: {
      channels: [
        'Direct to founders (Twitter, communities)',
        'Accelerator partnerships',
        'Content marketing',
        'Tool integrations'
      ],
      timeline: '6-12 months to PMF',
      budget: '$50K-100K initial',
    },
    riskAssessment: {
      marketRisk: 'Medium - Moderate competition',
      technicalRisk: 'Low - Proven technology',
      competitiveRisk: 'Medium - Well-funded competitors',
      fundingRisk: 'Low - Attractive market',
    },
    recommendations: [
      'Focus on user retention and product quality',
      'Build partnerships with top 10 accelerators',
      'Differentiate through AI-powered insights',
      'Plan Series A for Q3 2024',
    ],
  };
};

// Analyze Idea
exports.analyzeIdea = async (req, res) => {
  try {
    const { idea, audience, revenue } = req.body;

    if (!idea) {
      return res.status(400).json({ 
        success: false, 
        message: 'Idea description is required' 
      });
    }

    // Create new idea document
    const newIdea = new Idea({
      title: idea.substring(0, 100) || 'Untitled Idea',
      description: idea,
      targetAudience: audience || 'General',
      revenueModel: revenue || 'SaaS',
      userId: req.user?.id || null,
      viabilityScore: 78,
    });

    const savedIdea = await newIdea.save();

    // Generate analysis
    const analysisData = await generateAnalysis({ description: idea });
    const newAnalysis = new Analysis({
      ideaId: savedIdea._id,
      ...analysisData,
    });
    const savedAnalysis = await newAnalysis.save();

    // Update idea with analysis
    savedIdea.analysis = savedAnalysis._id;
    await savedIdea.save();

    res.status(201).json({
      success: true,
      message: 'Idea analyzed successfully',
      data: {
        ideaId: savedIdea._id,
        score: savedIdea.viabilityScore,
        analysis: savedAnalysis,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get Analysis by Idea ID
exports.getAnalysis = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const analysis = await Analysis.findOne({ ideaId }).populate('ideaId');

    if (!analysis) {
      return res.status(404).json({ 
        success: false, 
        message: 'Analysis not found' 
      });
    }

    res.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get All Ideas for User
exports.getUserIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ userId: req.user?.id }).populate('analysis');

    res.json({
      success: true,
      count: ideas.length,
      data: ideas,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

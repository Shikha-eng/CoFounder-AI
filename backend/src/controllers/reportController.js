const Idea = require('../models/Idea');
const Analysis = require('../models/Analysis');

// Generate Full Report
exports.generateReport = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const idea = await Idea.findById(ideaId).populate('analysis');

    if (!idea) {
      return res.status(404).json({ 
        success: false, 
        message: 'Idea not found' 
      });
    }

    const report = {
      ideaId: idea._id,
      title: idea.title,
      description: idea.description,
      createdAt: idea.createdAt,
      score: idea.viabilityScore,
      analysis: idea.analysis || {},
      executiveSummary: `
        This report provides a comprehensive analysis of your startup idea: "${idea.description.substring(0, 100)}..."
        
        Overall Viability Score: ${idea.viabilityScore}/100 — Your startup shows strong fundamentals with proven market need.
      `,
      sections: {
        market: {
          title: 'Market Analysis',
          tamSize: idea.marketSize,
          growthRate: idea.growthRate,
          saturation: idea.saturation,
          drivers: [
            'Increasing founder awareness',
            'Growing venture capital activity',
            'Rising demand for validation tools'
          ],
        },
        competitive: {
          title: 'Competitive Landscape',
          competitors: 6,
          saturation: idea.saturation,
          competition: 'Moderate',
          advantages: [
            'AI-powered insights',
            'Founder-focused UX',
            'Real-time market data'
          ],
        },
        business: {
          title: 'Business Model & Pricing',
          model: 'Freemium SaaS',
          tiers: {
            free: '1 analysis/month',
            pro: '$99/month - Unlimited',
            enterprise: 'Custom pricing'
          },
          projections: {
            currentMRR: '$24K',
            growth: '40% MoM',
            projectedARR: '$500K'
          },
        },
        goToMarket: {
          title: 'Go-To-Market Strategy',
          channels: [
            'Founder communities',
            'Accelerator partnerships',
            'Content marketing',
            'API integrations'
          ],
          timeline: '6-12 months',
        },
        risks: {
          title: 'Risk Assessment',
          marketRisk: 'Medium',
          technicalRisk: 'Low',
          competitiveRisk: 'Medium',
          fundingRisk: 'Low',
        },
        recommendations: [
          'Focus on user retention',
          'Partner with top accelerators',
          'Build AI-powered differentiation',
          'Plan Series A for Q3 2024'
        ],
      },
    };

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Export Report as PDF (placeholder)
exports.exportReportPDF = async (req, res) => {
  try {
    const { ideaId } = req.params;

    res.json({
      success: true,
      message: 'PDF export coming soon',
      downloadUrl: `/reports/${ideaId}.pdf`,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get Report Summary
exports.getReportSummary = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const idea = await Idea.findById(ideaId);

    if (!idea) {
      return res.status(404).json({ 
        success: false, 
        message: 'Idea not found' 
      });
    }

    res.json({
      success: true,
      data: {
        ideaId: idea._id,
        title: idea.title,
        score: idea.viabilityScore,
        marketSize: idea.marketSize,
        growthRate: idea.growthRate,
        riskLevel: idea.riskLevel,
        createdAt: idea.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

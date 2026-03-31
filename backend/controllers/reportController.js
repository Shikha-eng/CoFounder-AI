const Idea = require('../models/Idea');

exports.generateReport = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.ideaId);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (idea.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const report = {
      title: `${idea.description.substring(0, 50)}... Analysis Report`,
      executiveSummary: `This report analyzes your startup idea: "${idea.description.substring(0, 100)}..."`,
      description: idea.description,
      targetAudience: idea.targetAudience,
      revenueModel: idea.revenueModel,
      viabilityScore: idea.viabilityScore || 75,
      marketAnalysis: {
        marketSize: idea.marketSize || '$2.4B',
        growthRate: idea.growthRate || '24% YoY',
        saturation: 'Moderate',
        tam: '$4.8B',
        totalCompanies: 1200,
        annualFunding: '$480M'
      },
      competitiveAnalysis: {
        totalCompetitors: 6,
        directCompetitors: 3,
        competitionLevel: idea.competitionLevel || 'Moderate',
        advantages: [
          'AI-powered insights',
          'Founder-focused UX',
          'Real-time data',
          'Affordable pricing'
        ],
        marketGaps: [
          'Offline functionality',
          'Mobile-first design',
          'Better integrations',
          'Community features'
        ]
      },
      businessModel: {
        type: 'SaaS',
        pricingTiers: [
          { name: 'Free', price: '$0', features: 1 },
          { name: 'Pro', price: '$99/month', features: 10 },
          { name: 'Enterprise', price: 'Custom', features: 100 }
        ],
        revenue: '$500K ARR in 18 months'
      },
      riskAssessment: idea.risks || [
        { category: 'Market', level: 'Medium', description: 'Market education needed' },
        { category: 'Technical', level: 'Low', description: 'Feasible with current stack' },
        { category: 'Competitive', level: 'Medium', description: 'Response from larger players' }
      ],
      recommendations: idea.recommendations || [
        'Focus on MVP with core features',
        'Build partnerships with accelerators',
        'Plan Series A for Q3 2026',
        'Expand to 5 key markets'
      ],
      timeline: [
        { phase: 'Foundation', duration: '0-3 months', milestones: ['MVP ready', 'Team assembled'] },
        { phase: 'Launch', duration: '3-6 months', milestones: ['Beta launch', 'First 500 users'] },
        { phase: 'Growth', duration: '6-12 months', milestones: ['5000 users', '$50K MRR'] },
        { phase: 'Scale', duration: '12+ months', milestones: ['Series A', '50K users'] }
      ],
      generatedAt: new Date(),
      reportId: idea._id
    };

    res.json({
      message: 'Report generated successfully',
      report
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.ideaId);

    if (!idea) {
      return res.status(404).json({ error: 'Report not found' });
    }

    if (idea.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Return cached report or generate new one
    const report = {
      reportId: idea._id,
      title: `Analysis Report for ${idea.description.substring(0, 50)}`,
      viabilityScore: idea.viabilityScore,
      marketSize: idea.marketSize,
      growthRate: idea.growthRate,
      risks: idea.risks,
      recommendations: idea.recommendations,
      generatedAt: idea.updatedAt
    };

    res.json({ report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.exportPDF = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.ideaId);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (idea.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // TODO: Implement PDF generation (use pdfkit or similar)
    res.json({
      message: 'PDF export feature coming soon',
      ideaId: idea._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: true,
  },
  executiveSummary: String,
  marketAnalysis: {
    tamSize: String,
    growthRate: String,
    saturation: Number,
    trends: [String],
    drivers: [String],
  },
  competitiveAnalysis: {
    directCompetitors: [String],
    gapAnalysis: [String],
    advantages: [String],
  },
  businessModel: {
    type: String,
    enum: ['Freemium SaaS', 'B2B SaaS', 'B2C', 'Marketplace', 'Custom'],
    default: 'Freemium SaaS',
  },
  pricingStrategy: {
    freetier: String,
    proTier: String,
    enterprise: String,
  },
  goToMarketStrategy: {
    channels: [String],
    timeline: String,
    budget: String,
  },
  riskAssessment: {
    marketRisk: String,
    technicalRisk: String,
    competitiveRisk: String,
    fundingRisk: String,
  },
  recommendations: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Analysis', analysisSchema);

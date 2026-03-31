const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  targetAudience: String,
  revenueModel: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  viabilityScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  marketSize: {
    type: String,
    default: '$2.4B',
  },
  growthRate: {
    type: String,
    default: '24%',
  },
  saturation: {
    type: Number,
    default: 4.2,
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  competitors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competitor',
    },
  ],
  marketInsights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Insight',
    },
  ],
  analysis: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analysis',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Idea', ideaSchema);

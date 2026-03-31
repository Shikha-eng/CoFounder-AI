const mongoose = require('mongoose');

const competitorSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
  },
  name: {
    type: String,
    required: true,
  },
  similarity: {
    type: Number,
    min: 0,
    max: 100,
  },
  fundingStage: {
    type: String,
    enum: ['Bootstrapped', 'Seed', 'Series A', 'Series B', 'Series C+'],
  },
  totalFunding: String,
  description: String,
  strengths: [String],
  weaknesses: [String],
  tags: [String],
  website: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Competitor', competitorSchema);

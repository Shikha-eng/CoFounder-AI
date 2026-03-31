const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  targetAudience: {
    type: String,
    required: true
  },
  revenueModel: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['AI/ML SaaS', 'E-Commerce Tool', 'Analytics Platform', 'Other'],
    default: 'Other'
  },
  viabilityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  marketSize: {
    type: String
  },
  growthRate: {
    type: String
  },
  competitionLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High']
  },
  risks: [{
    category: String,
    level: String,
    description: String
  }],
  recommendations: [String],
  competitors: [{
    name: String,
    similarity: Number,
    funding: String,
    stage: String
  }],
  status: {
    type: String,
    enum: ['draft', 'analyzed', 'archived'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Idea', ideaSchema);

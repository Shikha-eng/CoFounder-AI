const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    enum: ['Market', 'Trends', 'Innovation', 'Geography', 'Pricing', 'Growth'],
  },
  impact: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  icon: String,
  relevance: {
    type: Number,
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Insight', insightSchema);

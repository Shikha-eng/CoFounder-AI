const Idea = require('../models/Idea');
const User = require('../models/User');

exports.createIdea = async (req, res) => {
  try {
    const { title, description, targetAudience, revenueModel, category } = req.body;

    if (!description || !targetAudience || !revenueModel) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const idea = new Idea({
      userId: req.userId,
      title: title || 'Untitled Idea',
      description,
      targetAudience,
      revenueModel,
      category: category || 'Other'
    });

    await idea.save();

    // Add to user's ideas
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { ideas: idea._id } },
      { new: true }
    );

    res.status(201).json({
      message: 'Idea created successfully',
      idea
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.json({
      count: ideas.length,
      ideas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (idea.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({ idea });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIdea = async (req, res) => {
  try {
    let idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (idea.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, updatedAt: Date.now() },
      { new: true }
    );

    res.json({
      message: 'Idea updated successfully',
      idea
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (idea.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Idea.findByIdAndDelete(req.params.id);

    // Remove from user's ideas
    await User.findByIdAndUpdate(
      req.userId,
      { $pull: { ideas: req.params.id } }
    );

    res.json({ message: 'Idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

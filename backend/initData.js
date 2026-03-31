const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Idea = require('./models/Idea');

// Sample dummy data
const DUMMY_DATA = {
  users: [
    {
      name: 'Sarah Chen',
      email: 'sarah@startup.com',
      password: 'password123',
      company: 'TechVentures Inc',
      role: 'founder',
      tier: 'pro',
      credits: 150
    },
    {
      name: 'Alex Rodriguez',
      email: 'alex@startup.com',
      password: 'password123',
      company: 'InnovateCo',
      role: 'founder',
      tier: 'enterprise',
      credits: 500
    }
  ],
  ideas: [
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'A real-time analytics platform using ML for business insights for SMBs',
      category: 'AI/ML SaaS',
      targetAudience: 'SMBs',
      revenueModel: 'SaaS subscription',
      viabilityScore: 82,
      marketSize: '$2.5B',
      growthRate: '32%',
      competitionLevel: 'High',
      risks: [
        { category: 'Market', level: 'High', description: 'High market competition' },
        { category: 'Technical', level: 'Medium', description: 'Capital intensive' },
        { category: 'Resource', level: 'Medium', description: 'Need strong data team' }
      ],
      recommendations: ['Focus on underserved niche', 'Build partnerships', 'Invest in algorithms'],
      competitors: [
        { name: 'Tableau', similarity: 85, funding: '$1.2B', stage: 'Mature' },
        { name: 'Looker', similarity: 82, funding: '$Google', stage: 'Acquired' }
      ],
      status: 'analyzed'
    },
    {
      title: 'E-Commerce Inventory Manager',
      description: 'Smart inventory management for online retailers using predictive analytics',
      category: 'E-Commerce Tool',
      targetAudience: 'E-commerce businesses',
      revenueModel: 'Subscription + Usage fees',
      viabilityScore: 76,
      marketSize: '$3.1B',
      growthRate: '28%',
      competitionLevel: 'High',
      risks: [
        { category: 'Market', level: 'High', description: 'Intense competition' },
        { category: 'Integration', level: 'Medium', description: 'Complex integrations needed' }
      ],
      recommendations: ['Partner with e-commerce platforms', 'Offer white-label', 'Target SMB shops'],
      competitors: [
        { name: 'TradeGecko', similarity: 78, funding: '$50M', stage: 'Late Stage' },
        { name: 'Shopify Inventory', similarity: 72, funding: 'Shopify', stage: 'Built-in' }
      ],
      status: 'analyzed'
    },
    {
      title: 'Business Intelligence Platform',
      description: 'Analytics platform providing insights across all business metrics',
      category: 'Analytics Platform',
      targetAudience: 'Mid-size enterprises',
      revenueModel: 'Enterprise licensing',
      viabilityScore: 79,
      marketSize: '$4.5B',
      growthRate: '35%',
      competitionLevel: 'High',
      risks: [
        { category: 'Market', level: 'High', description: 'Established competitors' },
        { category: 'Sales', level: 'High', description: 'Long sales cycles' }
      ],
      recommendations: ['Focus on vertical markets', 'Build customization', 'Strong support team'],
      competitors: [
        { name: 'Power BI', similarity: 80, funding: 'Microsoft', stage: 'Mature' },
        { name: 'Sisense', similarity: 77, funding: '$590M', stage: 'Growth' }
      ],
      status: 'analyzed'
    },
    {
      title: 'AI Marketing Automation',
      description: 'AI-powered platform for email and social media marketing automation',
      category: 'AI/ML SaaS',
      targetAudience: 'Marketing teams and agencies',
      revenueModel: 'Subscription based',
      viabilityScore: 81,
      marketSize: '$2.8B',
      growthRate: '40%',
      competitionLevel: 'High',
      risks: [
        { category: 'Market', level: 'High', description: 'AI/ML marketing crowded' },
        { category: 'Technical', level: 'Medium', description: 'Model accuracy critical' }
      ],
      recommendations: ['Specialize in specific industry', 'Build integrations', 'Invest in ML talent'],
      competitors: [
        { name: 'HubSpot', similarity: 75, funding: '$1.6B', stage: 'Public' },
        { name: 'Marketo', similarity: 72, funding: 'Adobe', stage: 'Acquired' }
      ],
      status: 'analyzed'
    },
    {
      title: 'Sustainable Logistics Solutions',
      description: 'Carbon-neutral shipping and logistics optimization platform',
      category: 'Other',
      targetAudience: 'Enterprise logistics companies',
      revenueModel: 'Per-shipment fees',
      viabilityScore: 71,
      marketSize: '$8.2B',
      growthRate: '28%',
      competitionLevel: 'Medium',
      risks: [
        { category: 'Regulatory', level: 'Medium', description: 'Environmental regulations' },
        { category: 'Operational', level: 'High', description: 'Supply chain complexity' }
      ],
      recommendations: ['Partner with logistics leaders', 'Get certifications', 'Target premium segment'],
      competitors: [
        { name: 'DHL GoGreen', similarity: 65, funding: 'DHL', stage: 'In-house' },
        { name: 'Shippeo', similarity: 58, funding: '$100M', stage: 'Growth' }
      ],
      status: 'analyzed'
    },
    {
      title: 'Remote Team Collaboration Tool',
      description: 'All-in-one platform for remote teams with async communication and project management',
      category: 'AI/ML SaaS',
      targetAudience: 'Distributed remote teams',
      revenueModel: 'Freemium + Premium tiers',
      viabilityScore: 74,
      marketSize: '$3.5B',
      growthRate: '41%',
      competitionLevel: 'High',
      risks: [
        { category: 'Market', level: 'High', description: 'Slack, Teams dominate' },
        { category: 'Retention', level: 'High', description: 'User churn risk' }
      ],
      recommendations: ['Focus on specific use case', 'Build strong community', 'Freemium strategy'],
      competitors: [
        { name: 'Slack', similarity: 81, funding: '$7.1B', stage: 'Public' },
        { name: 'Microsoft Teams', similarity: 78, funding: 'Microsoft', stage: 'In-house' }
      ],
      status: 'analyzed'
    },
    {
      title: 'Healthcare Data Integration',
      description: 'Secure platform for integrating and managing healthcare data across providers',
      category: 'Analytics Platform',
      targetAudience: 'Healthcare providers and insurers',
      revenueModel: 'Enterprise licensing per provider',
      viabilityScore: 78,
      marketSize: '$5.2B',
      growthRate: '38%',
      competitionLevel: 'Medium',
      risks: [
        { category: 'Regulatory', level: 'Critical', description: 'HIPAA compliance complex' },
        { category: 'Technical', level: 'High', description: 'Legacy system integration' }
      ],
      recommendations: ['Get HIPAA certified early', 'Hire compliance experts', 'Build relationships with providers'],
      competitors: [
        { name: 'Health Catalyst', similarity: 72, funding: '$1.5B', stage: 'Growth' },
        { name: 'Allscripts', similarity: 68, funding: '$4.4B', stage: 'Mature' }
      ],
      status: 'analyzed'
    },
    {
      title: 'AI-Powered Coding Assistant',
      description: 'AI assistant for developers that generates code, finds bugs, and suggests optimizations',
      category: 'AI/ML SaaS',
      targetAudience: 'Software developers and engineering teams',
      revenueModel: 'Subscription per developer',
      viabilityScore: 85,
      marketSize: '$2.5B',
      growthRate: '55%',
      competitionLevel: 'High',
      risks: [
        { category: 'Market', level: 'High', description: 'GitHub Copilot and OpenAI dominate' },
        { category: 'Technical', level: 'Medium', description: 'AI model quality critical' }
      ],
      recommendations: ['Focus on language/framework specialization', 'Build IDE integrations', 'Strong community'],
      competitors: [
        { name: 'GitHub Copilot', similarity: 92, funding: 'GitHub/OpenAI', stage: 'Market Leader' },
        { name: 'Tabnine', similarity: 85, funding: '$16M', stage: 'Growth' }
      ],
      status: 'analyzed'
    }
  ]
};

// Initialize dummy data if no data exists
const initializeDummyData = async () => {
  try {
    const User = require('./models/User');
    const Idea = require('./models/Idea');
    
    const userCount = await User.countDocuments();
    
    if (userCount === 0) {
      console.log('🌱 Initializing dummy data...');
      
      // Create users (password will be hashed by pre-save hook)
      const createdUsers = [];
      for (const userData of DUMMY_DATA.users) {
        const user = await User.create({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          company: userData.company,
          role: userData.role,
          tier: userData.tier,
          credits: userData.credits
        });
        createdUsers.push(user);
        console.log(`  ✅ Created user: ${user.email}`);
      }

      // Create ideas
      const ideas = [];
      for (let i = 0; i < DUMMY_DATA.ideas.length; i++) {
        const idea = await Idea.create({
          ...DUMMY_DATA.ideas[i],
          userId: createdUsers[i % createdUsers.length]._id
        });
        ideas.push(idea);
        console.log(`  ✅ Created idea: ${idea.title}`);
      }

      // Link ideas to users
      for (let i = 0; i < createdUsers.length; i++) {
        const userIdeas = ideas.filter((_, idx) => idx % createdUsers.length === i);
        await User.findByIdAndUpdate(
          createdUsers[i]._id,
          { $set: { ideas: userIdeas.map(idea => idea._id) } }
        );
      }

      console.log(`\n✅ Dummy data initialized!`);
      console.log(`\n🧪 Test Credentials:`);
      DUMMY_DATA.users.forEach(user => {
        console.log(`  Email: ${user.email} | Password: ${user.password}`);
      });
    } else {
      console.log('✅ Database already has data, skipping initialization');
    }
  } catch (error) {
    console.error('⚠️ Error initializing dummy data:', error.message);
  }
};

module.exports = {
  initializeDummyData,
  DUMMY_DATA
};

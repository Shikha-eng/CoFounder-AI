const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Models
const User = require('./models/User');
const Idea = require('./models/Idea');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cofoundr-ai')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Dummy Users Data
const dummyUsers = [
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
  },
  {
    name: 'Jordan Kim',
    email: 'jordan@startup.com',
    password: 'password123',
    company: 'StartupHub',
    role: 'advisor',
    tier: 'free',
    credits: 50
  }
];

// Dummy Ideas Data
const dummyIdeas = [
  {
    title: 'AI-Powered Analytics Dashboard',
    description: 'A real-time analytics platform that uses machine learning to provide actionable business insights for SMBs. Features include custom dashboards, predictive analytics, and automated reporting.',
    category: 'AI/ML',
    targetAudience: 'Small and medium businesses (10-500 employees)',
    revenueModel: 'SaaS subscription (monthly/annual)',
    viabilityScore: 82,
    marketSize: '$2.5B',
    growthRate: 32,
    competitionLevel: 'High',
    risks: [
      'High market competition from established players',
      'Significant capital requirements for ML infrastructure',
      'Need for strong data science team'
    ],
    recommendations: [
      'Focus on underserved B2B niche (vertical SaaS)',
      'Build strategic partnerships with industry leaders',
      'Invest in proprietary algorithms for differentiation'
    ],
    status: 'analyzed'
  },
  {
    title: 'Sustainable Packaging Solutions',
    description: 'Eco-friendly packaging materials made from recycled ocean plastics and agricultural waste. Targeting e-commerce and logistics companies looking to reduce environmental impact.',
    category: 'Green Tech',
    targetAudience: 'E-commerce platforms and logistics companies',
    revenueModel: 'B2B sales with volume discounts',
    viabilityScore: 71,
    marketSize: '$8.2B',
    growthRate: 28,
    competitionLevel: 'Medium',
    risks: [
      'Supply chain complexity for sourcing materials',
      'Price sensitivity in competitive market',
      'Manufacturing scalability challenges'
    ],
    recommendations: [
      'Partner with waste management companies',
      'Certify with environmental bodies (B Corp, ISO)',
      'Target premium segments first (higher margins)'
    ],
    status: 'analyzed'
  },
  {
    title: 'Virtual Event Management Platform',
    description: 'All-in-one platform for hosting, managing, and analyzing virtual conferences and webinars. Includes networking features, interactive booths, and real-time analytics.',
    category: 'Software/SaaS',
    targetAudience: 'Corporate event organizers and conference producers',
    revenueModel: 'SaaS platform with transaction fees',
    viabilityScore: 76,
    marketSize: '$1.8B',
    growthRate: 25,
    competitionLevel: 'High',
    risks: [
      'Competition from established players (Zoom, Hopin)',
      'Technology complexity (streaming, networking)',
      'Need for robust customer support'
    ],
    recommendations: [
      'Target industry-specific events (healthcare, fintech)',
      'Build integrations with popular tools',
      'Offer white-label solutions for enterprises'
    ],
    status: 'analyzed'
  },
  {
    title: 'Personal Finance AI Assistant',
    description: 'An AI-powered personal finance advisor that analyzes spending patterns, suggests investments, and automates savings. Uses natural language processing for user interaction.',
    category: 'FinTech',
    targetAudience: 'Millennials and Gen Z (18-35 years old)',
    revenueModel: 'Freemium with premium financial advisory',
    viabilityScore: 78,
    marketSize: '$4.1B',
    growthRate: 38,
    competitionLevel: 'High',
    risks: [
      'Regulatory compliance in financial services',
      'Data security and privacy concerns',
      'User acquisition cost in competitive market'
    ],
    recommendations: [
      'Obtain financial advisory licenses early',
      'Implement bank-level security measures',
      'Partner with established financial institutions'
    ],
    status: 'analyzed'
  },
  {
    title: 'Marketplace for Remote Developers',
    description: 'A specialized platform connecting vetted remote developers with companies. Features skill-based matching, time tracking, and escrow payments.',
    category: 'Software/SaaS',
    targetAudience: 'Tech startups and enterprises needing remote talent',
    revenueModel: 'Take 20% commission on hourly rates',
    viabilityScore: 85,
    marketSize: '$3.2B',
    growthRate: 42,
    competitionLevel: 'Medium',
    risks: [
      'Competition from Upwork and similar platforms',
      'Developer retention and quality consistency',
      'Payment processing and international compliance'
    ],
    recommendations: [
      'Focus on quality over quantity (all developers vetted)',
      'Build strong community features',
      'Target underserved geographic regions'
    ],
    status: 'analyzed'
  },
  {
    title: 'Supply Chain Blockchain Solution',
    description: 'Blockchain-based solution for transparent supply chain tracking. Enables real-time visibility from manufacturing to delivery with immutable record-keeping.',
    category: 'Blockchain',
    targetAudience: 'Large manufacturing and logistics companies',
    revenueModel: 'Per-shipment fees and implementation services',
    viabilityScore: 68,
    marketSize: '$9.8B',
    growthRate: 35,
    competitionLevel: 'Medium',
    risks: [
      'Blockchain adoption still nascent in industry',
      'Integration with legacy systems challenging',
      'Regulatory uncertainty around blockchain'
    ],
    recommendations: [
      'Start with pilot programs with enterprise customers',
      'Partner with blockchain infrastructure providers',
      'Focus on compliance and audit trail benefits'
    ],
    status: 'analyzed'
  },
  {
    title: 'Mental Health App for Teens',
    description: 'Mental health support platform designed specifically for teenagers with anonymous peer communities, guided meditations, and access to licensed therapists.',
    category: 'HealthTech',
    targetAudience: 'Teenagers (13-19 years old) and parents',
    revenueModel: 'Freemium with premium therapy sessions and school licenses',
    viabilityScore: 79,
    marketSize: '$5.2B',
    growthRate: 45,
    competitionLevel: 'High',
    risks: [
      'HIPAA and youth privacy regulations',
      'Liability for mental health emergencies',
      'Trust-building with parents and schools'
    ],
    recommendations: [
      'Partner with schools for bulk licenses',
      'Hire licensed mental health professionals',
      'Implement crisis intervention protocols'
    ],
    status: 'analyzed'
  },
  {
    title: 'AI Content Generator for Marketing',
    description: 'AI tool that generates personalized marketing content (emails, social posts, ad copy) based on brand voice and campaign goals. Uses advanced NLP and machine learning.',
    category: 'AI/ML',
    targetAudience: 'Marketing agencies and in-house marketing teams',
    revenueModel: 'Subscription per team size with usage limits',
    viabilityScore: 81,
    marketSize: '$2.8B',
    growthRate: 40,
    competitionLevel: 'High',
    risks: [
      'Competition from ChatGPT and similar tools',
      'Content quality consistency issues',
      'Need for continuous model training'
    ],
    recommendations: [
      'Build industry-specific models (real estate, e-commerce)',
      'Focus on brand voice training and customization',
      'Offer API for agency integration'
    ],
    status: 'analyzed'
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Idea.deleteMany({});

    // Create users (password will be hashed by pre-save hook)
    console.log('👥 Creating users...');
    const createdUsers = [];
    for (const userData of dummyUsers) {
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
    console.log('💡 Creating ideas...');
    const ideas = [];
    for (let i = 0; i < dummyIdeas.length; i++) {
      const idea = await Idea.create({
        ...dummyIdeas[i],
        userId: createdUsers[i % createdUsers.length]._id
      });
      ideas.push(idea);
      console.log(`  ✅ Created idea: ${idea.title}`);
    }

    // Update users with their ideas
    console.log('🔗 Linking ideas to users...');
    for (let i = 0; i < createdUsers.length; i++) {
      const userIdeas = ideas.filter((_, idx) => idx % createdUsers.length === i);
      await User.findByIdAndUpdate(
        createdUsers[i]._id,
        { $set: { ideas: userIdeas.map(i => i._id) } }
      );
    }

    console.log('\n✅ Database seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`  • Users created: ${createdUsers.length}`);
    console.log(`  • Ideas created: ${ideas.length}`);
    console.log(`\n📝 Test Credentials:`);
    dummyUsers.forEach(user => {
      console.log(`  • Email: ${user.email} | Password: ${user.password}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed
seedDatabase();

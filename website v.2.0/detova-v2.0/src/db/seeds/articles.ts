import { db } from '@/db';
import { articles } from '@/db/schema';

async function main() {
    const sampleArticles = [
        {
            title: 'Building the Future with Web3 Technology',
            slug: 'building-future-web3-technology',
            summary: 'Explore how Web3 is revolutionizing the internet with decentralized protocols and blockchain technology.',
            content: 'Web3 represents the next evolution of the internet, built on decentralized protocols and blockchain technology. At Detova Labs, we\'re at the forefront of this revolution, creating tools and platforms that empower users with true ownership of their data and digital assets. This new paradigm shifts power from centralized corporations to individual users, enabling peer-to-peer interactions without intermediaries. From smart contracts to decentralized finance (DeFi), Web3 is opening up unprecedented opportunities for innovation and democratization of digital services.',
            author: 'Sarah Chen',
            status: 'published',
            createdAt: new Date('2024-11-15').toISOString(),
        },
        {
            title: 'AI-Powered Development Tools: The Next Generation',
            slug: 'ai-powered-development-tools',
            summary: 'Discover how artificial intelligence is transforming software development workflows and boosting developer productivity.',
            content: 'Artificial intelligence is fundamentally changing how we build software. Modern AI-powered development tools can understand context, suggest intelligent code completions, identify bugs before they happen, and even generate entire functions from natural language descriptions. At Detova Labs, we\'re integrating AI capabilities into our development workflow, allowing our team to focus on creative problem-solving rather than repetitive tasks. These tools don\'t replace developers—they amplify our capabilities, helping us ship better products faster while maintaining high quality standards.',
            author: 'Marcus Rodriguez',
            status: 'published',
            createdAt: new Date('2024-12-02').toISOString(),
        },
        {
            title: 'Decentralized Applications: Building for User Sovereignty',
            slug: 'decentralized-applications-user-sovereignty',
            summary: 'Learn why decentralized applications (dApps) are essential for creating a more open and user-centric digital future.',
            content: 'Decentralized applications represent a fundamental shift in how we think about software. Unlike traditional applications that rely on centralized servers controlled by single entities, dApps run on distributed networks where no single party has complete control. This architecture provides several key benefits: censorship resistance, transparency, data ownership, and trustless interactions. At Detova Labs, we believe in building applications that put users first, giving them full control over their data and digital identity. Our dApp projects leverage blockchain technology to create experiences that are both powerful and privacy-preserving.',
            author: 'Emma Thompson',
            status: 'published',
            createdAt: new Date('2024-12-18').toISOString(),
        }
    ];

    await db.insert(articles).values(sampleArticles);
    
    console.log('✅ Articles seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
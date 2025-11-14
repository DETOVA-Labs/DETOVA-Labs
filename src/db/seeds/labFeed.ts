import { db } from '@/db';
import { labFeed } from '@/db/schema';

async function main() {
    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);

    const sampleLabFeed = [
        {
            text: 'Experimenting with new AI models for code generation - initial results are promising with 85% accuracy on complex function generation',
            link: null,
            createdAt: threeDaysAgo.toISOString(),
        },
        {
            text: 'Just deployed our decentralized identity protocol to testnet. Testing phase begins next week!',
            link: 'https://testnet.detovalabs.com/identity',
            createdAt: twoDaysAgo.toISOString(),
        },
        {
            text: 'Published open-source library for Web3 authentication flows. Check out the GitHub repo and contribute!',
            link: 'https://github.com/detovalabs/web3-auth',
            createdAt: oneDayAgo.toISOString(),
        },
    ];

    await db.insert(labFeed).values(sampleLabFeed);
    
    console.log('✅ Lab feed seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
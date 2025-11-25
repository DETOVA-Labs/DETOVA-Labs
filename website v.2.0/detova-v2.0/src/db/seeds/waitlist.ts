import { db } from '@/db';
import { waitlist } from '@/db/schema';

async function main() {
    const sampleWaitlist = [
        {
            email: 'developer1@email.com',
            source: 'homepage',
            createdAt: new Date('2024-11-15T10:30:00Z').toISOString(),
        },
        {
            email: 'early.adopter@gmail.com',
            source: 'twitter',
            createdAt: new Date('2024-11-20T14:45:00Z').toISOString(),
        },
        {
            email: 'web3.enthusiast@proton.me',
            source: 'blog',
            createdAt: new Date('2024-11-25T09:15:00Z').toISOString(),
        },
        {
            email: 'startup.founder@company.io',
            source: 'homepage',
            createdAt: new Date('2024-12-02T16:20:00Z').toISOString(),
        },
        {
            email: 'tech.investor@vc.com',
            source: 'linkedin',
            createdAt: new Date('2024-12-08T11:00:00Z').toISOString(),
        },
    ];

    await db.insert(waitlist).values(sampleWaitlist);
    
    console.log('✅ Waitlist seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
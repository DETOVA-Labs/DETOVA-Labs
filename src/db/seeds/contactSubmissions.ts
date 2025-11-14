import { db } from '@/db';
import { contactSubmissions } from '@/db/schema';

async function main() {
    const sampleContacts = [
        {
            name: 'Sarah Johnson',
            email: 'sarah.j@techcorp.com',
            type: 'Partnership Inquiry',
            message: 'Hi Detova Labs team, I\'m reaching out on behalf of TechCorp to explore potential partnership opportunities. We\'re impressed by your work in Web3 and would love to discuss collaboration possibilities.',
            status: 'unread',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            name: 'Mike Chen',
            email: 'mike.chen@startup.io',
            type: 'Technical Support',
            message: 'I\'m having issues integrating the Detova API with our application. Specifically, the authentication flow is returning a 401 error even with valid credentials. Could someone from your support team help troubleshoot?',
            status: 'unread',
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        }
    ];

    await db.insert(contactSubmissions).values(sampleContacts);
    
    console.log('✅ Contact submissions seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
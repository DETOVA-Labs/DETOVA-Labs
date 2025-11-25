import { db } from '@/db';
import { internshipApplications } from '@/db/schema';

async function main() {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const sampleApplications = [
        {
            name: 'Alex Martinez',
            email: 'alex.martinez@email.com',
            location: 'San Francisco, CA',
            skills: 'React, TypeScript, Node.js, Blockchain Development',
            portfolio: 'https://alexmartinez.dev',
            why: "I'm passionate about Web3 technology and want to contribute to building decentralized applications that empower users. Detova Labs' mission aligns perfectly with my career goals.",
            availability: 'Available full-time starting June 2024',
            status: 'pending',
            createdAt: new Date(oneWeekAgo.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            name: 'Jordan Lee',
            email: 'jordan.lee@email.com',
            location: 'Austin, TX',
            skills: 'Python, Machine Learning, Data Science, API Development',
            portfolio: 'https://github.com/jordanlee',
            why: "I'm excited about the intersection of AI and decentralized systems. I believe Detova Labs is doing groundbreaking work and I'd love to learn from your team.",
            availability: 'Available part-time (20 hrs/week) immediately',
            status: 'pending',
            createdAt: new Date(twoWeeksAgo.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        }
    ];

    await db.insert(internshipApplications).values(sampleApplications);
    
    console.log('✅ Internship applications seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
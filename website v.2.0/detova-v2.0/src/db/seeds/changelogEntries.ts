import { db } from '@/db';
import { changelogEntries } from '@/db/schema';

async function main() {
    const sampleChangelogEntries = [
        {
            title: 'Integration with Web3 Wallets',
            content: 'Added support for MetaMask, WalletConnect, and Coinbase Wallet. Users can now seamlessly connect their crypto wallets for decentralized authentication and transactions.',
            createdAt: new Date('2024-12-18').toISOString(),
        },
        {
            title: 'Mobile App Performance Improvements',
            content: 'Optimized mobile app loading times by 40%, reduced memory usage, and fixed various UI bugs. Push notifications now work more reliably across all devices.',
            createdAt: new Date('2024-12-14').toISOString(),
        },
        {
            title: 'API v2.0 Launch',
            content: 'Released major API update with improved performance, better error handling, and expanded endpoints. Documentation has been updated with interactive examples and code snippets for all major languages.',
            createdAt: new Date('2024-12-09').toISOString(),
        },
        {
            title: 'Enhanced Security Features',
            content: 'Implemented two-factor authentication (2FA), advanced encryption for sensitive data, and automated security audits. All user sessions now use secure tokens with automatic expiration.',
            createdAt: new Date('2024-12-04').toISOString(),
        },
        {
            title: 'New Dashboard Analytics Released',
            content: 'Rolled out comprehensive analytics dashboard with real-time metrics, custom report generation, and data export capabilities. Users can now track key performance indicators and visualize trends.',
            createdAt: new Date('2024-11-28').toISOString(),
        },
    ];

    await db.insert(changelogEntries).values(sampleChangelogEntries);
    
    console.log('✅ Changelog entries seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
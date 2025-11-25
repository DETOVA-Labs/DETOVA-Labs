# Detova Labs Website v2.0

A modern, innovative website for Detova Labs - a global innovation studio building product-ready solutions across Web2 and Web3. This project showcases our expertise in Web3 gaming infrastructure, AI-powered tools, and decentralized applications.

## About Detova Labs

Detova Labs is a global innovation studio that builds and ships product-ready solutions across Web2 and Web3. We specialize in Web3 gaming infrastructure, AI-powered tools, and decentralized applications. Our mission is to transform ideas into production-ready applications through rapid prototyping, development, and deployment.

We believe in hands-on learning and provide a platform for the next generation of builders to create real products and verifiable portfolios. Our internship program focuses on shipping actual production applications, not busywork.

## Features

- **Next.js 15** with React 19 for optimal performance
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for responsive, modern styling
- **Framer Motion** for smooth animations and interactions
- **Drizzle ORM** with Turso database for data management
- **Firebase** integration for authentication and real-time features
- **Stripe** integration for payments
- **3D Cube Background** with custom animations
- **Responsive Design** that works on all devices
- **SEO Optimized** with proper meta tags and structured data
- **Dark/Light Theme** support
- **Newsletter Signup** with Firebase integration
- **Command Menu** for quick navigation
- **Interactive Components** built with Radix UI

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Turso (SQLite) with Drizzle ORM
- **Authentication:** Better Auth
- **Payments:** Stripe
- **Real-time:** Firebase
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber
- **UI Components:** Radix UI, shadcn/ui
- **Icons:** Lucide React, Tabler Icons

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DETOVA-Labs/DETOVA-Labs.git
   cd "website v.2.0\detova v2.0"
   ```

2. **Install dependencies:**
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install

   # Using bun (recommended)
   bun install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   # Database - Turso
   DATABASE_URL=libsql://detovadb-detova-labs.aws-us-east-1.turso.io

   #Firebase
   ```

4. **Set up the database:**
   ```bash
   # Push database schema
   npm run drizzle:push
   # or
   bun run drizzle:push
   ```

5. **Run the development server:**
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev

   # Using bun (recommended)
   bun dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run drizzle:push` - Push database schema changes

## Project Structure

```
detova-labs-website/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── (pages)/         # Route groups
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable components
│   │   ├── ui/            # shadcn/ui components
│   │   └── ...            # Custom components
│   ├── lib/               # Utility functions and configurations
│   └── db/                # Database schemas and configurations
├── public/                # Static assets
├── drizzle/               # Database migrations
└── ...config files
```

## Key Components

- **Header:** Navigation with command menu integration
- **Footer:** Newsletter signup and social links
- **CubeBackground:** Animated 3D cube background
- **CommandMenu:** Quick navigation and search
- **ThemeToggle:** Dark/light theme switching
- **SocialMediaLinks:** Animated social media icons

## Our Services

### Web3 Gaming Infrastructure
Building trust layers and autonomous market protocols for blockchain gaming economies. Our flagship product **Tavarn.AI** solves transparency issues in Web3 gaming ecosystems.

### AI-Powered Tools
Creating productivity tools powered by artificial intelligence, including pitch refinement tools, resume analyzers, content generation utilities, and automation frameworks for builders and entrepreneurs.

### Decentralized Applications
Developing smart contract systems, DeFi protocols, NFT platforms, and blockchain integrations that bring Web3 functionality to real-world use cases with a focus on user experience.

### Enterprise Software Solutions
Building custom software solutions for businesses including CRM systems, workflow automation platforms, data analytics dashboards, and integration middleware for legacy systems.

### Mobile Applications
Developing cross-platform mobile applications with React Native and Flutter, delivering native performance with unified codebases for iOS and Android platforms.

### API & Backend Services
Architecting scalable backend systems, RESTful and GraphQL APIs, microservices architectures, and serverless functions for modern web and mobile applications.

### DevOps & Cloud Infrastructure
Setting up CI/CD pipelines, containerized deployments with Docker and Kubernetes, cloud infrastructure on AWS, GCP, and Azure, and monitoring solutions.

### Data Science & Analytics
Building machine learning models, predictive analytics systems, data pipelines for ETL processes, and business intelligence dashboards for data-driven decision making.

### E-Commerce Platforms
Creating custom e-commerce solutions with secure payment gateways, inventory management systems, customer relationship tools, and multi-vendor marketplace platforms.

## Internship Program

We don't do coffee runs. Our interns **ship real products**. We provide a platform for you to build a verifiable portfolio and get a share in the revenue you help create.

Join our internship program and work on **actual production applications**, contribute to open-source projects, and learn from experienced developers in a fully remote environment. Build your portfolio while earning revenue share.

## Featured Project: Tavarn.AI

An autonomous market protocol for game economies built on Somnia blockchain. We're solving the systemic failures of trust and transparency in Web3 gaming through AI-powered market intelligence and on-chain verification systems.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- Self-hosted with Docker

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Open a Pull Request

## License

This project is private and proprietary to Detova Labs.

## Support

For support or questions, contact the Detova Labs team at [detovalab@gmail.com](mailto:detovalab@gmail.com) or visit our website at [detovalabs.xyz](https://detovalabs.xyz).

## Connect With Us

- **Website:** [detovalabs.xyz](https://detovalabs.xyz)
- **Twitter:** [@detovalabs](https://x.com/detovalabs)
- **YouTube:** [DetovaLab](https://www.youtube.com/@DetovaLab)
- **LinkedIn:** [DETOVA LABS](linkedin.com/company/detovalabs)
- **Email:** detovalab@gmail.com

---

*Built with ❤️ by the Detova Labs team*

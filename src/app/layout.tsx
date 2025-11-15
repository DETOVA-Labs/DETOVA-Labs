import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommandMenu from "@/components/CommandMenu";
import CubeBackground from "@/components/CubeBackground";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Detova Labs | Global Innovation Studio Building Web2 & Web3 Solutions",
  description: "Detova Labs is a global innovation studio that builds and ships product-ready solutions across Web2 and Web3. We specialize in Web3 gaming infrastructure, AI-powered tools, and decentralized applications. Join our internship program where you build real products and create verifiable portfolios.",
  keywords: ["Detova Labs", "Web3 development", "Web2 solutions", "innovation studio", "blockchain development", "Web3 gaming", "AI tools", "tech internship", "product development", "Tavarn.AI", "decentralized applications", "smart contracts", "startup studio"],
  authors: [{ name: "Detova Labs" }],
  creator: "Detova Labs",
  publisher: "Detova Labs",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://detovalabs.com",
    title: "Detova Labs | Global Innovation Studio",
    description: "A global innovation studio building product-ready solutions across Web2 and Web3",
    siteName: "Detova Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Detova Labs | Global Innovation Studio",
    description: "Building product-ready solutions across Web2 and Web3",
    creator: "@detovalabs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://detovalabs.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <CubeBackground />
        <Header />
        <CommandMenu />
        <main className="min-h-screen pt-16 relative z-10">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'white',
              color: 'var(--deep-grey)',
              border: '1px solid var(--border-color)',
            },
            success: {
              iconTheme: {
                primary: 'var(--acid-lime)',
                secondary: 'var(--carbon)',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SupportWidget from "./components/SupportWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ark Shield Tech | Cybersecurity Diagnostics & Forensic Ledger Audits",
  description: "Professional digital diagnostics, transaction telemetry auditing, and secure validator node monitoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "SecurityService",
    "name": "Ark Shield Tech",
    "description": "Professional digital diagnostics, transaction telemetry auditing, and secure validator node monitoring.",
    "provider": {
      "@type": "Organization",
      "name": "Ark Shield Tech",
      "url": "https://arkshield.tech"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cybersecurity and Auditing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Forensic Ledger Audits",
            "description": "Transaction path analysis and address telemetry verification."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Device Security Auditing",
            "description": "Diagnostics for unauthorized configuration changes and telemetry leaks."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Escrow Validator Nodes",
            "description": "Double-escrow validator node allocations and performance tracking."
          }
        }
      ]
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark scroll-smooth h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
      </head>
      <body className="bg-brand-dark text-gray-100 font-sans min-h-screen flex flex-col antialiased selection:bg-cyber-cyan/30 selection:text-white">
        {/* Futuristic Cyber Overlay Grid */}
        <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-40" />
        
        {/* Subtle Ambient Glow Backgrounds */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-spy-purple/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <Navbar />
        <main className="relative z-10 flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <SupportWidget />
      </body>
    </html>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X, Terminal, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Asset Recovery", href: "/recovery" },
  { name: "Relationship Forensics", href: "/forensics" },
  { name: "Wealth Vault", href: "/vault" },
  { name: "About Us", href: "/about" },
  { name: "Secure Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Wallet States
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Sync wallet state from local storage
  useEffect(() => {
    const checkWallet = () => {
      const saved = localStorage.getItem("ark_shield_wallet");
      if (saved) {
        setIsConnected(true);
        setWalletAddress(saved);
      } else {
        setIsConnected(false);
        setWalletAddress("");
      }
    };
    
    checkWallet();
    
    window.addEventListener("ark_shield_wallet_update", checkWallet);
    return () => window.removeEventListener("ark_shield_wallet_update", checkWallet);
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem("ark_shield_wallet");
    setIsConnected(false);
    setWalletAddress("");
    window.dispatchEvent(new Event("ark_shield_wallet_update"));
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-cyan to-spy-purple p-[1.5px] transition-transform duration-300 group-hover:rotate-6">
            <div className="w-full h-full bg-brand-dark rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyber-cyan group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-cyber-cyan group-hover:to-vault-green transition-all duration-300">
            ARK SHIELD TECH
          </span>
        </Link>

        {/* Middle: Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium tracking-wide transition-colors duration-200 py-1"
              >
                <span className={isActive ? "text-cyber-cyan" : "text-gray-400 hover:text-white"}>
                  {link.name}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-cyan rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: CTA Button or Connected Wallet */}
        <div className="hidden md:block">
          {isConnected ? (
            <div className="flex items-center space-x-3 bg-brand-slate border border-vault-green/30 rounded-xl px-4 py-2 text-xs font-mono select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vault-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-vault-green"></span>
              </span>
              <span className="text-white">{walletAddress}</span>
              <button 
                onClick={handleDisconnect}
                className="text-red-400 hover:text-red-300 cursor-pointer font-bold transition-colors ml-1"
                title="Disconnect Wallet"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <Link
              href="/contact"
              className="relative inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-slate text-sm font-semibold tracking-wide text-white border border-cyber-cyan/30 hover:border-cyber-cyan hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyber-cyan/10 to-vault-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <Terminal className="w-4 h-4 text-cyber-cyan animate-pulse" />
              <span>Access Console</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Burger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 z-40 md:hidden glass-panel-heavy rounded-2xl p-6 shadow-2xl flex flex-col space-y-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-semibold tracking-wide py-2 border-b border-white/5 transition-colors duration-200 ${
                      isActive ? "text-cyber-cyan" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            {isConnected ? (
              <div className="w-full flex flex-col items-center space-y-2 p-3 bg-brand-dark/50 border border-vault-green/20 rounded-xl font-mono text-xs text-center">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-vault-green animate-pulse" />
                  <span className="text-white">{walletAddress}</span>
                </div>
                <button 
                  onClick={() => {
                    handleDisconnect();
                    setIsOpen(false);
                  }}
                  className="text-red-400 hover:text-red-300 font-bold underline cursor-pointer"
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-brand-slate text-sm font-semibold tracking-wide text-white border border-cyber-cyan/30 hover:border-cyber-cyan transition-all duration-300"
              >
                <Terminal className="w-4 h-4 text-cyber-cyan" />
                <span>Access Console</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

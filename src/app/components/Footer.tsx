import Link from "next/link";
import { Shield, Key, Cpu, HelpCircle, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-brand-dark px-4 md:px-8 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-cyber-cyan" />
            <span className="font-display font-bold text-lg tracking-wider text-white">VANGUARD</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Vanguard Digital Intelligence & Asset Protection (VDIAP) operates at the bleeding edge of blockchain forensics, cellular auditing, and decentralized wealth vault operations.
          </p>
          {/* Operational Status */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-vault-green bg-vault-green/10 border border-vault-green/20 px-3 py-1.5 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vault-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-vault-green"></span>
            </span>
            <span>SECURE SYSTEM STATUS: NOMINAL</span>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div>
          <h4 className="font-display text-sm font-bold tracking-widest text-gray-300 uppercase mb-4">Core Portals</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/recovery" className="text-gray-400 hover:text-cyber-cyan transition-colors duration-200">
                Asset & Crypto Recovery
              </Link>
            </li>
            <li>
              <Link href="/forensics" className="text-gray-400 hover:text-spy-purple transition-colors duration-200">
                Relationship Forensics
              </Link>
            </li>
            <li>
              <Link href="/vault" className="text-gray-400 hover:text-vault-green transition-colors duration-200">
                Secured Wealth Vault
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-cyber-cyan transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                Encrypted Communications
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Trust & Info */}
        <div>
          <h4 className="font-display text-sm font-bold tracking-widest text-gray-300 uppercase mb-4">Integrity Verification</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2 text-gray-400">
              <Lock className="w-4 h-4 text-cyber-cyan" />
              <span>AES-256 Protocol</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-400">
              <Cpu className="w-4 h-4 text-vault-green" />
              <span>Decentralized Escrows</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-400">
              <HelpCircle className="w-4 h-4 text-spy-purple" />
              <span>Zero-knowledge Privacy</span>
            </li>
          </ul>
        </div>

        {/* Column 4: PGP Fingerprint */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold tracking-widest text-gray-300 uppercase flex items-center space-x-2">
            <Key className="w-4 h-4 text-cyber-cyan" />
            <span>Public PGP Key</span>
          </h4>
          <div className="bg-brand-slate/80 border border-white/5 rounded-xl p-3.5 space-y-2.5 font-mono text-[10px] text-gray-400 select-all">
            <span className="text-xs text-cyber-cyan font-semibold block uppercase">Fingerprint:</span>
            <div className="break-all whitespace-pre-line leading-relaxed">
              9F3A 7C2B 10E5 D9E4 8A24
              0E1D 4B82 A31F B90C E1A4
            </div>
          </div>
          <span className="text-xs text-gray-500 block">
            Verification Hash: MD5/SHA-256 Encrypted
          </span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Vanguard Intelligence Group. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/terms" className="hover:text-white transition-colors duration-200">Discretion Agreement</Link>
          <Link href="/privacy" className="hover:text-white transition-colors duration-200">Non-Disclosure Policy</Link>
        </div>
      </div>
    </footer>
  );
}

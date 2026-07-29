"use client";

import { motion } from "framer-motion";
import { Shield, FileText, CheckCircle, Scale, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="relative z-10 w-full min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <section className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>CORE OPERATIONAL TERMS</span>
          </motion.div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            Discretion & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-vault-green">Terms of Service</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Effective Date: July 29, 2026. Please read this Discretion Agreement carefully before utilizing the Ark Shield Tech diagnostic portals.
          </p>
        </section>

        {/* Content body */}
        <section className="glass-panel-heavy rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl space-y-8 font-sans">
          
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <FileText className="w-5 h-5 text-cyber-cyan" />
              <span>1. Agreement & Acceptance</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              By accessing our portals, initiating node validation tests, or submitting forensic diagnostic requests, you agree to comply with this Discretion Agreement. This website is intended for private individuals and corporate entities requesting defensive security analysis on hardware and digital assets they own or have explicit legal authorization to audit.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <Shield className="w-5 h-5 text-vault-green" />
              <span>2. Scope of Service & Audits</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ark Shield Tech delivers cryptographic blockchain forensic reports, software tracking analysis, and node validator hosting configurations. We assist clients in gathering, documenting, and organizing technical telemetry data (e.g., wallet flows, security audits). We do not provide physical asset recoveries, legal representation, or direct law enforcement actions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <AlertTriangle className="w-5 h-5 text-spy-purple" />
              <span>3. Permitted Use Restrictions</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              You explicitly agree not to use our portals, diagnostic checklists, or reports for:
            </p>
            <ul className="space-y-2.5 text-xs text-gray-400 pl-4 list-disc font-mono">
              <li>Unauthorized access, interception, or spying on hardware not owned by you.</li>
              <li>Compromising or exploiting cryptocurrency blockchain nodes or hot/cold wallets.</li>
              <li>Interfering with telecommunications carrier networks or GSM signal grids.</li>
            </ul>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ark Shield Tech reserves the right to immediately terminate any pending audit cases that show indicators of malicious or unauthorized surveillance intent.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <CheckCircle className="w-5 h-5 text-cyber-cyan" />
              <span>4. Liability Limits</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              All tools, diagnostic scores, and reports are provided "as-is" without warranty. While our blockchain telemetry is highly accurate, actual recovery of lost assets depends on law enforcement processes, judicial orders, and exchange frozen-asset protocols. Ark Shield Tech shall not be liable for losses resulting from market volatility or actions taken by third-party cryptocurrency exchanges.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 text-center text-xs text-gray-500 font-mono">
            For operational inquiries, contact our ops desk: ops@arkshieldtech.com.
          </div>

        </section>

      </div>
    </div>
  );
}

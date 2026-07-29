"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Info, Scale, CheckCircle, HelpCircle } from "lucide-react";

export default function DisclaimerPage() {
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
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>REGULATORY COMPLIANCE STATEMENT</span>
          </motion.div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            Regulatory & Legal <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-vault-green">Disclaimer</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Effective Date: July 29, 2026. Important disclosure regarding financial, legal, and operational boundaries of Ark Shield Tech.
          </p>
        </section>

        {/* Content body */}
        <section className="glass-panel-heavy rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl space-y-8 font-sans">
          
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <Scale className="w-5 h-5 text-cyber-cyan" />
              <span>1. Private Cybersecurity consulting - Not Law Enforcement</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ark Shield Tech is an independent, private digital intelligence and cybersecurity consulting firm. We are **not affiliated with, endorsed by, or a representative of any government agency**, local law enforcement, or global organizations (such as the FBI, SEC, FCA, or Interpol). 
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our role is strictly limited to technical audits, packet analysis, blockchain tracing, and providing forensic reporting files. Any legal execution, asset seizures, or arrests must be carried out by authorized state authorities or judicial representatives.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <Info className="w-5 h-5 text-vault-green" />
              <span>2. No Financial or Investment Advice</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Any validator pool hosting, node calculations, or return figures displayed on the `/vault` page (Validator Pools) are for performance estimation and simulation purposes only. 
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ark Shield Tech does not offer financial planning, investment advice, portfolio management, or licensed brokerage services. Cryptographic validation node operations carry risks of downtime penalties (slashing) and general market volatility. Perform independent due diligence before allocating server capacity.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <HelpCircle className="w-5 h-5 text-spy-purple" />
              <span>3. Trace Reports outcome parameters</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our blockchain trace reports compile verifiable ledger trails mapping the flow of assets through addresses. While these reports serve as forensic evidence to help local authorities track down funds, Ark Shield Tech cannot guarantee the physical retrieval of assets. Success is dependent on the regulatory status of the destination exchanges and the prompt action of law enforcement agencies.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <CheckCircle className="w-5 h-5 text-cyber-cyan" />
              <span>4. Retainer Payment and Fees Statement</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Any security fees, database query costs, or retainer payments validated through our portals are processed to cover dedicated node query allocations, specialized software licenses, and analyst labor. Fees are non-refundable except where explicitly stated under custom SLA contract variables.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 text-center text-xs text-gray-500 font-mono">
            For regulatory or compliance inquiries, contact our legal desk: legal@arkshieldtech.com.
          </div>

        </section>

      </div>
    </div>
  );
}

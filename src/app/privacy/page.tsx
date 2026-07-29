"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileText, CheckCircle, EyeOff } from "lucide-react";

export default function PrivacyPage() {
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
            <EyeOff className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL SECURITY DISCLOSURE</span>
          </motion.div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            Non-Disclosure & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-vault-green">Privacy Policy</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Effective Date: July 29, 2026. This policy outlines how Ark Shield Tech manages and protects sensitive client parameters during security vulnerability assessments.
          </p>
        </section>

        {/* Content body */}
        <section className="glass-panel-heavy rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl space-y-8 font-sans">
          
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <Shield className="w-5 h-5 text-cyber-cyan" />
              <span>1. Zero-Knowledge Information Commitment</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Ark Shield Tech does not store or persist client credentials, wallet seed phrases, or private communications on centralized cloud servers. All diagnostic inquiry variables are encrypted client-side using AES-256 protocols. Raw records submitted through our secure forms are loaded directly into encrypted local RAM buffers and automatically flushed hourly.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <Lock className="w-5 h-5 text-vault-green" />
              <span>2. Collected Parameters & Use Case Scope</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              To conduct defensive audits, locate network leaks, or compile blockchain trace reports, we may process specific technical metrics:
            </p>
            <ul className="space-y-2.5 text-xs text-gray-400 pl-4 list-disc font-mono">
              <li>Blockchain transaction hashes (TxID) and public wallet addresses.</li>
              <li>Network telemetry, carrier connection headers, and general device identifiers (such as IMEI indicators).</li>
              <li>Encrypted messaging handles provided directly by the user for secure updates.</li>
            </ul>
            <p className="text-sm text-gray-400 leading-relaxed">
              These metrics are used exclusively to perform diagnostic checks, validate active node operations, and output forensic reports. We never share client variables with third-party advertising networks.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <FileText className="w-5 h-5 text-spy-purple" />
              <span>3. Cryptographic Storage & NDA Protections</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              All client interactions are treated under strict legal non-disclosure agreement (NDA) rules. Any generated reports or audit outputs are encrypted in transit and can only be accessed by entering the unique reference ID provided during intake. If you lose this ID, the data cannot be decrypted or retrieved.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-white uppercase flex items-center space-x-2.5">
              <CheckCircle className="w-5 h-5 text-cyber-cyan" />
              <span>4. Regulatory Compliance & Discretion</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              We comply with international data security guidelines and privacy standards (including General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) practices for secure data handling). Under no circumstances do we deploy malicious monitoring tools, engage in unauthorized surveillance, or access remote hardware without explicit client-signed consent.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 text-center text-xs text-gray-500 font-mono">
            For secure inquiries regarding privacy configurations, contact our ops desk: ops@arkshieldtech.com.
          </div>

        </section>

      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Terminal, 
  ArrowRight, 
  Activity, 
  Cpu, 
  TrendingUp, 
  Lock, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  AlertTriangle
} from "lucide-react";

// Testimonials Data
const testimonials = [
  {
    quote: "I needed to verify a blockchain transaction flow to document ledger parameters. Ark Shield Tech's forensic ledger report mapped the route within 72 hours. Outstanding work.",
    author: "Sarah M.",
    role: "Financial Analyst",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    quote: "Ark Shield Tech conducted a complete digital security audit of my device. They identified communication configuration vulnerabilities and device telemetry risks with absolute discretion.",
    author: "Douglas R.",
    role: "Private Client",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    quote: "Their secure validation node provides stable block validation performance fully backed by cyber-insurance protocols. It's the only network host where I can run services with absolute peace of mind.",
    author: "Elena K.",
    role: "Venture Partner",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
  }
];

export default function Home() {
  // Stat counters state
  const [assets, setAssets] = useState(142400000);
  const [threats, setThreats] = useState(84180);
  const [activeIndex, setActiveIndex] = useState(0);

  // Animate stats
  useEffect(() => {
    const assetsInterval = setInterval(() => {
      setAssets((prev) => {
        if (prev >= 142408120) {
          return 142408120;
        }
        return prev + Math.floor(Math.random() * 200) + 50;
      });
    }, 1500);

    const threatsInterval = setInterval(() => {
      setThreats((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 3000);

    return () => {
      clearInterval(assetsInterval);
      clearInterval(threatsInterval);
    };
  }, []);

  // Format currency helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative z-10 w-full min-h-screen">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden">
        {/* Background Image with Dark Desaturated Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80" 
            alt="Ark Shield Server Infrastructure" 
            className="w-full h-full object-cover opacity-15 filter grayscale contrast-125"
            animate={{ scale: [1, 1.06, 1], x: [0, 8, 0], y: [0, -3, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-transparent" />
        </div>

        <div className="max-w-6xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold px-4 py-2 rounded-full"
            >
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>CRYPTOGRAPHIC TELEMETRY & DEVICE DIAGNOSTICS</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl md:text-6xl tracking-tight text-white leading-none uppercase"
            >
              Elite Digital <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan via-vault-green to-spy-purple">
                Intelligence
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Ark Shield Tech stands as the global authority in cryptographic forensics, system vulnerability auditing, and secure validator node hosting.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/recovery"
                className="w-full sm:w-auto text-center flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-cyan/80 text-brand-dark font-bold tracking-wide hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all duration-300 group"
              >
                <Terminal className="w-4 h-4" />
                <span>Initiate Ledger Audit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/vault"
                className="w-full sm:w-auto text-center flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-brand-slate text-white border border-vault-green/40 hover:border-vault-green hover:shadow-[0_0_20px_rgba(0,245,160,0.2)] transition-all duration-300 font-semibold"
              >
                <Cpu className="w-4 h-4 text-vault-green" />
                <span>Validator Pools</span>
              </Link>
            </motion.div>
          </div>

          {/* Hero Console Side Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 glass-panel-heavy rounded-2xl p-6 glow-cyan/10 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-xs font-mono text-gray-500">ark-shield-terminal://active-scans</span>
            </div>
            
            <div className="space-y-4 font-mono text-xs text-gray-400">
              <div className="flex justify-between items-center text-cyber-cyan border-b border-white/5 pb-2">
                <span>TARGET INTEL</span>
                <span>STATUS</span>
              </div>
              <div className="flex justify-between">
                <span>[SCAM_BLOCK_TRACE]</span>
                <span className="text-vault-green">FORENSIC ANALYSIS</span>
              </div>
              <div className="flex justify-between">
                <span>[CELLULAR_LOCATE]</span>
                <span className="text-yellow-500">TELEMETRY TESTING</span>
              </div>
              <div className="flex justify-between">
                <span>[VAULT_STAKE_POOL]</span>
                <span className="text-vault-green">VALIDATOR NOMINAL</span>
              </div>
              <div className="flex justify-between">
                <span>[ANTIVIRUS_AUDIT]</span>
                <span className="text-spy-purple">INTEGRITY CHECK</span>
              </div>
              
              <div className="bg-brand-dark/80 rounded-xl p-3 border border-white/5 space-y-1">
                <span className="text-[10px] text-gray-500">DIAGNOSTIC GEOPOSITIONAL MATCH INDEX:</span>
                <div className="text-cyber-cyan text-sm font-semibold truncate">
                  34.0522° N, 118.2437° W (NOMINAL)
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Real-time Operation Metrics Dashboard */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          
          {/* Card 1: Total Assets */}
          <div className="glass-panel rounded-2xl p-6 space-y-2 border-l-4 border-l-cyber-cyan hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Audited Volume</span>
              <TrendingUp className="w-5 h-5 text-cyber-cyan" />
            </div>
            <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
              {formatCurrency(assets)}
            </h3>
            <p className="text-[11px] text-gray-500 font-mono">Live Blockchain Telemetry verified</p>
          </div>

          {/* Card 2: Threats Neutralized */}
          <div className="glass-panel rounded-2xl p-6 space-y-2 border-l-4 border-l-spy-purple hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Vulnerabilities Patched</span>
              <Shield className="w-5 h-5 text-spy-purple" />
            </div>
            <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
              {threats.toLocaleString()}
            </h3>
            <p className="text-[11px] text-gray-500 font-mono">Security Flaws & Vulnerabilities Patched</p>
          </div>

          {/* Card 3: Active Vault Nodes */}
          <div className="glass-panel rounded-2xl p-6 space-y-2 border-l-4 border-l-vault-green hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Validator Nodes</span>
              <Cpu className="w-5 h-5 text-vault-green" />
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
                128 / 128
              </h3>
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vault-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-vault-green"></span>
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-mono">Validator Uptime Performance Nominal</p>
          </div>

          {/* Card 4: Success Rate */}
          <div className="glass-panel rounded-2xl p-6 space-y-2 border-l-4 border-l-yellow-500 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Diagnostic Success Rate</span>
              <Lock className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
              99.4%
            </h3>
            <p className="text-[11px] text-gray-500 font-mono">Strict Non-Disclosure Protocols</p>
          </div>

        </motion.div>
      </section>

      {/* 3. Three Pillar Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight">
            OPERATION DEPARTMENTS
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Select an operational portal below to initiate system vulnerability diagnostics, security audits, or node performance deployments.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          
          {/* Card 1: Asset & Crypto Recovery */}
          <div className="group relative glass-panel rounded-2xl overflow-hidden flex flex-col h-[400px] border border-white/5 hover:border-cyber-cyan/50 hover:shadow-[0_0_20px_rgba(0,242,254,0.15)] transition-all duration-300">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80" 
                alt="Crypto Recovery Forensic Laptop" 
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/90 to-transparent" />
            </div>
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-cyber-cyan font-mono text-xs font-semibold">
                  <Terminal className="w-4 h-4" />
                  <span>FORENSIC TELEMETRY</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Forensic Ledger Audits</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Analyze transaction outputs. Our blockchain engineers map historical addresses to identify vulnerability targets and compile detailed analytics files.
                </p>
              </div>
              <Link 
                href="/recovery" 
                className="w-full text-center flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-cyber-cyan text-brand-dark font-bold text-sm hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-300"
              >
                <span>Initiate Ledger Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Relationship Forensics */}
          <div className="group relative glass-panel rounded-2xl overflow-hidden flex flex-col h-[400px] border border-white/5 hover:border-spy-purple/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] transition-all duration-300">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" 
                alt="Smartphone audit desk" 
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/90 to-transparent" />
            </div>
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-spy-purple font-mono text-xs font-semibold">
                  <Eye className="w-4 h-4" />
                  <span>DIAGNOSTICS & SYSTEM AUDITS</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Device Security Audits</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Discreet device diagnostic checks. We inspect system files for configuration vulnerabilities, detect hidden telemetry pipelines, and patch communication loops.
                </p>
              </div>
              <Link 
                href="/forensics" 
                className="w-full text-center flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-spy-purple text-white font-bold text-sm hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all duration-300"
              >
                <span>Request Device Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Secured Wealth Vault */}
          <div className="group relative glass-panel rounded-2xl overflow-hidden flex flex-col h-[400px] border border-white/5 hover:border-vault-green/50 hover:shadow-[0_0_20px_rgba(0,245,160,0.15)] transition-all duration-300">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80" 
                alt="Physical Safe Lock" 
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/90 to-transparent" />
            </div>
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-vault-green font-mono text-xs font-semibold">
                  <Cpu className="w-4 h-4" />
                  <span>VALIDATOR SERVICES</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Escrow Validator Pools</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Support validator nodes. Allocate server capacity to decentralized staking pools, secured by multi-signature escrow triggers and Aegis cybersecurity backing.
                </p>
              </div>
              <Link 
                href="/vault" 
                className="w-full text-center flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-vault-green text-brand-dark font-bold text-sm hover:shadow-[0_0_15px_rgba(0,245,160,0.3)] transition-all duration-300"
              >
                <span>Access Validator Nodes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </motion.div>
      </section>

      {/* 4. Testimonials Slider */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-panel-heavy rounded-3xl p-8 md:p-12 relative overflow-hidden space-y-8 border border-white/10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center space-x-3 text-xs font-mono text-gray-500">
            <Lock className="w-4 h-4 text-cyber-cyan" />
            <span>VERIFIED CASE INTELLIGENCE FILES</span>
          </div>

          {/* Testimonial slider body */}
          <div className="min-h-[160px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-lg md:text-xl text-gray-200 italic leading-relaxed font-sans">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </p>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].author} 
                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{testimonials[activeIndex].author}</h4>
                    <p className="text-xs text-gray-500 font-mono">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center border-t border-white/5 pt-6">
            <div className="text-xs font-mono text-gray-500">
              CASE FILE: {activeIndex + 1} / {testimonials.length}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-xl bg-brand-slate border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyber-cyan transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-xl bg-brand-slate border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyber-cyan transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </motion.div>
      </section>

    </div>
  );
}

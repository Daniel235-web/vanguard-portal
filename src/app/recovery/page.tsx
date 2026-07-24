"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Terminal, 
  ArrowRight, 
  Lock, 
  Activity, 
  Cpu, 
  Smartphone, 
  Laptop, 
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  User,
  Mail,
  FileText,
  Send,
  MessageSquare
} from "lucide-react";

// Categories Types
type Category = "crypto" | "device" | "identity" | "extortion";

export default function RecoveryPortal() {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<Category>("crypto");
  
  // Form states
  const [formData, setFormData] = useState({
    // Step 2 Inputs
    txid: "",
    scamUrl: "",
    walletAddress: "",
    lostAmount: "",
    
    phoneModel: "",
    imei: "",
    lastLocation: "",
    carrier: "",
    
    incidentDate: "",
    platformUsed: "",
    threatDetail: "",
    
    // Step 4 Inputs
    clientName: "",
    clientEmail: "",
    contactMethod: "Telegram",
    contactValue: "",
    description: ""
  });

  // Terminal logging simulator states
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [isScanComplete, setIsScanComplete] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [caseId, setCaseId] = useState("");

  // Handle inputs change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Log auto-scroll
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Terminal simulation script
  useEffect(() => {
    if (step !== 3) return;
    
    setProgress(0);
    setIsScanComplete(false);
    
    let currentProgress = 0;
    const scanLogs: string[] = [];
    
    if (category === "crypto") {
      scanLogs.push(
        "[INIT] INITIALIZING VANGUARD CRYPTOGRAPHIC TRACE ENGINE...",
        "[SYS] Connecting to decentralized Ethereum and Bitcoin node clusters...",
        `[SYS] Querying mempool history for Transaction ID: ${formData.txid || "0x98f23...4d"}`,
        "[SYS] Matching wallet parameters in behavioral database...",
        "[ANALYSIS] Analyzing contract logic signatures for malicious loops...",
        "[ANALYSIS] Hop detected: Cold wallet -> Intermediate mixer addresses...",
        "[ANALYSIS] Node match verified in Centralized Exchange hot wallet logs...",
        "[PROCESS] Querying known fraud indices and phishing reports...",
        "[SECURITY] Compiling forensic blockchain ledger profile...",
        "[SUCCESS] Trace mapping complete. Assets identified at terminal addresses."
      );
    } else if (category === "device") {
      scanLogs.push(
        "[INIT] INITIALIZING GEOLOCATION RETRIEVAL MODULE...",
        "[SYS] Authenticating GSM cell tower trilateration grids...",
        `[SYS] Reading last known cell logs for IMEI: ${formData.imei || "Unknown"}`,
        "[SYS] Ping command dispatched to primary wireless carrier node...",
        "[ANALYSIS] Triangulating active Wi-Fi BSSID beacons...",
        "[ANALYSIS] Locating cellular tower hop relays...",
        "[PROCESS] Resolving GPS coordinate delta bounds...",
        "[SECURITY] Device presence verified within active geo-fence grid...",
        "[SUCCESS] Location coordinates established with high pinpoint index."
      );
    } else {
      scanLogs.push(
        "[INIT] INITIALIZING DIGITAL FOOTPRINT AUDIT SYSTEM...",
        "[SYS] Searching dark web data breach repositories...",
        "[SYS] Scanning compromised credential indexes...",
        "[ANALYSIS] Analyzing email spoofing headers...",
        "[ANALYSIS] Verifying account delegation parameters...",
        "[PROCESS] Locating threat IP block configurations...",
        "[SECURITY] Resolving attack vectors against identity database...",
        "[SUCCESS] Forensic threat signatures mapped successfully."
      );
    }

    setLogs([]);
    
    // Add logs one by one based on progress
    const logIntervalTime = 7000 / scanLogs.length;
    let logIndex = 0;

    const progressInterval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      
      const targetLogIndex = Math.floor((currentProgress / 100) * scanLogs.length);
      if (logIndex < targetLogIndex && scanLogs[logIndex]) {
        setLogs((prev) => [...prev, scanLogs[logIndex]]);
        logIndex++;
      }

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        setIsScanComplete(true);
        // Automatically go to Step 4 after a brief pause
        setTimeout(() => {
          setStep(4);
        }, 1200);
      }
    }, 70);

    return () => clearInterval(progressInterval);
  }, [step, category]);

  // Handle final submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = "VNG-" + Math.floor(100000 + Math.random() * 900000);
    setCaseId(generatedId);
    setIsSubmitted(true);
  };

  const resetWizard = () => {
    setStep(1);
    setIsSubmitted(false);
    setProgress(0);
    setLogs([]);
    setFormData({
      txid: "",
      scamUrl: "",
      walletAddress: "",
      lostAmount: "",
      phoneModel: "",
      imei: "",
      lastLocation: "",
      carrier: "",
      incidentDate: "",
      platformUsed: "",
      threatDetail: "",
      clientName: "",
      clientEmail: "",
      contactMethod: "Telegram",
      contactValue: "",
      description: ""
    });
  };

  return (
    <div className="relative z-10 w-full min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* 1. Page Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Forensic Asset Retrieval System</span>
          </motion.div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            Asset & Crypto <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-vault-green">Recovery</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            If you have been scammed by a fake investment scheme, had cryptocurrency stolen, or had a physical device lost, Vanguard compiles the necessary forensic evidence to track, trace, and outline recovery steps.
          </p>
        </section>

        {/* 2. Interactive Wizard Container */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: The Interactive Wizard Panel */}
          <div className="lg:col-span-7 glass-panel-heavy rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative">
            
            {/* Steps Progress Indicator */}
            {step < 5 && !isSubmitted && (
              <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors duration-300 ${
                      step === s 
                        ? "bg-cyber-cyan text-brand-dark shadow-[0_0_10px_rgba(0,242,254,0.4)]"
                        : step > s 
                          ? "bg-vault-green text-brand-dark" 
                          : "bg-brand-slate text-gray-500 border border-white/10"
                    }`}>
                      {s}
                    </div>
                    <span className={`hidden sm:inline text-xs font-mono tracking-wide ${
                      step === s ? "text-white font-semibold" : "text-gray-500"
                    }`}>
                      {s === 1 && "Category"}
                      {s === 2 && "Details"}
                      {s === 3 && "Trace Engine"}
                      {s === 4 && "Submit"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Step 1: Select Category */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-white">Select Threat Category</h3>
                    <p className="text-xs text-gray-500">Choose the appropriate investigation vector to calibrate our scanning nodes.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Category Crypto */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCategory("crypto")}
                      className={`flex items-start space-x-4 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        category === "crypto" 
                          ? "bg-cyber-cyan/5 border-cyber-cyan shadow-[0_0_15px_rgba(0,242,254,0.1)]" 
                          : "bg-brand-slate/50 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <Cpu className={`w-6 h-6 mt-1 ${category === "crypto" ? "text-cyber-cyan" : "text-gray-400"}`} />
                      <div>
                        <h4 className="font-semibold text-sm text-white">Crypto Scam / Theft</h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">Investment scams, fake token giveaways, stolen wallet private keys.</p>
                      </div>
                    </motion.button>

                    {/* Category Device */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCategory("device")}
                      className={`flex items-start space-x-4 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        category === "device" 
                          ? "bg-cyber-cyan/5 border-cyber-cyan shadow-[0_0_15px_rgba(0,242,254,0.1)]" 
                          : "bg-brand-slate/50 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <Smartphone className={`w-6 h-6 mt-1 ${category === "device" ? "text-cyber-cyan" : "text-gray-400"}`} />
                      <div>
                        <h4 className="font-semibold text-sm text-white">Stolen Device / Phone</h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">Lost physical hardware, stolen phone tracking, carrier triangulation.</p>
                      </div>
                    </motion.button>

                    {/* Category Identity */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCategory("identity")}
                      className={`flex items-start space-x-4 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        category === "identity" 
                          ? "bg-cyber-cyan/5 border-cyber-cyan shadow-[0_0_15px_rgba(0,242,254,0.1)]" 
                          : "bg-brand-slate/50 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <Laptop className={`w-6 h-6 mt-1 ${category === "identity" ? "text-cyber-cyan" : "text-gray-400"}`} />
                      <div>
                        <h4 className="font-semibold text-sm text-white">Identity Theft</h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">Hacked personal credentials, fake social profiles, financial fraud.</p>
                      </div>
                    </motion.button>

                    {/* Category Extortion */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCategory("extortion")}
                      className={`flex items-start space-x-4 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        category === "extortion" 
                          ? "bg-cyber-cyan/5 border-cyber-cyan shadow-[0_0_15px_rgba(0,242,254,0.1)]" 
                          : "bg-brand-slate/50 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <Lock className={`w-6 h-6 mt-1 ${category === "extortion" ? "text-cyber-cyan" : "text-gray-400"}`} />
                      <div>
                        <h4 className="font-semibold text-sm text-white">Extortion / Blackmail</h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">Cyber blackmail, ransomware locks, leaks, online harassment mitigation.</p>
                      </div>
                    </motion.button>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyber-cyan text-brand-dark font-bold text-sm shadow-md hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-200"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Input Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-white">Input Investigation Details</h3>
                    <p className="text-xs text-gray-500">Provide the core parameters to anchor the forensic scanner.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Conditionally Render Inputs Based on Category Selection */}
                    {category === "crypto" && (
                      <>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Transaction Hash (TXID) *</label>
                          <input 
                            type="text" 
                            name="txid"
                            value={formData.txid}
                            onChange={handleInputChange}
                            placeholder="e.g. 0x71c765... or BTC block hash"
                            className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Wallet Address Used</label>
                            <input 
                              type="text" 
                              name="walletAddress"
                              value={formData.walletAddress}
                              onChange={handleInputChange}
                              placeholder="e.g. 0x... or bc1..."
                              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Lost Amount ($ USD) *</label>
                            <input 
                              type="number" 
                              name="lostAmount"
                              value={formData.lostAmount}
                              onChange={handleInputChange}
                              placeholder="e.g. 10000"
                              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Scam Platform / Website URL</label>
                          <input 
                            type="url" 
                            name="scamUrl"
                            value={formData.scamUrl}
                            onChange={handleInputChange}
                            placeholder="e.g. https://fake-elon-giveaway.io"
                            className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                          />
                        </div>
                      </>
                    )}

                    {category === "device" && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Phone Model *</label>
                            <input 
                              type="text" 
                              name="phoneModel"
                              value={formData.phoneModel}
                              onChange={handleInputChange}
                              placeholder="e.g. iPhone 15 Pro, Galaxy S24"
                              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase font-mono">IMEI Number (Optional)</label>
                            <input 
                              type="text" 
                              name="imei"
                              value={formData.imei}
                              onChange={handleInputChange}
                              placeholder="15-digit hardware identifier"
                              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Last Known Location *</label>
                            <input 
                              type="text" 
                              name="lastLocation"
                              value={formData.lastLocation}
                              onChange={handleInputChange}
                              placeholder="e.g. City or GPS address"
                              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Wireless Carrier</label>
                            <input 
                              type="text" 
                              name="carrier"
                              value={formData.carrier}
                              onChange={handleInputChange}
                              placeholder="e.g. AT&T, Verizon, Vodafone"
                              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {(category === "identity" || category === "extortion") && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Date of First Incident *</label>
                            <input 
                              type="date" 
                              name="incidentDate"
                              value={formData.incidentDate}
                              onChange={handleInputChange}
                              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Platform Compromised *</label>
                            <input 
                              type="text" 
                              name="platformUsed"
                              value={formData.platformUsed}
                              onChange={handleInputChange}
                              placeholder="e.g. WhatsApp, Email, Instagram, Bank Portal"
                              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Describe Threat / Account Details *</label>
                          <textarea 
                            name="threatDetail"
                            value={formData.threatDetail}
                            onChange={handleInputChange}
                            placeholder="e.g. Extortion emails received, fake profile links, ransomware popup details."
                            rows={3}
                            className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-mono text-gray-400 hover:text-white transition-colors"
                    >
                      &larr; Back to Category
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-vault-green text-brand-dark font-bold text-sm shadow-md hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-200"
                    >
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Initiate Scan Analysis</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Scanning Simulator */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-white flex items-center space-x-2">
                      <Search className="w-5 h-5 text-cyber-cyan animate-pulse" />
                      <span>Running Threat Audit Vector...</span>
                    </h3>
                    <p className="text-xs text-gray-500">Querying active block indexes and packet tracking grids.</p>
                  </div>

                  {/* Progress Ring / Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-cyber-cyan">SCANNING PROGRESS</span>
                      <span className="text-white font-bold">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-brand-dark rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-cyber-cyan to-vault-green"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Simulated Terminal Console */}
                  <div 
                    ref={logContainerRef}
                    className="bg-brand-dark/95 border border-white/10 rounded-2xl p-4 font-mono text-xs text-gray-400 h-64 overflow-y-auto space-y-2.5 scrollbar-thin"
                  >
                    {logs.map((log, index) => (
                      <div key={index} className="flex space-x-2">
                        <span className="text-cyber-cyan font-bold select-none">&gt;</span>
                        <p className={log.includes("SUCCESS") ? "text-vault-green font-semibold" : log.includes("ANALYSIS") ? "text-gray-300" : "text-gray-400"}>
                          {log}
                        </p>
                      </div>
                    ))}
                    {!isScanComplete && (
                      <div className="flex items-center space-x-1.5 text-cyber-cyan text-[10px] animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                        <span>PROCESSING TELEMETRY FLOW...</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Final Submission */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Result Header */}
                  <div className="bg-vault-green/10 border border-vault-green/20 rounded-2xl p-4 flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-vault-green mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-vault-green">CASE TRACE CONFIRMED</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        Forensic markers indicate a **High Probability** of recovery/location retrieval. Submit the encrypted secure request below to deploy an intelligence agent.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Contact Name *</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleInputChange}
                            placeholder="John Doe (or alias)"
                            className="w-full bg-brand-dark border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Secure Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <input 
                            type="email" 
                            name="clientEmail"
                            value={formData.clientEmail}
                            onChange={handleInputChange}
                            placeholder="your-secure-email@domain.com"
                            className="w-full bg-brand-dark border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <div className="sm:col-span-4 space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Preferred Contact</label>
                        <select 
                          name="contactMethod"
                          value={formData.contactMethod}
                          onChange={handleInputChange}
                          className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                        >
                          <option value="Telegram">Telegram</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Signal">Signal</option>
                        </select>
                      </div>
                      <div className="sm:col-span-8 space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Contact Handle / Phone *</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            name="contactValue"
                            value={formData.contactValue}
                            onChange={handleInputChange}
                            placeholder="@username or +1..."
                            className="w-full bg-brand-dark border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Additional Case Notes</label>
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                        <textarea 
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Provide any extra details (exchanges used, timelines, suspicious links, caller numbers)."
                          rows={3}
                          className="w-full bg-brand-dark border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-mono text-gray-400 hover:text-white transition-colors"
                      >
                        &larr; Back to Details
                      </button>
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyber-cyan text-brand-dark font-bold text-sm shadow-md hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-200"
                      >
                        <Send className="w-4 h-4" />
                        <span>Deploy Agent Request</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Submission Modal Overlay */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-brand-dark/95 z-30 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-vault-green/10 border border-vault-green/30 flex items-center justify-center text-vault-green animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-2xl text-white">CASE FILE INITIATED</h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                      Your recovery case has been locked under reference ID:
                    </p>
                    <div className="bg-brand-slate border border-white/5 rounded-xl px-6 py-3.5 font-mono text-lg font-bold text-cyber-cyan w-fit mx-auto mt-2 tracking-widest select-all shadow-md">
                      {caseId}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 max-w-xs leading-normal">
                    An intelligence officer will contact you via your preferred secure channel within 12 hours. Do not disclose this reference ID to third parties.
                  </p>

                  <button
                    onClick={resetWizard}
                    className="px-6 py-2.5 rounded-xl bg-brand-slate text-xs font-mono font-semibold text-gray-300 hover:text-white border border-white/5 hover:border-cyber-cyan transition-all duration-200"
                  >
                    Start New Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Server Closeup Visuals & Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Photographic Card */}
            <div className="glass-panel rounded-3xl overflow-hidden relative border border-white/5 shadow-2xl">
              <div className="h-56 w-full overflow-hidden relative">
                <motion.img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" 
                  alt="Cyber Forensic Data Center" 
                  className="w-full h-full object-cover filter contrast-125 brightness-90"
                  animate={{ scale: [1, 1.05, 1], x: [0, 5, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/40 to-transparent z-10" />
              
              <div className="p-6 space-y-3 relative z-20">
                <span className="text-[10px] font-mono text-cyber-cyan font-bold tracking-widest uppercase">Decentralized Tracing Nodes</span>
                <h4 className="font-display font-bold text-white text-lg">Hardware Forensics Integrity</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Our network taps directly into active blockchain indexes and cellular tower gateways, mapping addresses and tracing digital fingerprints with state-of-the-art integrity.
                </p>
              </div>
            </div>

            {/* Quick Stats list */}
            <div className="glass-panel rounded-3xl p-6 space-y-4 border border-white/5 text-xs">
              <h4 className="font-display font-bold text-sm text-gray-300 uppercase tracking-widest">Protocol Attributes</h4>
              
              <div className="space-y-3 font-mono">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">TRACING LATENCY</span>
                  <span className="text-cyber-cyan">&lt; 140ms</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">SUPPORTED BLOCKCHAINS</span>
                  <span className="text-white">BTC, ETH, SOL, BSC</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">CELLULAR RELAYS</span>
                  <span className="text-white">LTE, 5G, GSM, CDMA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">LEGAL COMPLIANCE</span>
                  <span className="text-vault-green">NDA PROTECTED</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* 3. Cybersecurity Advisory Section */}
        <section className="border-t border-white/5 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Advisory Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2 text-yellow-500 font-mono text-xs font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>CYBERSECURITY INTEL BULLETIN</span>
              </div>
              
              <h2 className="font-display font-black text-2xl md:text-3xl text-white uppercase tracking-tight">
                Vanguard Threat Advisory: Avoid Common Scams
              </h2>
              
              <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                <div className="space-y-1">
                  <h4 className="text-white font-semibold">1. The Fake &ldquo;Elon Musk&rdquo; Crypto Giveaways</h4>
                  <p>
                    Scammers use high-profile social media profiles, fake live streams, or compromised handles displaying deepfakes of public figures promising to double your cryptocurrency. Remember: **No legitimate wealth pool doubles transactions.**
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-white font-semibold">2. Investment & Forex Fraud Platforms</h4>
                  <p>
                    Fake brokers configure custom dashboard pages displaying unrealistic, daily compounding returns. When you request a withdrawal, they lock the wallet and demand a &ldquo;tax fee&rdquo; to unlock it. **Never deposit extra funds to withdraw initial balances.**
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-white font-semibold">3. Spoofed Device Trackers & Spyware</h4>
                  <p>
                    Phishing messages claiming to locate your stolen phone often ask you to sign in with your iCloud or Google credentials. This is a credential-harvesting trap designed to bypass 2FA codes. **Always trace devices via hardware IMEI nodes directly.**
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Advisory Illustrative Photography */}
            <div className="lg:col-span-5">
              <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" 
                  alt="A user typing on a secure laptop" 
                  className="w-full h-80 object-cover filter contrast-125 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-mono text-gray-400">
                    &ldquo;Verify transaction signatures and secure hardware keys before approving access pools.&rdquo;
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

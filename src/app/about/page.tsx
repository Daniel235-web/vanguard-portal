"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Cpu, 
  Eye, 
  Lock, 
  Activity, 
  Clock, 
  Users, 
  Globe, 
  ChevronRight, 
  CheckCircle,
  Database,
  Search,
  BookOpen
} from "lucide-react";
import ArkShieldLogo from "../components/ArkShieldLogo";

// Team Members Data
const team = [
  {
    name: "Nicholas Thorne",
    role: "Founder & Chief Technology Officer",
    bio: "Former intelligence agency cryptographer. Nicholas leads the core architecture of Ark Shield Tech's decentralized escrows and zero-knowledge protocols.",
    image: "/images/nicholas_thorne.png",
    department: "Executive Operations",
    badge: "FOUNDER"
  },
  {
    name: "Marcus Vance",
    role: "Director of Ledger Forensics",
    bio: "Over 15 years of experience in blockchain analytics. Marcus specializes in ledger telemetry auditing, address flow mapping, and cryptographic system validation.",
    image: "/images/marcus_vance.png",
    department: "Ledger Forensics",
    badge: "FORENSICS LEAD"
  },
  {
    name: "Dr. Clara Sterling",
    role: "Chief Diagnostics Engineer",
    bio: "Expert in cellular telemetry and hardware diagnostics. Clara leads our device security auditing services, identifying remote configuration vulnerabilities and telemetry leaks.",
    image: "/images/clara_sterling.png",
    department: "device diagnostics",
    badge: "DIAGNOSTICS CHIEF"
  },
  {
    name: "Aisha Bello",
    role: "Wealth Security Architect",
    bio: "Designed security protocols for multi-signature nodes holding over $100M in validation backing. Aisha oversees the Aegis cyber-insurance pool integrations.",
    image: "/images/aisha_bello.png",
    department: "escrow validator pools",
    badge: "VAULT ARCHITECT"
  }
];

// Timeline Milestones
const milestones = [
  {
    year: "2019",
    title: "Ark Shield Genesis",
    description: "Founded as an offensive cyber intelligence consultancy helping institutional partners audit compromised data logs."
  },
  {
    year: "2021",
    title: "Blockchain Tracing Core",
    description: "Released the proprietary block-forensics engine, allowing near-instant audit trails of complex ledger transactions on major chains."
  },
  {
    year: "2023",
    title: "Cellular Telemetry Node",
    description: "Launched the device diagnostics department, specializing in zero-knowledge device audits and telemetry validation."
  },
  {
    year: "2025",
    title: "Escrow Validator Pools Launch",
    description: "Deployed decentralized cyber-insurance backed validator nodes, providing automated resource hosting protected by consensus verification protocols."
  },
  {
    year: "2026",
    title: "Global Intelligence Network",
    description: "Secured international compliance audits with Aegis Cyber Indemnity, establishing 128 active server validation hubs globally."
  }
];

// Live Threat Logs (Simulated)
const initialLogs = [
  "SYSTEM: Decoupling cold vault multi-sig escrow layer 4...",
  "BLOCKCHAIN AUDIT: Alpha node audit completed for wallet 0x71...5A",
  "DEVICE AUDIT: Active remote script vulnerability patched on node 44",
  "VAULT: Re-verifying Aegis Cyber Insurance certificate pool compliance",
  "NETWORK: Routing inbound encrypted communication packet via Signal proxy"
];

export default function AboutPage() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const [logs, setLogs] = useState<string[]>(initialLogs);
  const [activeTab, setActiveTab] = useState<"vision" | "ethics" | "defense">("vision");

  // Threat log simulator ticker
  useEffect(() => {
    const prefixes = ["[BLOCKCHAIN TRACE]", "[DEVICE FORENSICS]", "[VAULT STATUS]", "[INTAKE RELAY]", "[SECURITY UPDATE]"];
    const actions = [
      "Audited intermediate address logs on Solanachain",
      "SIM configuration check dispatched to AT&T subscriber nodes",
      "Validator node 102 successfully validated block consensus",
      "Confidential client intake packet client-side AES decryption completed",
      "Dark web database breach query returned 0 matched records",
      "Multi-sig validation token transmitted to offline cold storage HSM"
    ];

    const interval = setInterval(() => {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const timestamp = new Date().toLocaleTimeString();
      const newLog = `${timestamp} - ${prefix}: ${action}`;

      setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 w-full min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* 1. Cinematic Hero Header */}
        <section className="relative w-full rounded-3xl overflow-hidden glass-panel-heavy p-8 md:p-16 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-12">
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-spy-purple/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
              <ArkShieldLogo size={14} glow={false} />
              <span>THE GLOBAL AUTHORITY ON LEDGER FORENSICS</span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tight leading-none">
              Pioneering <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan via-vault-green to-spy-purple">
                Cyber Intelligence
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Ark Shield Tech stands at the crossroads of advanced military-grade cryptography, cellular diagnostics, and decentralized validator operations. Founded by security veterans and software architects, we defend private client variables and audit ledger logs globally with unmatched precision and absolute non-disclosure agreements.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-white/5 font-mono">
              <div>
                <span className="text-[10px] text-gray-500 block uppercase">Operational Status</span>
                <span className="text-vault-green text-sm font-semibold flex items-center space-x-1">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vault-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-vault-green"></span>
                  </span>
                  NOMINAL
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block uppercase">Audited Nodes</span>
                <span className="text-white text-sm font-semibold">128 / 128 ACTIVE</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block uppercase">Insured Pool</span>
                <span className="text-cyber-cyan text-sm font-semibold">$5.0M Aegis</span>
              </div>
            </div>
          </div>

          {/* Right Simulated Operations Terminal Panel */}
          <div className="w-full md:w-[400px] glass-panel rounded-2xl p-6 space-y-4 border border-white/5 self-stretch flex flex-col justify-between font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-gray-500 text-[10px] uppercase">LIVE OPERATIONS NETWORK FEED</span>
              <Activity className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
            </div>

            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {logs.map((log, index) => (
                <div key={index} className="flex space-x-2 text-[10px] items-start border-l border-cyber-cyan/20 pl-2 leading-relaxed">
                  <span className="text-cyber-cyan select-none">&gt;</span>
                  <span className="text-gray-400 break-all">{log}</span>
                </div>
              ))}
            </div>

            <div className="bg-brand-dark/80 rounded-xl p-3 border border-white/5 space-y-1">
              <span className="text-[9px] text-gray-500">SYSTEM AUDIT METRIC:</span>
              <div className="text-vault-green font-semibold truncate text-[11px]">
                Consensus Secured (Hash: 9F3A...E1A4)
              </div>
            </div>
          </div>
        </section>

        {/* 2. Core Pillars Tab Section */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display font-black text-3xl text-white uppercase tracking-tight">
              OUR OPERATIONS PHILOSOPHY
            </h2>
            <p className="text-gray-400 text-sm">
              We operate under absolute integrity, combining zero-knowledge protocols with active threat countermeasures.
            </p>
          </div>

          {/* Tabs header */}
          <div className="flex border-b border-white/5 max-w-lg mx-auto justify-center gap-4">
            {(["vision", "ethics", "defense"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-6 font-mono text-xs uppercase font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === tab 
                    ? "border-cyber-cyan text-cyber-cyan" 
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab === "vision" && "Core Vision"}
                {tab === "ethics" && "Privacy Ethics"}
                {tab === "defense" && "Security Defense"}
              </button>
            ))}
          </div>

          {/* Tab Content body */}
          <div className="max-w-3xl mx-auto min-h-[160px] flex items-center">
            <AnimatePresence mode="wait">
              {activeTab === "vision" && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-white">De-escalating Cyber Exploitation</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Our vision is a digital ecosystem where system vulnerabilities are minimized. By creating state-of-the-art forensic trail maps, we enable ledger transparency once thought impossible.
                    </p>
                  </div>
                  <div className="bg-brand-slate/50 border border-white/5 rounded-2xl p-6 space-y-3 font-mono text-xs text-gray-400">
                    <div className="flex items-center space-x-2 text-cyber-cyan">
                      <Globe className="w-4 h-4" />
                      <span>Decentralized Escrows</span>
                    </div>
                    <p className="leading-relaxed">Staking contracts execute double key triggers, ensuring nodes cannot be compromised or exploited under validation anomalies.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "ethics" && (
                <motion.div
                  key="ethics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-white">Zero-Knowledge Protocols</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      We never store client plaintext data on persistent server tables. Inquiries undergo local client-side encryption and are routed through zero-knowledge database relays that flush hourly.
                    </p>
                  </div>
                  <div className="bg-brand-slate/50 border border-white/5 rounded-2xl p-6 space-y-3 font-mono text-xs text-gray-400">
                    <div className="flex items-center space-x-2 text-spy-purple">
                      <Lock className="w-4 h-4" />
                      <span>Confidentiality Agreements</span>
                    </div>
                    <p className="leading-relaxed">All investigations are executed under strict non-disclosure legal guidelines to safeguard corporate and personal variables.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "defense" && (
                <motion.div
                  key="defense"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-white">Kinetic & Digital Response</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Ark Shield Tech combines active cryptographic audits with secure system checks, presenting auditors with unalterable ledger logs to facilitate security enforcement.
                    </p>
                  </div>
                  <div className="bg-brand-slate/50 border border-white/5 rounded-2xl p-6 space-y-3 font-mono text-xs text-gray-400">
                    <div className="flex items-center space-x-2 text-vault-green">
                      <Cpu className="w-4 h-4" />
                      <span>Indemnity Pools</span>
                    </div>
                    <p className="leading-relaxed">Validator pools are secured with multi-signature consensus keys, backed fully by Aegis Indemnity policies up to $5M USD.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 3. Meet the Specialists (Team Profiles with Generated Realistic Images) */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display font-black text-3xl text-white uppercase tracking-tight">
              OPERATIONAL LEADERSHIP
            </h2>
            <p className="text-gray-400 text-sm">
              Our specialists combine decades of expertise in state security operations, cybersecurity forensics, and cryptographic architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, borderColor: "rgba(0,242,254,0.3)" }}
                className="group relative glass-panel rounded-3xl overflow-hidden flex flex-col border border-white/5 shadow-xl transition-all duration-300"
              >
                {/* Photo frame */}
                <div className="h-64 w-full overflow-hidden relative bg-brand-dark/50">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/20 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 right-4 bg-brand-dark/80 border border-white/10 text-cyber-cyan font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {member.badge}
                  </span>
                </div>

                {/* Team Info details */}
                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">
                      {member.department}
                    </span>
                    <h3 className="font-display font-bold text-white text-lg group-hover:text-cyber-cyan transition-colors">
                      {member.name}
                    </h3>
                    <h4 className="text-xs text-gray-400 font-semibold">{member.role}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed pt-2">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Interactive Operational Timeline */}
        <section className="glass-panel rounded-3xl p-8 md:p-12 border border-white/15 relative overflow-hidden space-y-12">
          {/* Background grid */}
          <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20" />
          
          <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
            <h2 className="font-display font-black text-2xl md:text-3xl text-white uppercase tracking-tight">
              OPERATIONAL TIMELINE
            </h2>
            <p className="text-gray-500 text-xs font-mono">
              FROM GENESIS CONSULTING TO FULLY DECENTRALIZED COMPLIANCE ESCROW NODES.
            </p>
          </div>

          {/* Interactive timeline selection */}
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Timeline selector bar */}
            <div className="flex justify-between items-center relative mb-8 border-b border-white/5 pb-4 overflow-x-auto gap-4 scrollbar-none">
              {milestones.map((item, index) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedMilestone(index)}
                  className={`relative py-2 px-4 font-display font-bold text-sm tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    selectedMilestone === index 
                      ? "text-cyber-cyan font-black scale-105" 
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {item.year}
                  {selectedMilestone === index && (
                    <motion.div 
                      layoutId="activeTimelineIndicator"
                      className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-cyber-cyan rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Timeline display details */}
            <div className="min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMilestone}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full"
                >
                  <div className="md:col-span-3 text-center md:text-left">
                    <span className="font-display font-black text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-vault-green leading-none">
                      {milestones[selectedMilestone].year}
                    </span>
                  </div>
                  <div className="md:col-span-9 space-y-3">
                    <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-cyber-cyan" />
                      <span>{milestones[selectedMilestone].title}</span>
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {milestones[selectedMilestone].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

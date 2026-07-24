"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  Unlock, 
  Download, 
  Send, 
  CheckCircle, 
  Mail, 
  User, 
  MessageSquare,
  ShieldAlert,
  Terminal
} from "lucide-react";

// Mock public PGP key block content
const mockPGPKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP v4.10.2
Comment: Vanguard Cryptographic Security Node

mQINBGZSA1IBEADOP3v4vXwzGvjZ5X1D2n9B8rKz2U6nQ1g9fF4h8Y2mXz0A
L3n5sR8x8P1z4v8O0b9A3K5C7vD2E4G6H8J0K2L4M6N8P0Q2R4S6T8U0V2W4
X6Y8Z0a2b4c6d8e0f2g4h6i8j0k2l4m6n8o0p2q4r6s8t0u2v4w6x8y0z1A3
B5C7D9E1F3G5H7I9J1K3L5M7N9O1P3Q5R7S9T1U3V5W7X9Y1Z2a4b6c8d0e2
f4g6h8i0j2k4l6m8n0o2p4q6r8s0t2u4v6w8x0y2z4A6B8C0D2E4F6G8H0I2
J4K6L8M0N2O4P6Q8R0S2T4U6V8W0X2Y4Z6a8b0c2d4e6f8g0h2i4j6k8l0m2
n4o6p8q0r2s4t6u8v0w2x4y6z8A0B2C4D6E8F0G2H4I6J8K0L2M4N6O8P0Q2
=X8f9
-----END PGP PUBLIC KEY BLOCK-----`;

export default function ContactPortal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("Signal");
  const [contactHandle, setContactHandle] = useState("");
  
  // Message and Encryption states
  const [message, setMessage] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transmissionId, setTransmissionId] = useState("");

  // Helper to convert plain text to mock AES hex blocks
  const getCiphertext = (text: string) => {
    if (!text) return "NO DATA DETECTED IN RAM BUFFER";
    let hex = "";
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      hex += code.toString(16).toUpperCase().padStart(2, "0");
      if ((i + 1) % 4 === 0 && i < text.length - 1) {
        hex += " ";
      }
    }
    return `-----BEGIN AES-256 BLOCK-----\n${hex}\n-----END AES-256 BLOCK-----`;
  };

  // PGP download trigger
  const handleDownloadKey = () => {
    const blob = new Blob([mockPGPKey], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vanguard_public_key.asc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "TX-" + Math.floor(100000 + Math.random() * 900000);
    setTransmissionId(id);
    setIsSubmitted(true);
  };

  return (
    <div className="relative z-10 w-full min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Title */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>SECURE INTAKE NODE</span>
          </motion.div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            Encrypted Intake <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-vault-green">Terminal</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            All submitted intelligence reports undergo client-side zero-knowledge scrambling before transmission. Download our public PGP certificate for offline security.
          </p>
        </section>

        {/* Core Layout Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form and Obfuscator Panel */}
          <div className="lg:col-span-7 glass-panel-heavy rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <h3 className="font-display font-bold text-lg text-white flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-cyber-cyan" />
                  <span>AES-256 Encrypted Intake Terminal</span>
                </h3>
              </div>

              {/* Identity Information Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Secure Alias *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anon-98"
                      className="w-full bg-brand-dark border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Return Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="secure@domain.com"
                      className="w-full bg-brand-dark border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Secure Channel Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Preferred Channel</label>
                  <select 
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors cursor-pointer"
                  >
                    <option value="Signal">Signal Private Messenger</option>
                    <option value="Telegram">Telegram Channel</option>
                    <option value="WhatsApp">WhatsApp Escrow</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Channel Handle *</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      value={contactHandle}
                      onChange={(e) => setContactHandle(e.target.value)}
                      placeholder="@username or phone"
                      className="w-full bg-brand-dark border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Encrypted Text Area */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Payload Intel Message *</label>
                  
                  {/* Dynamic Encryption Toggle */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">
                      {isEncrypted ? "AES Shield: Active" : "Plaintext Mode"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEncrypted(!isEncrypted)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                        isEncrypted ? "bg-cyber-cyan" : "bg-brand-dark border border-white/10"
                      }`}
                    >
                      <span className="sr-only">Toggle Encryption Mode</span>
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          isEncrypted ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <textarea 
                    value={isEncrypted ? getCiphertext(message) : message}
                    onChange={(e) => {
                      if (!isEncrypted) {
                        setMessage(e.target.value);
                      }
                    }}
                    placeholder="Enter confidential report here. Toggle client encryption on to protect variables..."
                    rows={6}
                    readOnly={isEncrypted}
                    className={`w-full bg-brand-dark border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 resize-none font-mono ${
                      isEncrypted 
                        ? "border-cyber-cyan text-cyber-cyan bg-cyber-cyan/5 shadow-[0_0_10px_rgba(0,242,254,0.1)] cursor-not-allowed" 
                        : "border-white/10 text-white focus:border-cyber-cyan"
                    }`}
                    required
                  />
                  {isEncrypted && (
                    <div className="absolute top-3 right-3 flex items-center space-x-1.5 text-[9px] bg-brand-dark border border-cyber-cyan/30 px-2 py-1 rounded text-cyber-cyan font-mono animate-pulse">
                      <Lock className="w-3 h-3" />
                      <span>CIPHER BLOCK LOCK ACTIVE</span>
                    </div>
                  )}
                </div>
                {isEncrypted && (
                  <p className="text-[10px] text-cyber-cyan/70 font-mono leading-normal">
                    Plaintext keys locked in browser RAM buffer. Safe from ISP interception relays. Toggle OFF to edit.
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={handleDownloadKey}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-slate hover:bg-brand-slate/80 border border-white/5 hover:border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PGP Public Key</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyber-cyan text-brand-dark font-bold text-sm shadow-md hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Encrypted Packet</span>
                </button>
              </div>
            </form>

            {/* Success Overlay Screen */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-brand-dark/95 z-30 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-2xl text-white uppercase tracking-wider">PACKET DISPATCHED</h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                      Your encrypted report payload has been routed to validation queue:
                    </p>
                    <div className="bg-brand-slate border border-white/5 rounded-xl px-6 py-3.5 font-mono text-lg font-bold text-cyber-cyan w-fit mx-auto mt-2 tracking-widest select-all shadow-md">
                      {transmissionId}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 max-w-xs leading-normal">
                    Our cyber intelligence relays will establish contact via the designated secure channel handle. Discard this browser tab after copy-saving your transaction queue token.
                  </p>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage("");
                      setName("");
                      setEmail("");
                      setContactHandle("");
                    }}
                    className="px-6 py-2.5 rounded-xl bg-brand-slate text-xs font-mono font-semibold text-gray-300 hover:text-white border border-white/5 hover:border-cyber-cyan transition-all duration-200"
                  >
                    Transmit Another Packet
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: High Tech Office Photograph Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Visual Photography Card */}
            <div className="glass-panel rounded-3xl overflow-hidden relative border border-white/5 shadow-2xl flex-1 flex flex-col">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80" 
                  alt="Modern desk computer screens at a high-tech data security command center" 
                  className="w-full h-full object-cover filter contrast-125 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/40 to-transparent" />
              </div>
              
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-cyber-cyan font-bold tracking-widest uppercase">Decentralized Routing Nodes</span>
                  <h4 className="font-display font-bold text-white text-lg">Confidential Intelligence Handling</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Vanguard operates isolated network clusters. Intake requests bypass standard logging frameworks and undergo client-side PGP encryption automatically to secure user variables.
                  </p>
                </div>

                <div className="bg-brand-dark/50 border border-white/5 rounded-xl p-4 flex items-start space-x-3">
                  <ShieldAlert className="w-4 h-4 text-cyber-cyan mt-0.5 animate-pulse" />
                  <div className="text-[10px] text-gray-500 leading-relaxed">
                    <strong>Zero-Knowledge Assurance:</strong> Plaintext data is never written to server persistent databases. Relays are flushed hourly.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

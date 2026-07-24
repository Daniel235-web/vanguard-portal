"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Lock, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  LogOut,
  Smartphone,
  EyeOff,
  Database,
  Cpu,
  Mail,
  User,
  Send,
  MessageSquare
} from "lucide-react";

// Diagnostic questions
const diagnosticSteps = [
  {
    id: 1,
    question: "Do you suspect unauthorized access or hidden applications on your device?",
    options: [
      { text: "Yes, I notice unexpected battery drainage and overheating", weight: 3 },
      { text: "Yes, applications open/close or notifications flash briefly", weight: 2 },
      { text: "I suspect something but have no clear indicators yet", weight: 1 },
      { text: "No, everything runs normally", weight: 0 }
    ]
  },
  {
    id: 2,
    question: "Have you detected unrecognized active login sessions in your communication channels?",
    options: [
      { text: "Yes, WhatsApp/Telegram Web shows devices I do not own", weight: 4 },
      { text: "I see read status marks on messages I have not opened", weight: 3 },
      { text: "I have not checked active session logs recently", weight: 1 },
      { text: "No, all connected devices are verified", weight: 0 }
    ]
  },
  {
    id: 3,
    question: "Are system notification configurations or location sharing parameters modified unexpectedly?",
    options: [
      { text: "Yes, location sharing is active without my permission", weight: 4 },
      { text: "Yes, lock screen message content is hidden or bypassed", weight: 2 },
      { text: "I am unsure how to verify notification settings", weight: 1 },
      { text: "No, all access permissions are configured correctly", weight: 0 }
    ]
  },
  {
    id: 4,
    question: "Has your device experienced sudden network loss or cellular signal dropouts recently?",
    options: [
      { text: "Yes, my SIM disconnected completely without warning", weight: 5 },
      { text: "I receive SMS authorization codes I did not trigger", weight: 3 },
      { text: "I occasionally notice strange background noise during calls", weight: 1 },
      { text: "No, my connection remains stable", weight: 0 }
    ]
  }
];

export default function ForensicsPortal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  
  // Anonymous Intake states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactHandle: "",
    communicationAlias: false,
    details: ""
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  // Quick escape redirect function
  const triggerEscape = () => {
    window.location.replace("https://www.google.com");
  };

  // Keyboard shortcut listener for Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerEscape();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Answer diagnostic question
  const handleAnswerSelect = (weight: number) => {
    const newScores = [...scores, weight];
    setScores(newScores);

    if (currentStep < diagnosticSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getVulnerabilityRating = () => {
    const total = scores.reduce((a, b) => a + b, 0);
    if (total >= 11) return { label: "CRITICAL EXPOSURE", color: "text-red-500", desc: "Your device shows strong markers of unauthorized remote access or active tracker spyware. We recommend an immediate offline device swap and professional carrier SIM analysis." };
    if (total >= 6) return { label: "MODERATE RISK", color: "text-yellow-500", desc: "Some device settings indicate data leaks or persistent background queries. Resetting system credentials and running a deep forensic clean is advised." };
    return { label: "LOW EXPOSURE", color: "text-vault-green", desc: "No critical spyware signatures detected based on these diagnostics. Maintain operational security and rotate lock pin codes regularly." };
  };

  const resetDiagnostic = () => {
    setCurrentStep(0);
    setScores([]);
    setShowResult(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "DIAG-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(id);
    setIsSubmitted(true);
  };

  return (
    <div className="relative z-10 w-full min-h-screen py-10 px-4 md:px-8">
      
      {/* Discreet Exit Floating Trigger */}
      <div className="fixed top-24 right-4 md:right-8 z-50">
        <button
          onClick={triggerEscape}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-500 hover:text-white font-mono text-xs font-bold transition-all duration-300 shadow-lg group"
        >
          <LogOut className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Quick Escape [Esc]</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-spy-purple/10 border border-spy-purple/30 text-spy-purple text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>DISCREET DEVICE RISK ASSESSMENT</span>
          </motion.div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            Device Auditing & <span className="bg-clip-text text-transparent bg-gradient-to-r from-spy-purple to-cyber-cyan">Forensics</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Every transaction, notification, and coordinate leaves a digital fingerprint. We audit devices to identify active clones, detect tracking software, and secure communication channels with complete discretion.
          </p>
        </section>

        {/* Diagnostic Wizard Panel */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Diagnostic Widget */}
          <div className="lg:col-span-7 glass-panel-heavy rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative min-h-[420px] flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                    <span>SECURITY COMPLIANCE AUDIT</span>
                    <span>QUESTION {currentStep + 1} / {diagnosticSteps.length}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg md:text-xl text-white leading-relaxed">
                    {diagnosticSteps[currentStep].question}
                  </h3>

                  <div className="flex flex-col space-y-3">
                    {diagnosticSteps[currentStep].options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.015, x: 2 }}
                        whileTap={{ scale: 0.995 }}
                        onClick={() => handleAnswerSelect(opt.weight)}
                        className="w-full text-left p-4 rounded-xl bg-brand-slate/50 border border-white/5 hover:border-spy-purple/40 hover:bg-spy-purple/5 text-sm text-gray-300 hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        {opt.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-spy-purple/10 border border-spy-purple/30 flex items-center justify-center text-spy-purple mx-auto animate-pulse">
                    <Shield className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-gray-500 uppercase block">Calculated Rating</span>
                    <h3 className={`font-display font-black text-2xl tracking-tight ${getVulnerabilityRating().color}`}>
                      {getVulnerabilityRating().label}
                    </h3>
                    <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed mt-4">
                      {getVulnerabilityRating().desc}
                    </p>
                  </div>

                  <div className="flex justify-center space-x-4 pt-4">
                    <button
                      onClick={resetDiagnostic}
                      className="px-5 py-2.5 rounded-xl bg-brand-slate border border-white/5 text-xs font-mono text-gray-400 hover:text-white transition-all"
                    >
                      Restart Diagnostics
                    </button>
                    <a
                      href="#intake"
                      className="px-5 py-2.5 rounded-xl bg-spy-purple text-white text-xs font-bold flex items-center space-x-2 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all"
                    >
                      <span>Request Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Photography Visuals */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Photography Card */}
            <div className="glass-panel rounded-3xl overflow-hidden relative border border-white/5 shadow-2xl">
              <div className="h-60 w-full overflow-hidden relative">
                <motion.img 
                  src="https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80" 
                  alt="Smartphone on a modern office desk next to a laptop" 
                  className="w-full h-full object-cover filter contrast-125 grayscale"
                  animate={{ scale: [1, 1.05, 1], y: [0, -3, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/40 to-transparent z-10" />
              
              <div className="p-6 space-y-2 relative z-20">
                <span className="text-[10px] font-mono text-spy-purple font-bold tracking-widest uppercase">Discreet Consultations</span>
                <h4 className="font-display font-bold text-white text-lg">Cellular Auditing Framework</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  We specialize in tracing hidden background processes and monitoring packages. All inquiries are stored on encrypted offline storage units to preserve confidentiality.
                </p>
              </div>
            </div>

            {/* Verification Standards */}
            <div className="glass-panel rounded-3xl p-6 space-y-4 border border-white/5 text-xs">
              <h4 className="font-display font-bold text-sm text-gray-300 uppercase tracking-widest">Discretion Guidelines</h4>
              <ul className="space-y-2 text-gray-400 font-mono">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-spy-purple" />
                  <span>No log records stored on cloud servers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-spy-purple" />
                  <span>Sub-millisecond Escape redirects active</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-spy-purple" />
                  <span>Consultations under randomized code signatures</span>
                </li>
              </ul>
            </div>

          </div>

        </section>

        {/* Forensics Services Grid (Purple Theme) */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display font-black text-3xl text-white uppercase tracking-tight">
              DEFENSIVE AUDITING OPERATIONS
            </h2>
            <p className="text-gray-400 text-sm">
              We run hardware and software audits to identify vulnerabilities and secure your private accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Service 1 */}
            <div className="glass-panel rounded-2xl p-6 space-y-3 border border-white/5 hover:border-spy-purple/40 transition-all duration-300">
              <Eye className="w-6 h-6 text-spy-purple" />
              <h4 className="font-display font-bold text-base text-white">Spyware Auditing</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Scan device packages for hidden monitoring scripts, unauthorized microphone access, or location tracking triggers.
              </p>
            </div>

            {/* Service 2 */}
            <div className="glass-panel rounded-2xl p-6 space-y-3 border border-white/5 hover:border-spy-purple/40 transition-all duration-300">
              <Database className="w-6 h-6 text-spy-purple" />
              <h4 className="font-display font-bold text-base text-white">Session Analysis</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Identify active linked device logs on core applications (such as WhatsApp Web or Telegram sessions) that bypass local locks.
              </p>
            </div>

            {/* Service 3 */}
            <div className="glass-panel rounded-2xl p-6 space-y-3 border border-white/5 hover:border-spy-purple/40 transition-all duration-300">
              <Smartphone className="w-6 h-6 text-spy-purple" />
              <h4 className="font-display font-bold text-base text-white">SIM Swap Assessment</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Audit cellular network status signals to confirm carrier routing integrity and identify cloning risk thresholds.
              </p>
            </div>

            {/* Service 4 */}
            <div className="glass-panel rounded-2xl p-6 space-y-3 border border-white/5 hover:border-spy-purple/40 transition-all duration-300">
              <Cpu className="w-6 h-6 text-spy-purple" />
              <h4 className="font-display font-bold text-base text-white">Log Retrieval</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Extract compromised device history files and cellular pings to verify operational integrity.
              </p>
            </div>

          </div>
        </section>

        {/* Secure Consultation Form */}
        <section id="intake" className="max-w-3xl mx-auto border-t border-white/5 pt-16">
          <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            
            <div className="space-y-2 mb-6">
              <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                Secure Diagnostic Consultation
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Submit an inquiry utilizing randomized aliases if required. All diagnostic messages undergo encryption protocols.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Contact Name / Alias *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Reader-01 or name"
                      className="w-full bg-brand-dark border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-spy-purple transition-colors"
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
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="secure-email@domain.com"
                      className="w-full bg-brand-dark border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-spy-purple transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Encrypted Handle (Telegram/Signal/WhatsApp)</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    name="contactHandle"
                    value={formData.contactHandle}
                    onChange={(e) => setFormData({...formData, contactHandle: e.target.value})}
                    placeholder="e.g. @username or phone number"
                    className="w-full bg-brand-dark border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-spy-purple transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase font-mono">Investigation Focus *</label>
                <textarea 
                  name="details"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  placeholder="Detail your security concern. Mention the device model, cell carrier details, or suspect behaviors."
                  rows={4}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-spy-purple transition-colors resize-none"
                  required
                />
              </div>

              {/* Discreet Alias Checkbox */}
              <div className="flex items-start space-x-3 p-3 bg-brand-dark/50 border border-white/5 rounded-xl">
                <input 
                  type="checkbox" 
                  id="communicationAlias"
                  name="communicationAlias"
                  checked={formData.communicationAlias}
                  onChange={(e) => setFormData({...formData, communicationAlias: e.target.checked})}
                  className="w-4.5 h-4.5 mt-0.5 border-white/10 rounded accent-spy-purple focus:ring-0 cursor-pointer"
                />
                <label htmlFor="communicationAlias" className="text-xs text-gray-400 select-none cursor-pointer">
                  <span className="text-white font-semibold block">Send updates under disguised email header</span>
                  All follow-up verification updates will be delivered under the header **&quot;Daily Market Brief&quot;** to ensure discretion.
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-spy-purple text-white font-bold text-sm shadow-md hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Audit Request</span>
                </button>
              </div>
            </form>

            {/* Form Success Overlay */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-brand-dark/95 z-30 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-spy-purple/10 border border-spy-purple/30 flex items-center justify-center text-spy-purple animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-2xl text-white">TRANSMISSION LOCKED</h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                      Your query has been queued using code sequence:
                    </p>
                    <div className="bg-brand-slate border border-white/5 rounded-xl px-6 py-3.5 font-mono text-lg font-bold text-spy-purple w-fit mx-auto mt-2 tracking-widest select-all shadow-md">
                      {referenceId}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 max-w-xs leading-normal">
                    Secure communications will initiate within 12 hours. Maintain key privacy settings active on your contact handle.
                  </p>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        contactHandle: "",
                        communicationAlias: false,
                        details: ""
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-brand-slate text-xs font-mono font-semibold text-gray-300 hover:text-white border border-white/5 hover:border-spy-purple transition-all duration-200"
                  >
                    Transmit Another Form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

      </div>
    </div>
  );
}

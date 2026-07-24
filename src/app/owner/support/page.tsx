"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  MessageSquare, 
  Activity, 
  Settings, 
  Check, 
  Trash2, 
  Clock, 
  Send,
  AlertTriangle,
  BellRing
} from "lucide-react";

interface Message {
  sender: "user" | "owner";
  text: string;
  timestamp: string;
}

interface Ticket {
  id: string;
  name: string;
  email: string;
  status: "pending" | "active" | "resolved";
  messages: Message[];
  createdAt: string;
}

export default function OwnerSupportPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState("");
  
  // Webhook setting state
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookSaved, setWebhookSaved] = useState(false);

  // Authenticate session check
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("ark_shield_admin_authenticated");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
      loadTickets();
      loadWebhookConfig();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "ARK-ADMIN-2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("ark_shield_admin_authenticated", "true");
      loadTickets();
      loadWebhookConfig();
    } else {
      setAuthError("Invalid administrative passcode. Please verify key credentials.");
    }
  };

  const loadTickets = () => {
    const allTicketsRaw = localStorage.getItem("ark_shield_support_tickets");
    if (allTicketsRaw) {
      setTickets(JSON.parse(allTicketsRaw));
    }
  };

  const loadWebhookConfig = () => {
    const savedWebhook = localStorage.getItem("ark_shield_support_webhook");
    if (savedWebhook) {
      setWebhookUrl(savedWebhook);
    }
  };

  const saveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("ark_shield_support_webhook", webhookUrl);
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 3000);
  };

  const sendTestWebhook = async () => {
    if (!webhookUrl || !webhookUrl.startsWith("http")) return;
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🛡️ Ark Shield Tech - Webhook Check",
              description: "Customer Support notification tunnel verified. Active updates will relay successfully.",
              color: 3066993, // Green
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
      alert("Test alert transmitted successfully!");
    } catch (err) {
      alert("Failed to transmit test webhook. Check URL structure.");
    }
  };

  const handleSelectTicket = (id: string) => {
    setSelectedTicketId(id);
    // Mark as active once opened
    updateTicketStatus(id, "active");
  };

  const updateTicketStatus = (id: string, newStatus: Ticket["status"]) => {
    const allTicketsRaw = localStorage.getItem("ark_shield_support_tickets");
    if (!allTicketsRaw) return;
    const all: Ticket[] = JSON.parse(allTicketsRaw);
    const idx = all.findIndex((t) => t.id === id);
    if (idx !== -1) {
      all[idx].status = newStatus;
      localStorage.setItem("ark_shield_support_tickets", JSON.stringify(all));
      setTickets(all);
    }
  };

  const handleDeleteTicket = (id: string) => {
    const allTicketsRaw = localStorage.getItem("ark_shield_support_tickets");
    if (!allTicketsRaw) return;
    const all: Ticket[] = JSON.parse(allTicketsRaw);
    const filtered = all.filter((t) => t.id !== id);
    localStorage.setItem("ark_shield_support_tickets", JSON.stringify(filtered));
    setTickets(filtered);
    if (selectedTicketId === id) {
      setSelectedTicketId(null);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim() || !selectedTicketId) return;

    const allTicketsRaw = localStorage.getItem("ark_shield_support_tickets");
    if (!allTicketsRaw) return;
    const all: Ticket[] = JSON.parse(allTicketsRaw);
    const idx = all.findIndex((t) => t.id === selectedTicketId);
    if (idx !== -1) {
      all[idx].messages.push({
        sender: "owner",
        text: replyInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      all[idx].status = "active";
      localStorage.setItem("ark_shield_support_tickets", JSON.stringify(all));
      setReplyInput("");
      setTickets(all);
    }
  };

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  // Statistics counters
  const totalInquiries = tickets.length;
  const pendingInquiries = tickets.filter((t) => t.status === "pending").length;
  const resolvedInquiries = tickets.filter((t) => t.status === "resolved").length;

  if (!isAuthenticated) {
    return (
      <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-4 font-mono">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-panel-heavy border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl relative"
        >
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-spy-purple/5 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center space-y-2">
            <Lock className="w-10 h-10 text-cyber-cyan mx-auto animate-pulse" />
            <h1 className="font-display font-black text-xl text-white uppercase tracking-wider">Ark Security Portal</h1>
            <p className="text-xs text-gray-500">ADMINISTRATIVE ACCESS GATEWAY</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 uppercase font-semibold">Enter Security Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError("");
                }}
                placeholder="••••••••••••"
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors text-center tracking-widest"
                required
              />
            </div>

            {authError && (
              <div className="text-red-400 text-[10px] bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-vault-green text-brand-dark font-bold text-xs hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-200"
            >
              Authorize Node
            </button>
          </form>

          <div className="text-center text-[9px] text-gray-500">
            Note: Secure default access passcode is <code className="text-cyber-cyan">ARK-ADMIN-2026</code>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full min-h-screen py-10 px-4 md:px-8 font-mono text-xs">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
          <div>
            <h1 className="font-display font-black text-2xl text-white uppercase tracking-wider">Ark Support Console</h1>
            <p className="text-gray-500 text-[10px]">REAL-TIME CLIENT DISPATCH & COMMUNICATIONS TELEMETRY</p>
          </div>

          {/* Stats Bar */}
          <div className="flex space-x-6 text-[10px]">
            <div className="bg-brand-slate border border-white/5 px-4 py-2 rounded-xl flex flex-col justify-center">
              <span className="text-gray-500 block uppercase">TOTAL TICKETS</span>
              <span className="text-white text-base font-bold">{totalInquiries}</span>
            </div>
            <div className="bg-brand-slate border border-white/5 px-4 py-2 rounded-xl flex flex-col justify-center">
              <span className="text-gray-500 block uppercase">PENDING ASSIGN</span>
              <span className="text-cyber-cyan text-base font-bold">{pendingInquiries}</span>
            </div>
            <div className="bg-brand-slate border border-white/5 px-4 py-2 rounded-xl flex flex-col justify-center">
              <span className="text-gray-500 block uppercase">RESOLVED CASES</span>
              <span className="text-vault-green text-base font-bold">{resolvedInquiries}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Ticket list & Settings */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Ticket List Card */}
            <div className="glass-panel border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-bold text-white uppercase flex items-center space-x-1.5">
                  <MessageSquare className="w-4 h-4 text-cyber-cyan" />
                  <span>Client Tickets</span>
                </span>
                <button 
                  onClick={loadTickets}
                  className="text-[9px] text-gray-500 hover:text-cyber-cyan transition-colors"
                >
                  Reload Feed
                </button>
              </div>

              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                {tickets.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-[10px]">
                    No client support sessions detected in browser local storage.
                  </div>
                ) : (
                  tickets.map((t) => (
                    <div 
                      key={t.id}
                      onClick={() => handleSelectTicket(t.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        selectedTicketId === t.id 
                          ? "bg-brand-slate/80 border-cyber-cyan text-white" 
                          : "bg-brand-dark/50 border-white/5 hover:border-white/20 text-gray-400"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold font-mono text-[10px] text-white">
                          {t.id}
                        </span>
                        
                        {/* Status Label */}
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                          t.status === "pending" ? "bg-amber-500/10 border border-amber-500/20 text-amber-500" :
                          t.status === "active" ? "bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan" :
                          "bg-vault-green/10 border border-vault-green/20 text-vault-green"
                        }`}>
                          {t.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="truncate font-semibold text-gray-300">{t.name}</div>
                      <div className="truncate text-[9px] text-gray-500 mb-2">{t.email}</div>
                      
                      <div className="text-[9px] text-gray-500 flex justify-between items-center border-t border-white/5 pt-2">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(t.createdAt).toLocaleDateString()}
                        </span>
                        <span>{t.messages.length} messages</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Discord Webhook Config Settings */}
            <form onSubmit={saveWebhook} className="glass-panel border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center space-x-1.5 border-b border-white/5 pb-3">
                <Settings className="w-4 h-4 text-spy-purple" />
                <span className="font-bold text-white uppercase">Webhook Dispatch</span>
              </div>
              
              <p className="text-[9px] text-gray-500 leading-relaxed">
                Connect a Discord or Slack Webhook URL. Ark Shield Tech will post rich embed notifications of new client submissions directly to your client.
              </p>

              <div className="space-y-1">
                <label className="text-[8px] text-gray-400 uppercase font-semibold block">Notification Webhook URL</label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => {
                    setWebhookUrl(e.target.value);
                    setWebhookSaved(false);
                  }}
                  placeholder="https://discord.com/api/webhooks/..."
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                />
              </div>

              <div className="flex space-x-2 pt-1">
                <button
                  type="button"
                  onClick={sendTestWebhook}
                  className="flex-1 py-2 rounded-xl bg-brand-slate border border-white/5 hover:bg-brand-slate/80 text-[10px] text-gray-400 hover:text-white transition-colors"
                >
                  Test Webhook
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-cyber-cyan text-brand-dark font-bold text-[10px] flex items-center justify-center space-x-1"
                >
                  {webhookSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <span>Save Config</span>
                  )}
                </button>
              </div>
            </form>

          </div>

          {/* Right panel: Active Chat Terminal */}
          <div className="lg:col-span-8">
            {selectedTicket ? (
              <div className="glass-panel border border-white/10 rounded-2xl flex flex-col justify-between h-[510px] overflow-hidden">
                
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-slate-900 to-brand-dark px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{selectedTicket.id} - {selectedTicket.name}</span>
                      <span className="text-[9px] text-gray-500">({selectedTicket.email})</span>
                    </div>
                    <span className="text-[9px] text-gray-500">Opened: {new Date(selectedTicket.createdAt).toLocaleString()}</span>
                  </div>

                  {/* Actions bar */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateTicketStatus(selectedTicket.id, "resolved")}
                      className="px-3 py-1.5 rounded-lg bg-vault-green/10 border border-vault-green/20 hover:border-vault-green text-vault-green font-bold text-[9px] transition-colors uppercase"
                    >
                      Resolve Case
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(selectedTicket.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white transition-colors"
                      title="Delete Ticket"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Messages Log Panel */}
                <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-brand-dark/20 max-h-[340px]">
                  {selectedTicket.messages.map((msg, index) => {
                    const isOwner = msg.sender === "owner";
                    return (
                      <div key={index} className={`flex flex-col ${isOwner ? "items-end" : "items-start"}`}>
                        <span className="text-[8px] text-gray-500 mb-0.5 px-1 font-mono">
                          {isOwner ? "You (Operator)" : selectedTicket.name} • {msg.timestamp}
                        </span>
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                            isOwner
                              ? "bg-cyber-cyan text-brand-dark font-semibold rounded-tr-sm shadow-[0_0_10px_rgba(0,242,254,0.1)]"
                              : "bg-brand-slate border border-white/5 text-gray-200 rounded-tl-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Form Bar */}
                <form onSubmit={handleSendReply} className="p-4 bg-slate-900 border-t border-white/5 flex items-center space-x-2">
                  <input
                    type="text"
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="Enter cryptographic secure reply..."
                    className="flex-1 bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-xl bg-cyber-cyan text-brand-dark flex items-center justify-center hover:shadow-[0_0_10px_rgba(0,242,254,0.3)] transition-all duration-200 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

              </div>
            ) : (
              <div className="glass-panel border border-white/10 rounded-2xl h-[510px] flex items-center justify-center text-center p-6 text-gray-500 font-mono">
                <div className="space-y-2">
                  <Activity className="w-8 h-8 text-cyber-cyan mx-auto animate-pulse" />
                  <div>Select a ticket from the left queue list to read or respond.</div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

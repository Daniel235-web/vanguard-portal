"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ShieldAlert, Sparkles, Check } from "lucide-react";

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

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  
  // Intake Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  
  // Chatting State
  const [chatInput, setChatInput] = useState("");
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync state with local storage
  useEffect(() => {
    const savedTicketId = localStorage.getItem("ark_shield_active_ticket_id");
    if (savedTicketId) {
      setTicketId(savedTicketId);
      loadTicket(savedTicketId);
    }
  }, []);

  // Poll for agent replies/updates periodically
  useEffect(() => {
    if (!ticketId || !isOpen) return;
    
    const interval = setInterval(() => {
      loadTicket(ticketId);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [ticketId, isOpen]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTicket?.messages, isOpen]);

  const loadTicket = (id: string) => {
    const allTicketsRaw = localStorage.getItem("ark_shield_support_tickets");
    if (allTicketsRaw) {
      const tickets: Ticket[] = JSON.parse(allTicketsRaw);
      const found = tickets.find((t) => t.id === id);
      if (found) {
        setActiveTicket(found);
      }
    }
  };

  // Helper to dispatch webhook alert to owner
  const dispatchWebhook = async (ticket: Ticket, newText: string, isNew: boolean) => {
    const webhookUrl = localStorage.getItem("ark_shield_support_webhook");
    if (!webhookUrl || !webhookUrl.startsWith("http")) return;

    try {
      const payload = {
        embeds: [
          {
            title: isNew ? "🛡️ New Support Ticket Opened" : "💬 New Client Message Received",
            description: isNew 
              ? `Client **${ticket.name}** has initiated a support request.`
              : `Client **${ticket.name}** sent a message in ticket **${ticket.id}**.`,
            color: isNew ? 62206 : 14239343, // Cyan vs Purple
            fields: [
              { name: "Ticket ID", value: ticket.id, inline: true },
              { name: "Client Name", value: ticket.name, inline: true },
              { name: "Client Email", value: ticket.email, inline: true },
              { name: "Message Content", value: newText || "No content" }
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "Ark Shield Tech Support Relays • Open /owner/support to reply"
            }
          }
        ]
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Webhook dispatch failed", err);
    }
  };

  const handleStartTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !messageText) return;

    const newTicketId = "TK-" + Math.floor(100000 + Math.random() * 900000);
    const newTicket: Ticket = {
      id: newTicketId,
      name,
      email,
      status: "pending",
      createdAt: new Date().toISOString(),
      messages: [
        {
          sender: "user",
          text: messageText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    // Save ticket globally
    const allTicketsRaw = localStorage.getItem("ark_shield_support_tickets");
    const tickets: Ticket[] = allTicketsRaw ? JSON.parse(allTicketsRaw) : [];
    tickets.push(newTicket);
    localStorage.setItem("ark_shield_support_tickets", JSON.stringify(tickets));

    // Save as active ticket for this client
    localStorage.setItem("ark_shield_active_ticket_id", newTicketId);
    setTicketId(newTicketId);
    setActiveTicket(newTicket);
    
    // Clear form inputs
    setMessageText("");

    // Send Webhook to owner
    await dispatchWebhook(newTicket, newTicket.messages[0].text, true);
    
    // Auto-respond with system acknowledgement
    setTimeout(() => {
      addSystemReply(newTicketId, "Your encrypted intake request is queued. An operator has been alerted and will respond shortly.");
    }, 1500);
  };

  const addSystemReply = (tId: string, replyText: string) => {
    const allTicketsRaw = localStorage.getItem("ark_shield_support_tickets");
    if (!allTicketsRaw) return;
    const tickets: Ticket[] = JSON.parse(allTicketsRaw);
    const idx = tickets.findIndex((t) => t.id === tId);
    if (idx !== -1) {
      tickets[idx].messages.push({
        sender: "owner",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      localStorage.setItem("ark_shield_support_tickets", JSON.stringify(tickets));
      loadTicket(tId);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !ticketId || !activeTicket) return;

    const allTicketsRaw = localStorage.getItem("ark_shield_support_tickets");
    if (!allTicketsRaw) return;
    const tickets: Ticket[] = JSON.parse(allTicketsRaw);
    const idx = tickets.findIndex((t) => t.id === ticketId);
    if (idx !== -1) {
      const msg: Message = {
        sender: "user",
        text: chatInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      tickets[idx].messages.push(msg);
      // Set back to pending/active when client replies
      if (tickets[idx].status === "resolved") {
        tickets[idx].status = "active";
      }
      localStorage.setItem("ark_shield_support_tickets", JSON.stringify(tickets));
      setChatInput("");
      loadTicket(ticketId);

      // Trigger Webhook alert
      await dispatchWebhook(tickets[idx], msg.text, false);
    }
  };

  const handleCloseSession = () => {
    localStorage.removeItem("ark_shield_active_ticket_id");
    setTicketId(null);
    setActiveTicket(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyber-cyan to-spy-purple flex items-center justify-center text-brand-dark shadow-[0_0_25px_rgba(0,242,254,0.4)] cursor-pointer relative"
        aria-label="Contact Support"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
              <MessageSquare className="w-6 h-6 text-brand-dark" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Unread dot simulation */}
        {ticketId && activeTicket && activeTicket.status === "active" && !isOpen && (
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vault-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-vault-green"></span>
          </span>
        )}
      </motion.button>

      {/* Expanded Support Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 h-[480px] bg-brand-slate border border-white/10 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-brand-dark px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-vault-green animate-pulse" />
                <div>
                  <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Ark Shield Operations</h4>
                  <span className="text-[9px] font-mono text-gray-500">SECURE CONSOLE HELP TERMINAL</span>
                </div>
              </div>
              
              {ticketId && (
                <button
                  onClick={handleCloseSession}
                  className="text-[9px] font-mono bg-red-500/10 border border-red-500/20 text-red-400 hover:text-white px-2 py-1 rounded"
                >
                  Close Session
                </button>
              )}
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-brand-dark/20">
              {!ticketId ? (
                /* Intake Form when no ticket exists */
                <form onSubmit={handleStartTicket} className="space-y-3.5 pt-2">
                  <div className="space-y-1 text-center pb-2">
                    <ShieldAlert className="w-6 h-6 text-cyber-cyan mx-auto mb-1 animate-pulse" />
                    <h5 className="font-display font-bold text-sm text-white">Initiate Support Inquiry</h5>
                    <p className="text-[10px] text-gray-500 max-w-xs mx-auto">
                      All messages undergo client-side database relay. Enter your alias details to signal an operations officer.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase block">Secure Alias</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Reader-01"
                      className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase block">Secure Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="secure@domain.com"
                      className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase block">Support Request Details</label>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="How can we assist you with asset tracing, forensics, or vault deposits?"
                      rows={3}
                      className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-vault-green text-brand-dark font-bold text-xs hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-200"
                  >
                    Transmit Secure Inquiry
                  </button>
                </form>
              ) : (
                /* Chat Conversation bubbles when ticket is active */
                <div className="space-y-3 font-sans">
                  {activeTicket?.messages.map((msg, index) => {
                    const isOwner = msg.sender === "owner";
                    return (
                      <div key={index} className={`flex flex-col ${isOwner ? "items-start" : "items-end"}`}>
                        <span className="text-[8px] font-mono text-gray-500 mb-0.5 px-1">
                          {isOwner ? "Ark Operator" : activeTicket.name} • {msg.timestamp}
                        </span>
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                            isOwner
                              ? "bg-brand-slate border border-white/5 text-gray-200 rounded-tl-sm"
                              : "bg-cyber-cyan text-brand-dark font-semibold rounded-tr-sm shadow-[0_0_10px_rgba(0,242,254,0.1)]"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>

            {/* Input Bar (Only visible when chatting) */}
            {ticketId && (
              <form onSubmit={handleSendMessage} className="p-3 bg-brand-dark border-t border-white/5 flex items-center space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type secure response..."
                  className="flex-1 bg-brand-slate border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-xl bg-cyber-cyan text-brand-dark flex items-center justify-center hover:shadow-[0_0_10px_rgba(0,242,254,0.3)] transition-all duration-200 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

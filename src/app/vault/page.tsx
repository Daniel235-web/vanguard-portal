"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Cpu, 
  Lock, 
  Wallet, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  RefreshCw, 
  AlertCircle, 
  X, 
  ChevronRight,
  Sparkles,
  Key,
  CreditCard
} from "lucide-react";
import CreditCardForm from "../components/CreditCardForm";

// Staking Pools Nodes Data
const initialNodes = [
  { id: "alpha", name: "Alpha Cyber Node", rate: 84.6, poolSize: "24.5M USD", active: true },
  { id: "omega", name: "Omega Blockchain Escrow Pool", rate: 91.2, poolSize: "68.2M USD", active: true },
  { id: "beta", name: "Beta Device Forensic Pool", rate: 53.4, poolSize: "12.8M USD", active: true }
];

export default function WealthVault() {
  // Calculator states
  const [amount, setAmount] = useState(50000);
  const [term, setTerm] = useState(6); // in months: 3, 6, 12
  
  // Wallet states
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  // Credit Card Flow
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);

  // Nodes states
  const [nodes, setNodes] = useState(initialNodes);

  // Load wallet connection status from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ark_shield_wallet");
    if (saved) {
      setIsConnected(true);
      setWalletAddress(saved);
    }

    // Sync status if modified elsewhere
    const handleSync = () => {
      const current = localStorage.getItem("ark_shield_wallet");
      if (current) {
        setIsConnected(true);
        setWalletAddress(current);
      } else {
        setIsConnected(false);
        setWalletAddress("");
      }
    };
    window.addEventListener("ark_shield_wallet_update", handleSync);
    return () => window.removeEventListener("ark_shield_wallet_update", handleSync);
  }, []);

  // Fluctuate node staking rates slightly for dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) => 
        prev.map((node) => ({
          ...node,
          rate: Math.min(100, Math.max(10, node.rate + (Math.random() > 0.5 ? 0.1 : -0.1)))
        }))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Calculate yield parameters
  const calculateAPY = () => {
    let baseAPY = 8;
    if (amount >= 500000) baseAPY = 15;
    else if (amount >= 250000) baseAPY = 12;
    else if (amount >= 100000) baseAPY = 10;

    let termBonus = 0;
    if (term === 6) termBonus = 1;
    else if (term === 12) termBonus = 3;

    return baseAPY + termBonus;
  };

  const apy = calculateAPY();
  const projectedEarnings = amount * (apy / 100) * (term / 12);
  const cryptoBTC = projectedEarnings / 65000;
  const cryptoETH = projectedEarnings / 3400;

  // Format currency helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  // Connect mock wallet handler
  const handleConnectWallet = (walletType: string) => {
    setConnectingWallet(walletType);
    
    // Simulate web3 handshake delay
    setTimeout(() => {
      const mockAddr = "0x71C7" + Math.floor(1000 + Math.random() * 9000) + "..." + Math.floor(1000 + Math.random() * 9000) + "A8B9";
      localStorage.setItem("ark_shield_wallet", mockAddr);
      setWalletAddress(mockAddr);
      setIsConnected(true);
      setConnectingWallet(null);
      setIsModalOpen(false);
      // Dispatch sync event
      window.dispatchEvent(new Event("ark_shield_wallet_update"));
    }, 1800);
  };

  // Disconnect mock wallet
  const handleDisconnectWallet = () => {
    localStorage.removeItem("ark_shield_wallet");
    setWalletAddress("");
    setIsConnected(false);
    // Dispatch sync event
    window.dispatchEvent(new Event("ark_shield_wallet_update"));
  };

  // Credit Card successful payment simulation
  const handleCreditCardSuccess = (txId: string) => {
    setIsConnected(true);
    setWalletAddress(`Card Verified (Tx: ${txId})`);
    setIsModalOpen(false);
    setShowCreditCardForm(false);
    alert(`Payment Successful!\nAuthorized Retainer of ${formatCurrency(amount)} allocated in Ark Shield Nodes.\nTransaction Hash ID: ${txId}`);
  };

  return (
    <div className="relative z-10 w-full min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* 1. Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-vault-green/10 border border-vault-green/30 text-vault-green text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider animate-pulse"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>SECURE ASSET DEPLOYMENT</span>
          </motion.div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
            Secured Wealth <span className="bg-clip-text text-transparent bg-gradient-to-r from-vault-green to-cyber-cyan">Vault</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Staking nodes configured with double-escrow logic and fully protected under Aegis Digital cyber-insurance protocols. Yield returns generated transparently via security liquidity backing.
          </p>
        </section>

        {/* 2. Vault Investment Calculator */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Calculator Input Panel */}
          <div className="lg:col-span-7 glass-panel-heavy rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl flex flex-col justify-between space-y-8">
            
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-vault-green" />
                <span>Yield Parameters Calculator</span>
              </h3>
              <p className="text-xs text-gray-500">Adjust the allocation sliders below to project interest rate gains.</p>
            </div>

            {/* Slider Amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-gray-400">INVESTMENT ALLOCATION</span>
                <span className="text-vault-green font-bold">{formatCurrency(amount)} USD</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="1000000" 
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-dark rounded-lg appearance-none cursor-pointer accent-vault-green"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>$1,000</span>
                <span>$500,000</span>
                <span>$1,000,000</span>
              </div>
            </div>

            {/* Lockup Selection */}
            <div className="space-y-4">
              <span className="text-xs font-semibold text-gray-400 uppercase font-mono block">Node Lockup Period</span>
              <div className="grid grid-cols-3 gap-4">
                {[3, 6, 12].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTerm(m)}
                    className={`py-3 rounded-xl border font-mono text-sm transition-all duration-200 ${
                      term === m 
                        ? "bg-vault-green/5 border-vault-green text-vault-green shadow-[0_0_10px_rgba(0,245,160,0.15)]"
                        : "bg-brand-slate/50 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Projected Returns Output */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-500 block uppercase">Projected APY</span>
                <span className="font-display font-black text-2xl text-vault-green">{apy}%</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-500 block uppercase">Projected Earnings</span>
                <span className="font-display font-black text-2xl text-white">{formatCurrency(projectedEarnings)}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-500 block uppercase">Crypto Equivalent</span>
                <span className="font-mono text-xs text-gray-300 block truncate">
                  {cryptoBTC.toFixed(4)} BTC
                </span>
                <span className="font-mono text-xs text-gray-400 block truncate">
                  {cryptoETH.toFixed(3)} ETH
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Vault Door Visuals & Insurance Cert */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Visual Photography Card */}
            <div className="glass-panel rounded-3xl overflow-hidden relative border border-white/5 shadow-2xl h-56">
              <div className="w-full h-full overflow-hidden relative">
                <motion.img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
                  alt="Steel banking vault building entrance" 
                  className="w-full h-full object-cover filter contrast-125 brightness-75"
                  animate={{ scale: [1, 1.05, 1], x: [0, 4, 0] }}
                  transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/40 to-transparent z-10" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-1 z-20">
                <span className="text-[10px] font-mono text-vault-green font-bold tracking-widest uppercase">Physical Staking Security</span>
                <h4 className="font-display font-bold text-white text-lg">Institutional Grade Storage</h4>
              </div>
            </div>

            {/* Insurance Certificate Block */}
            <div className="glass-panel rounded-3xl p-6 border border-vault-green/20 bg-vault-green/5 relative overflow-hidden flex-1 flex flex-col justify-between space-y-4">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-vault-green/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center space-x-3 text-vault-green">
                <Shield className="w-6 h-6 animate-pulse" />
                <span className="font-display font-bold text-xs uppercase tracking-widest">Aegis Indemnity Certificate</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Staked capital deployed in Ark Shield nodes is fully insured up to **$5,000,000 USD** under Aegis Cyber Protection. Protection covers smart contract exploits, oracle pricing anomalies, and malicious validation attacks.
                </p>
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 pt-2 border-t border-vault-green/10">
                  <span>CERTIFICATE ID: AEG-8842-AST</span>
                  <span className="text-vault-green font-bold">STATUS: VALID</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* 3. Node Status Terminal */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                Node Status Terminal
              </h2>
              <p className="text-gray-400 text-xs">
                Real-time active validator pool telemetry indexes. Staking pools configure double multi-sig controls.
              </p>
            </div>
            
            {/* Wallet Dashboard Action */}
            <div>
              {isConnected ? (
                <div className="flex items-center space-x-3 bg-brand-slate border border-white/5 px-4 py-2.5 rounded-xl text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-vault-green animate-ping" />
                  <span className="text-white truncate max-w-[200px]">{walletAddress}</span>
                  <button 
                    onClick={handleDisconnectWallet} 
                    className="text-red-400 hover:text-red-300 underline font-semibold cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-vault-green text-brand-dark font-bold text-xs hover:shadow-[0_0_15px_rgba(0,245,160,0.3)] transition-all duration-300"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Deposit Funds</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nodes.map((node) => (
              <motion.div 
                key={node.id} 
                whileHover={{ y: -4, borderColor: "rgba(0,245,160,0.4)", boxShadow: "0 10px 30px -10px rgba(0,245,160,0.1)" }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl p-6 space-y-5 border border-white/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-500 uppercase">Staking Validator Pool</span>
                  <div className="flex items-center space-x-1.5 text-xs text-vault-green font-mono">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vault-green opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-vault-green"></span>
                    </span>
                    <span>ONLINE</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-white text-base">{node.name}</h4>
                  <div className="flex justify-between text-xs text-gray-400 font-mono">
                    <span>LIQUIDITY CAP</span>
                    <span className="text-white">{node.poolSize}</span>
                  </div>
                </div>

                {/* Staking Ratio Load */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                    <span>POOL CAPACITY</span>
                    <span>{node.rate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-brand-dark rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-vault-green" 
                      style={{ width: `${node.rate}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!isConnected) {
                      setIsModalOpen(true);
                    } else {
                      alert(`Transaction sent: Deploying ${formatCurrency(amount)} to ${node.name}.`);
                    }
                  }}
                  className="w-full text-center flex items-center justify-center space-x-2 py-3 rounded-xl bg-brand-slate text-white border border-vault-green/20 hover:border-vault-green text-xs font-bold transition-all duration-200"
                >
                  <span>Stake Allocation Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* Wallet Connect Simulator Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setShowCreditCardForm(false);
              }}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-brand-slate border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6 z-10 overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-vault-green" />
                  <h3 className="font-display font-bold text-white text-base">
                    {showCreditCardForm ? "Credit Card Staking" : "Select Payment Method"}
                  </h3>
                </div>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setShowCreditCardForm(false);
                  }} 
                  className="text-gray-400 hover:text-white"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {showCreditCardForm ? (
                /* Interactive Card Form Panel */
                <CreditCardForm
                  amount={amount}
                  onSuccess={handleCreditCardSuccess}
                  onCancel={() => setShowCreditCardForm(false)}
                />
              ) : connectingWallet ? (
                /* Connecting loader spinner */
                <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                  <RefreshCw className="w-8 h-8 text-vault-green animate-spin" />
                  <div className="space-y-1">
                    <p className="text-sm text-white font-semibold">Initiating Sandbox Connection...</p>
                    <p className="text-xs text-gray-500 font-mono">Authenticating provider {connectingWallet} keys</p>
                  </div>
                </div>
              ) : (
                /* Choice Screen */
                <div className="flex flex-col space-y-3">
                  
                  {/* Credit Card Deposit option */}
                  <button
                    onClick={() => setShowCreditCardForm(true)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-cyber-cyan/10 to-vault-green/10 hover:from-cyber-cyan/20 hover:to-vault-green/20 border border-cyber-cyan/30 text-left transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-8 h-8 rounded-lg bg-cyber-cyan/20 flex items-center justify-center text-cyber-cyan">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-white block">Credit Card Retainer</span>
                        <span className="text-[10px] text-gray-400 block font-mono">Instant Bank Authorization</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-cyber-cyan group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <div className="py-1 flex items-center justify-center space-x-2 text-[9px] font-mono text-gray-500">
                    <div className="h-[1px] bg-white/5 flex-1" />
                    <span>OR CONNECT CRYPTO WALLET</span>
                    <div className="h-[1px] bg-white/5 flex-1" />
                  </div>

                  {/* metamask */}
                  <button
                    onClick={() => handleConnectWallet("MetaMask")}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-brand-dark hover:bg-brand-dark/80 border border-white/5 hover:border-vault-green/40 text-left transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-sm">MM</div>
                      <span className="text-sm font-semibold text-white">MetaMask Extension</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-vault-green transition-colors" />
                  </button>

                  {/* coinbase */}
                  <button
                    onClick={() => handleConnectWallet("Coinbase")}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-brand-dark hover:bg-brand-dark/80 border border-white/5 hover:border-vault-green/40 text-left transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-sm">CB</div>
                      <span className="text-sm font-semibold text-white">Coinbase Wallet</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-vault-green transition-colors" />
                  </button>

                  {/* ledger */}
                  <button
                    onClick={() => handleConnectWallet("Ledger")}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-brand-dark hover:bg-brand-dark/80 border border-white/5 hover:border-vault-green/40 text-left transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-sm">LD</div>
                      <span className="text-sm font-semibold text-white">Ledger Nano X Hardware</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-vault-green transition-colors" />
                  </button>
                </div>
              )}

              <div className="bg-brand-dark/50 border border-white/5 rounded-xl p-3.5 flex items-start space-x-3">
                <AlertCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                <p className="text-[10px] text-gray-500 leading-normal font-mono">
                  Sandbox simulation mode active. Connection does not verify mainnet private keys or transfer real funds. Staking parameters execute in demo environments.
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

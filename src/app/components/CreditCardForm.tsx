"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CreditCard, RefreshCw, X, AlertTriangle } from "lucide-react";

interface CreditCardFormProps {
  amount: number;
  onSuccess: (txId: string) => void;
  onCancel: () => void;
}

export default function CreditCardForm({ amount, onSuccess, onCancel }: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState("");

  // Luhn Algorithm validation
  const validateLuhn = (num: string) => {
    const cleanNum = num.replace(/\s+/g, "");
    if (!/^\d+$/.test(cleanNum) || cleanNum.length < 13) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanNum.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNum.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  // Card brand detection
  const getCardType = (num: string) => {
    const cleanNum = num.replace(/\D/g, "");
    if (cleanNum.startsWith("4")) return "visa";
    if (/^5[1-5]/.test(cleanNum)) return "mastercard";
    if (/^3[47]/.test(cleanNum)) return "amex";
    return "generic";
  };

  // Card number input formatter
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    const formatted = input.substring(0, 16).replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
    setPayError("");
  };

  // Expiry date formatter
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 2) {
      input = input.substring(0, 2) + "/" + input.substring(2, 4);
    }
    setExpiry(input.substring(0, 5));
    setPayError("");
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    setCvv(input.substring(0, 4));
    setPayError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayError("");

    const cardType = getCardType(cardNumber);
    const requiredLength = cardType === "amex" ? 15 : 16;
    const cleanNum = cardNumber.replace(/\s+/g, "");

    if (cleanNum.length < requiredLength) {
      setPayError(`Invalid card number. Required digits: ${requiredLength}`);
      return;
    }

    if (!validateLuhn(cleanNum)) {
      setPayError("Card number checksum validation failed. Please check digits.");
      return;
    }

    if (expiry.length < 5) {
      setPayError("Invalid expiry date. Use MM/YY format.");
      return;
    }

    if (cvv.length < 3) {
      setPayError("Invalid CVV code.");
      return;
    }

    // Start payment simulation
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      const txId = "TX-CC-" + Math.floor(100000 + Math.random() * 900000);
      onSuccess(txId);
    }, 2500);
  };

  const cardType = getCardType(cardNumber);

  return (
    <div className="space-y-6 max-w-sm mx-auto">
      {/* 3D-Like Flipping Virtual Card */}
      <div className="perspective-1000 w-full h-44 relative cursor-pointer select-none">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full preserve-3d relative"
        >
          {/* Card Front */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-brand-dark border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-2xl overflow-hidden">
            {/* Cybernet accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-cyan/5 rounded-full blur-xl pointer-events-none" />
            
            {/* Header: Chip and Brand */}
            <div className="flex justify-between items-start">
              <div className="w-10 h-7 bg-amber-500/20 border border-amber-500/30 rounded-md flex items-center justify-center overflow-hidden">
                {/* Chip design lines */}
                <div className="grid grid-cols-3 gap-[1px] w-full h-full p-1 opacity-70">
                  <div className="border border-amber-500/40 rounded-sm"></div>
                  <div className="border border-amber-500/40 rounded-sm"></div>
                  <div className="border border-amber-500/40 rounded-sm"></div>
                  <div className="border border-amber-500/40 rounded-sm"></div>
                  <div className="border border-amber-500/40 rounded-sm"></div>
                  <div className="border border-amber-500/40 rounded-sm"></div>
                </div>
              </div>

              {/* Brand Label */}
              <span className="text-xs font-mono font-bold tracking-widest text-cyber-cyan uppercase">
                {cardType === "visa" && "VISA"}
                {cardType === "mastercard" && "MASTERCARD"}
                {cardType === "amex" && "AMEX"}
                {cardType === "generic" && "ARK SHIELD"}
              </span>
            </div>

            {/* Card Number */}
            <div className="text-lg font-mono tracking-widest text-white py-1">
              {cardNumber || "•••• •••• •••• ••••"}
            </div>

            {/* Footer: Name and Expiry */}
            <div className="flex justify-between items-center text-xs font-mono">
              <div className="truncate pr-4 uppercase">
                <span className="text-[8px] text-gray-500 block">CARDHOLDER</span>
                <span className="text-gray-300 font-semibold truncate block max-w-[180px]">
                  {cardName || "NAME ON CARD"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-gray-500 block">EXPIRES</span>
                <span className="text-gray-300 font-semibold">{expiry || "MM/YY"}</span>
              </div>
            </div>
          </div>

          {/* Card Back */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-brand-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col justify-between py-5 overflow-hidden rotate-y-180">
            {/* Magnetic Strip */}
            <div className="w-full h-9 bg-brand-dark/90" />

            {/* Signature Area & CVV */}
            <div className="px-5 space-y-1">
              <span className="text-[8px] font-mono text-gray-500 block">SECURE CODE CVV</span>
              <div className="flex items-center">
                <div className="flex-1 h-7 bg-slate-700/50 rounded-l flex items-center px-2 font-mono italic text-[10px] text-gray-400 select-none">
                  xxx xxx xxx xxx
                </div>
                <div className="w-12 h-7 bg-white text-brand-dark font-mono font-bold text-center flex items-center justify-center rounded-r text-sm">
                  {cvv || "•••"}
                </div>
              </div>
            </div>

            {/* Legal / Notes */}
            <div className="px-5 text-[7px] font-mono text-gray-500 leading-none">
              This card is processed via encrypted gateways under Aegis Security compliance. Authorized transactions represent instant digital liquidity swaps.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Input Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Cardholder Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-mono font-bold text-gray-400 uppercase block">Cardholder Name</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => {
              setCardName(e.target.value.toUpperCase());
              setPayError("");
            }}
            placeholder="E.g. JOHN DOE"
            className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-cyber-cyan transition-colors"
            required
            disabled={isPaying}
          />
        </div>

        {/* Card Number */}
        <div className="space-y-1">
          <label className="text-[10px] font-mono font-bold text-gray-400 uppercase block">Card Number</label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="4000 1234 5678 9010"
              className="w-full bg-brand-dark border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-cyber-cyan transition-colors"
              required
              disabled={isPaying}
            />
            <CreditCard className="absolute right-3.5 top-3 w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-gray-400 uppercase block">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono text-center focus:outline-none focus:border-cyber-cyan transition-colors"
              required
              disabled={isPaying}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-gray-400 uppercase block">CVV Code</label>
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              onFocus={() => setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
              placeholder="123"
              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono text-center focus:outline-none focus:border-cyber-cyan transition-colors"
              required
              disabled={isPaying}
            />
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {payError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl p-3 text-[10px] flex items-start space-x-2 font-mono"
            >
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{payError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Actions */}
        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-brand-slate hover:bg-brand-slate/80 border border-white/5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
            disabled={isPaying}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="flex-2 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-vault-green text-brand-dark font-bold text-xs hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-200 flex items-center justify-center space-x-2"
            disabled={isPaying}
          >
            {isPaying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AUTHORIZING...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PAY {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount)}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

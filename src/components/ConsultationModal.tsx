import React, { useState, useEffect } from 'react';
import { AGENTS } from '../data/mockData';
import { Agent } from '../types';
import { X, CheckCircle2, Shield, Calendar, Compass, PhoneCall } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  selectedAgent?: Agent | null;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  selectedAgent,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agentId, setAgentId] = useState(selectedAgent?.id || AGENTS[0].id);
  const [consultationType, setConsultationType] = useState('Acquisition Advisory');
  const [targetMarket, setTargetMarket] = useState('Beverly Hills');
  const [preferredDate, setPreferredDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedAgent) {
      setAgentId(selectedAgent.id);
    }
  }, [selectedAgent]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const assignedAgent = AGENTS.find((a) => a.id === agentId) || AGENTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF9F5] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden z-10 border border-stone-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Private Advisory Appointment</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-amber-700 mx-auto" />
              <h3 className="font-serif text-2xl text-stone-900 font-normal">
                Consultation Requested
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-stone-900">{name}</strong>. Your consultation request with Senior Partner <strong className="text-stone-900">{assignedAgent.name}</strong> for {consultationType} has been scheduled. Our private office will confirm the calendar coordinates and video/in-person location via {email}.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-lg hover:bg-stone-800"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-serif text-2xl text-stone-900 font-normal">
                  Schedule Private Fiduciary Consultation
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Confidential advisory session regarding acquisitions, private treaty sales, or off-market access.
                </p>
              </div>

              {errorMsg && (
                <div className="p-2.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Advisory Partner Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                  Select Advisory Partner
                </label>
                <select
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="w-full h-11 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                >
                  {AGENTS.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name} — {agent.title} ({agent.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. eleanor@vance-capital.com"
                    className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (310) 555-0199"
                    className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                    Advisory Focus
                  </label>
                  <select
                    value={consultationType}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                  >
                    <option value="Acquisition Advisory">Acquisition Advisory</option>
                    <option value="Off-Market Registry Access">Off-Market Registry Access</option>
                    <option value="Discreet Property Sale">Discreet Property Sale</option>
                    <option value="Architectural Valuation">Architectural Valuation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                    Target Metropolis
                  </label>
                  <select
                    value={targetMarket}
                    onChange={(e) => setTargetMarket(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                  >
                    <option value="Beverly Hills">Beverly Hills & Bel Air</option>
                    <option value="Miami Beach">Miami Beach & Islands</option>
                    <option value="Manhattan">Manhattan Billionaires' Row</option>
                    <option value="Aspen">Aspen Mountain</option>
                    <option value="London Mayfair">London Mayfair</option>
                    <option value="Cap Ferrat">Cap Ferrat & Riviera</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg bg-stone-900 text-white text-xs uppercase font-semibold tracking-wider hover:bg-stone-800 transition-all shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming Appointment...' : 'Confirm Advisory Appointment'}
                </button>
              </div>

              <p className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-700" />
                <span>Protected by Attorney-Client Confidentiality Standards</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

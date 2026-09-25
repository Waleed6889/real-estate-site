import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send, Clock, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locationPref, setLocationPref] = useState('Beverly Hills');
  const [budget, setBudget] = useState('$15M - $25M');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields before submitting.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid business or personal email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const offices = [
    {
      city: 'Beverly Hills',
      address: '450 North Rodeo Drive, Suite 800',
      phone: '+1 (310) 555-0198',
      email: 'beverlyhills@veyraestates.com',
    },
    {
      city: 'Miami Beach',
      address: '1111 Brickell Avenue, 24th Floor',
      phone: '+1 (305) 555-0144',
      email: 'miami@veyraestates.com',
    },
    {
      city: 'London Mayfair',
      address: '14 Grosvenor Square, Mayfair W1K',
      phone: '+44 20 7946 0195',
      email: 'london@veyraestates.com',
    },
    {
      city: 'Geneva Private Bank District',
      address: '42 Rue du Rhône, 1204 Genève',
      phone: '+41 22 555 0180',
      email: 'geneva@veyraestates.com',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Office Directory & Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
                Confidential Inquiry
              </div>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-[1.15]">
                Initiate a Private Advisory Dialogue.
              </h2>
              <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed font-light">
                Whether you are seeking acquisition representation, considering the discreet sale of a trophy asset, or requesting an off-market dossier, our Senior Partners respond within four business hours.
              </p>
            </div>

            {/* Offices List */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h3 className="font-serif text-lg text-stone-900 font-medium">
                Global Advisory Offices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {offices.map((office) => (
                  <div
                    key={office.city}
                    className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs"
                  >
                    <h4 className="font-serif text-base font-semibold text-stone-900">
                      {office.city}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {office.address}
                    </p>
                    <p className="text-xs text-stone-700 font-mono mt-2 font-medium">
                      {office.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-900/5 rounded-xl border border-amber-900/15 text-xs text-stone-700 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <span>
                All interactions are protected by bilateral non-disclosure protocols and private banking compliance standards.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-amber-700 mx-auto" />
                <h3 className="font-serif text-2xl text-stone-900 font-normal">
                  Inquiry Confirmed
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong className="text-stone-900">{fullName}</strong>. A Senior Advisory Partner from our {locationPref} office has received your request and will contact you confidentially via {email} or {phone}.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl text-stone-900 font-normal">
                  Private Client Registry Request
                </h3>
                <p className="text-xs text-stone-500 mb-6">
                  Please outline your target market and requirements. Fields marked with * are required.
                </p>

                {errorMsg && (
                  <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Julian Montgomery"
                      className="w-full h-11 px-3.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. julian@montgomery.holdings"
                      className="w-full h-11 px-3.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                      Direct Telephone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (310) 555-0182"
                      className="w-full h-11 px-3.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                      Target Metropolis / Region
                    </label>
                    <select
                      value={locationPref}
                      onChange={(e) => setLocationPref(e.target.value)}
                      className="w-full h-11 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                    >
                      <option value="Beverly Hills">Beverly Hills & Bel Air</option>
                      <option value="Miami Beach">Miami Beach & Islands</option>
                      <option value="Manhattan">Manhattan & Hamptons</option>
                      <option value="Aspen">Aspen & Mountain Resorts</option>
                      <option value="London Mayfair">London Mayfair & Belgravia</option>
                      <option value="The Cotswolds">The Cotswolds & Country Estates</option>
                      <option value="Cap Ferrat">Cap Ferrat & French Riviera</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                    Anticipated Investment Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full h-11 px-3 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                  >
                    <option value="$10M - $15M">$10,000,000 – $15,000,000</option>
                    <option value="$15M - $25M">$15,000,000 – $25,000,000</option>
                    <option value="$25M - $50M">$25,000,000 – $50,000,000</option>
                    <option value="$50M+">$50,000,000+ (Ultra Trophy)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                    Confidential Requirements / Inquiry Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please specify desired architectural style, water frontage, privacy perimeter, or specific properties of interest..."
                    className="w-full p-3.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase font-semibold tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isSubmitting ? 'Transmitting Securely...' : 'Submit Confidential Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

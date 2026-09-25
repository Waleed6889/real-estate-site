import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Globe } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenConsultation,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubmitted(true);
      setTimeout(() => setNewsletterSubmitted(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#121316] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-stone-800">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <a href="#" className="inline-block">
              <span className="font-serif text-2xl tracking-wider text-white font-medium">
                VEYRA
              </span>
              <span className="ml-2 text-xs uppercase tracking-[0.25em] font-sans text-stone-400">
                Estates
              </span>
            </a>

            <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm">
              International luxury real estate brokerage and private wealth advisory specializing in architecturally significant residences, trophy estates, and confidential off-market acquisitions.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2">
                The Veyra Architectural Journal
              </span>
              <p className="text-xs text-stone-500 mb-3 font-light">
                Quarterly private market intelligence, off-market registry highlights, and architectural monographs.
              </p>

              {newsletterSubmitted ? (
                <div className="p-3 bg-stone-900 border border-amber-900/30 text-amber-300 text-xs rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Your email has been added to our private distribution list.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter confidential email..."
                    className="flex-grow h-10 px-3.5 text-xs bg-stone-900/80 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-amber-600"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 bg-stone-100 hover:bg-white text-stone-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm text-white uppercase tracking-wider font-semibold">
              The Firm
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#properties" className="hover:text-white transition-colors">
                  Curated Residences
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Architectural Typologies
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  The Veyra Standard
                </a>
              </li>
              <li>
                <a href="#agents" className="hover:text-white transition-colors">
                  Advisory Partners
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Heritage & Ethos
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="hover:text-white transition-colors text-left"
                >
                  Schedule Private Showing
                </button>
              </li>
            </ul>
          </div>

          {/* Prime Markets */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm text-white uppercase tracking-wider font-semibold">
              Metropolises
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>Beverly Hills & Bel Air</li>
              <li>Miami Beach & Islands</li>
              <li>Manhattan Billionaires' Row</li>
              <li>Aspen & Mountain Enclaves</li>
              <li>London Mayfair & Belgravia</li>
              <li>Saint-Jean-Cap-Ferrat</li>
              <li>The Cotswolds & Heritage Manors</li>
            </ul>
          </div>

          {/* Private Registry & Legal */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm text-white uppercase tracking-wider font-semibold">
              Advisory Compliance
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-white transition-colors text-left"
                >
                  Confidentiality & Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Private Brokerage
                </button>
              </li>
              <li>Equal Housing Opportunity Notice</li>
              <li>Anti-Money Laundering Protocols</li>
              <li>Escrow Verification Standards</li>
            </ul>

            <div className="pt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>Licensed Global Real Estate Brokerage</span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-light">
          <p>
            © {new Date().getFullYear()} Veyra Estates LLC. All rights reserved. Equal Housing Opportunity.
          </p>

          <p className="max-w-xl text-center md:text-right">
            All material presented herein is intended for information purposes only. While information is believed to be accurate, it is represented subject to errors, omissions, changes, or withdrawal without notice.
          </p>
        </div>
      </div>
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[88vh] flex flex-col border border-stone-200">
        {/* Header & Tabs */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                activeTab === 'privacy'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy & Discretion Policy</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                activeTab === 'terms'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Brokerage</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 text-xs sm:text-sm text-stone-700 leading-relaxed space-y-5 font-light">
          {activeTab === 'privacy' ? (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-stone-900 font-normal">
                Veyra Estates Privacy, Confidentiality & Data Protection Policy
              </h3>
              <p className="text-stone-500 text-xs">
                Last updated: January 2026. Effective for all private client inquiries and off-market registry access.
              </p>

              <h4 className="font-serif text-base font-semibold text-stone-900 pt-2">
                1. Principle of Strict Discretion
              </h4>
              <p>
                At Veyra Estates LLC, we hold the privacy and identity of our prospective and transacting clients in absolute confidence. Because we represent high-profile principals, family offices, and institutional investors, our data handling standards exceed industry averages, complying with the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and Swiss fiduciary standards.
              </p>

              <h4 className="font-serif text-base font-semibold text-stone-900 pt-2">
                2. Information Gathered
              </h4>
              <p>
                We only collect information directly provided by you during consultation bookings, property dossier requests, or private showings. This includes your name, email address, direct phone contact, verified investment criteria, and non-disclosure authorizations. We do not sell, rent, or lease client data to commercial advertising aggregators or third-party mailing networks.
              </p>

              <h4 className="font-serif text-base font-semibold text-stone-900 pt-2">
                3. Off-Market Registry Non-Disclosure
              </h4>
              <p>
                Unlisted and private treaty properties presented through Veyra Estates are subject to bilateral non-disclosure agreements (NDAs). Inquiries on these properties are logged in an isolated, encrypted ledger accessible solely to assigned Senior Partners and compliance officers.
              </p>

              <h4 className="font-serif text-base font-semibold text-stone-900 pt-2">
                4. Cookies & Web Analytics
              </h4>
              <p>
                Our digital platforms utilize essential session cookies and privacy-respecting client analytics to monitor site performance and responsive layout integrity. You may disable cookies at any time via your browser settings without restricting basic inquiry capabilities.
              </p>

              <h4 className="font-serif text-base font-semibold text-stone-900 pt-2">
                5. Data Subject Rights & Deletion
              </h4>
              <p>
                Clients may request the complete deletion of their inquiry records, correspondence, and portfolio preferences at any time by contacting our compliance office at <em>privacy@veyraestates.com</em>.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-stone-900 font-normal">
                Terms of Private Brokerage & Platform Usage
              </h3>
              <p className="text-stone-500 text-xs">
                Applicable to all visitors, buyers, sellers, and family office representatives.
              </p>

              <h4 className="font-serif text-base font-semibold text-stone-900 pt-2">
                1. Informational & Editorial Representation
              </h4>
              <p>
                All specifications, architectural photographs, square footages, dimensions, and zoning descriptions presented on this website are provided for illustrative and curated editorial purposes. While vetted through municipal and architectural documentation, all figures are subject to formal verification during legal diligence and escrow proceedings.
              </p>

              <h4 className="font-serif text-base font-semibold text-stone-900 pt-2">
                2. Equal Housing Opportunity
              </h4>
              <p>
                Veyra Estates LLC strictly adheres to the Fair Housing Act and Title VIII of the Civil Rights Act. We conduct all brokerage activities, viewings, and representations without discrimination based on race, color, religion, sex, disability, familial status, or national origin.
              </p>

              <h4 className="font-serif text-base font-semibold text-stone-900 pt-2">
                3. Intellectual Property Rights
              </h4>
              <p>
                All architectural imagery, monographs, brand marks, and descriptive text published across Veyra Estates are the intellectual property of Veyra Estates LLC or utilized under express license from AD100 architectural studios and estate owners. Reproduction without written consent is strictly prohibited.
              </p>

              <h4 className="font-serif text-base font-semibold text-stone-900 pt-2">
                4. Jurisdiction & Governing Law
              </h4>
              <p>
                These terms are governed by the laws of the State of California and England and Wales. Any disputes arising from representation agreements shall be submitted to confidential arbitration in Beverly Hills, California or London, England.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

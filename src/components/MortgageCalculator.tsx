import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck } from 'lucide-react';

export const MortgageCalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(18500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPayment;

  // Monthly mortgage calculation: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPrincipalInterest =
    monthlyInterestRate === 0
      ? loanAmount / totalMonths
      : (loanAmount *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  // Property Tax ~ 1.15% annually
  const monthlyPropertyTax = (propertyPrice * 0.0115) / 12;
  // Homeowners Insurance ~ 0.35% annually
  const monthlyInsurance = (propertyPrice * 0.0035) / 12;

  const totalMonthlyPayment =
    monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section className="py-20 bg-[#F4EFE6] border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-amber-700" />
            <span>Private Financial Advisory</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Acquisition & Escrow Calculator
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Estimate private bank financing scenarios, debt service, and annual escrow reserves for trophy real estate investments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            {/* Property Price Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Property Acquisition Price
                </label>
                <span className="font-serif text-xl font-semibold text-stone-950 tabular-nums">
                  {formatCurrency(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={5000000}
                max={50000000}
                step={500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1 tabular-nums">
                <span>$5,000,000</span>
                <span>$25,000,000</span>
                <span>$50,000,000+</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="font-serif text-xl font-semibold text-stone-950 tabular-nums">
                  {formatCurrency(downPayment)}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[20, 25, 35, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      downPaymentPercent === pct
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate & Loan Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                  Interest Rate ({interestRate}%)
                </label>
                <input
                  type="range"
                  min={4.5}
                  max={9.0}
                  step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-stone-900 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                  Amortization Term
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[15, 30].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setLoanTermYears(term)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                        loanTermYears === term
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {term} Years Fixed
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                Estimated Monthly Outlay
              </span>
              <div className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-stone-950 tabular-nums">
                {formatCurrency(totalMonthlyPayment)}
                <span className="text-xs font-sans font-normal text-stone-500 ml-1.5">/ month</span>
              </div>

              {/* Line items */}
              <div className="mt-6 space-y-3 pt-6 border-t border-stone-100 text-xs text-stone-700">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Principal & Interest</span>
                  <span className="font-medium tabular-nums">{formatCurrency(monthlyPrincipalInterest)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Property Tax Reserve (est. 1.15%)</span>
                  <span className="font-medium tabular-nums">{formatCurrency(monthlyPropertyTax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Hazard & Marine Insurance (est.)</span>
                  <span className="font-medium tabular-nums">{formatCurrency(monthlyInsurance)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-stone-100 font-semibold text-stone-900">
                  <span>Financed Loan Amount</span>
                  <span className="tabular-nums">{formatCurrency(loanAmount)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-stone-500 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Indicative calculations only. Private banking client facilities often qualify for custom asset-backed interest-only rates.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

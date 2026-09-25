import React from 'react';
import { AGENTS } from '../data/mockData';
import { Agent } from '../types';
import { Phone, Mail, ArrowUpRight, Globe, Award } from 'lucide-react';

interface AgentsSectionProps {
  onSelectAgent: (agent: Agent) => void;
}

export const AgentsSection: React.FC<AgentsSectionProps> = ({ onSelectAgent }) => {
  return (
    <section id="agents" className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800">
            Global Leadership
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Private Advisory Partners
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Our Senior Partners are career fiduciaries with deep expertise in cross-border wealth management, zoning covenants, and private treaty negotiations.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Advisor Photo */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-xs font-light">
                    {agent.location}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5">
                  <span className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold block">
                    {agent.title}
                  </span>
                  <h3 className="mt-1 font-serif text-xl text-stone-900 font-medium">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                    {agent.role}
                  </p>

                  <p className="mt-3 text-xs text-stone-600 line-clamp-3 font-light leading-relaxed">
                    {agent.bio}
                  </p>

                  {/* Career Metric & Languages */}
                  <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-stone-700 font-medium">
                      <Award className="w-3.5 h-3.5 text-amber-700" />
                      <span className="tabular-nums font-semibold">{agent.careerSales}</span> Career
                    </div>
                    <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                      <Globe className="w-3 h-3 text-stone-400" />
                      <span>{agent.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectAgent(agent)}
                  className="w-full py-2.5 px-3 rounded-lg bg-stone-50 hover:bg-stone-900 text-stone-800 hover:text-white border border-stone-200 text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Request Private Advisory</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

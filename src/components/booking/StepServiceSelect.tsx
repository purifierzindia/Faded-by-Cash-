import { useState } from 'react';
import { Check, Plus, Clock, Sparkles } from 'lucide-react';
import { ServiceItem } from '../../types';
import { SERVICES_DATA } from '../../data/barberData';

interface StepServiceSelectProps {
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  onProceed: () => void;
}

export default function StepServiceSelect({
  selectedServices,
  onToggleService,
  onProceed,
}: StepServiceSelectProps) {
  const [filterCategory, setFilterCategory] = useState<'all' | 'haircuts' | 'beard' | 'kids-teens' | 'packages'>('all');

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalMinutes = selectedServices.reduce((sum, s) => {
    const m = s.duration.match(/(\d+)/);
    return sum + (m ? parseInt(m[1], 10) : 45);
  }, 0);

  const isSelected = (id: string) => selectedServices.some((s) => s.id === id);

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'haircuts', label: 'Cuts & Fades' },
          { id: 'beard', label: 'Beard Sculpt' },
          { id: 'kids-teens', label: 'Kids & Teens' },
          { id: 'packages', label: 'Grooming Packages' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterCategory(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              filterCategory === tab.id
                ? 'bg-[#c5a059] text-black shadow-md'
                : 'bg-[#141414] text-white/60 hover:text-white border border-white/5 hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
        {filteredServices.map((service) => {
          const active = isSelected(service.id);
          return (
            <div
              key={service.id}
              onClick={() => onToggleService(service)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                active
                  ? 'bg-[#1a1a1c] border-[#c5a059] shadow-lg shadow-black/40 ring-1 ring-[#c5a059]'
                  : 'bg-[#141414] border-white/5 hover:border-white/20 hover:bg-[#18181b]'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-2.5 right-3 bg-[#c5a059] text-black text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded shadow">
                  Most Requested
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="serif font-bold text-base text-white group-hover:text-[#c5a059] transition-colors">
                    {service.name}
                  </h4>
                  <span className="serif text-lg font-bold text-[#c5a059] whitespace-nowrap">
                    ${service.price}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-white/50 mt-1 mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{service.duration}</span>
                </div>

                <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-white/40">
                  {active ? 'Service Added' : 'Click to select'}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleService(service);
                  }}
                  className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                    active
                      ? 'bg-[#c5a059] text-black'
                      : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                  }`}
                >
                  {active ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Running Total & Proceed Button */}
      <div className="p-4 bg-[#0d0d0f] border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
            Running Total
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="serif text-2xl font-bold text-white">
              ${totalPrice}
            </span>
            <span className="text-xs text-white/50">
              ({selectedServices.length} {selectedServices.length === 1 ? 'service' : 'services'} • ~{totalMinutes} min)
            </span>
          </div>
          {selectedServices.length > 0 && (
            <p className="text-[11px] text-white/60 truncate max-w-xs sm:max-w-md mt-0.5">
              {selectedServices.map((s) => s.name).join(' + ')}
            </p>
          )}
        </div>

        <button
          type="button"
          disabled={selectedServices.length === 0}
          onClick={onProceed}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
            selectedServices.length > 0
              ? 'bg-[#c5a059] hover:bg-white text-black shadow-lg shadow-black/60'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          <span>Choose Date & Time</span>
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

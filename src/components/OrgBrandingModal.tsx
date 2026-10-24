import React, { useState } from 'react';
import { OrganizationConfig } from '../types';
import {
  X,
  Building2,
  Instagram,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Award,
  CheckCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface OrgBrandingModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: OrganizationConfig;
  onSave: (updated: OrganizationConfig) => void;
}

export const PRESET_ORGANIZATIONS: OrganizationConfig[] = [
  {
    id: 'org-thrust-chhatarpur',
    name: 'Thrust Martial Arts Academy',
    shortCode: 'TMA',
    tagline: 'Premier Taekwondo & Martial Arts Training Center',
    instagram: '@thrust_martial_arts_academy',
    instagramUrl: 'https://www.instagram.com/thrust_martial_arts_academy',
    address: 'Basement, GD Goenka La Petite, D-23, School Lane, Chhatarpur Enclave, New Delhi 110074',
    phone: '+91 98711 05892',
    email: 'contact@thrustmartialarts.com',
    upiVpa: 'thrustmartialarts@axisbank',
    affiliation: 'Kukkiwon World Taekwondo Headquarters · Delhi Taekwondo Association',
    regNo: 'DL/SD/TKD/2020/88',
    headmaster: 'Master Nikhil Tyagi',
    headmasterRank: '5th Dan Black Belt',
  },
  {
    id: 'org-thrust-saket',
    name: 'Thrust Martial Arts - Saket Satellite',
    shortCode: 'TMA',
    tagline: 'High-Performance Sparring & Junior Cadet Training',
    instagram: '@thrust_martial_arts_academy',
    instagramUrl: 'https://www.instagram.com/thrust_martial_arts_academy',
    address: 'Community Center Complex, Sector 3, Saket, New Delhi 110017',
    phone: '+91 98711 05892',
    email: 'saket@thrustmartialarts.com',
    upiVpa: 'thrustmartialarts@axisbank',
    affiliation: 'Delhi Taekwondo Association · WT Certified',
    regNo: 'DL/SD/TKD/2022/104',
    headmaster: 'Master Nikhil Tyagi',
    headmasterRank: '5th Dan Black Belt',
  },
];

export const OrgBrandingModal: React.FC<OrgBrandingModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<OrganizationConfig>(config);
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      onClose();
    }, 1200);
  };

  const handleSelectPreset = (preset: OrganizationConfig) => {
    setFormData(preset);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Building2 className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Organization & Academy Branding</h3>
              <p className="text-xs text-slate-400">Configure tenant brand, dojang locations, and social links</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Quick Preset Selector */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              Switch or Load Academy Preset:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_ORGANIZATIONS.map((preset) => {
                const isSelected = formData.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-rose-950/40 border-rose-500 text-white shadow-xs'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white truncate block">
                        {preset.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                        {preset.shortCode}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 truncate">{preset.address}</p>
                    <p className="text-[10px] text-pink-400 font-mono mt-0.5">{preset.instagram}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <form id="org-branding-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Academy Name & Short Code */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">
                  Organization / Academy Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Thrust Martial Arts Academy"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Logo Badge Initials
                </label>
                <input
                  type="text"
                  value={formData.shortCode}
                  onChange={(e) => setFormData({ ...formData, shortCode: e.target.value.toUpperCase() })}
                  maxLength={4}
                  placeholder="TMA"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs font-bold uppercase tracking-wider text-center focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Academy Slogan / Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Premier Taekwondo & Martial Arts Training Center"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Instagram Profile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="@thrust_martial_arts_academy"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  Instagram Web URL
                </label>
                <input
                  type="url"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  placeholder="https://www.instagram.com/thrust_martial_arts_academy"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                Dojang HQ Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Basement, GD Goenka La Petite, D-23, School Lane, Chhatarpur Enclave, New Delhi"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            {/* Phone & UPI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  Official Contact Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98711 05892"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  UPI Virtual Payment Address (VPA)
                </label>
                <input
                  type="text"
                  value={formData.upiVpa}
                  onChange={(e) => setFormData({ ...formData, upiVpa: e.target.value })}
                  placeholder="thrustmartialarts@axisbank"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Headmaster & Affiliation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Chief Instructor / Headmaster
                </label>
                <input
                  type="text"
                  value={formData.headmaster}
                  onChange={(e) => setFormData({ ...formData, headmaster: e.target.value })}
                  placeholder="Master Nikhil Tyagi"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Master Rank Title
                </label>
                <input
                  type="text"
                  value={formData.headmasterRank}
                  onChange={(e) => setFormData({ ...formData, headmasterRank: e.target.value })}
                  placeholder="5th Dan Black Belt"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </form>

          {saveToast && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Branding updated across Dojang OS! Receipts, certificates and header refreshed.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Active Tenant: <strong className="text-white">{formData.name}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="org-branding-form"
              className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-xs"
            >
              Apply Organization Branding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

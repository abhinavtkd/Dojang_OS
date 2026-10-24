import React from 'react';
import { ActiveRole, OrganizationConfig } from '../types';
import { Shield, Sparkles, User, LogIn, ExternalLink, Building2, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeRole: ActiveRole;
  userLabel: string;
  orgConfig: OrganizationConfig;
  onOpenOrgBranding: () => void;
  onOpenAuth: () => void;
  onOpenDesignSystem: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  activeRole,
  userLabel,
  orgConfig,
  onOpenOrgBranding,
  onOpenAuth,
  onOpenDesignSystem,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 h-16">
        {/* Zone 1: Application Name (Dojang OS) & Organization Branding Provision */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Primary Application Name */}
          <button
            onClick={() => onTabChange('dashboard')}
            className="text-base sm:text-lg font-black tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <span className="w-7 h-7 rounded bg-gradient-to-br from-rose-600 via-rose-700 to-amber-600 text-white flex items-center justify-center font-black text-xs shadow-xs tracking-tight group-hover:scale-105 transition-transform">
              DOS
            </span>
            <span className="font-bold tracking-tight text-white">Dojang OS</span>
          </button>

          <span className="text-slate-800 hidden sm:inline">|</span>

          {/* Provision to View & Add/Edit Organization Branding */}
          <button
            type="button"
            onClick={onOpenOrgBranding}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all shadow-xs"
            title="Click to customize Organization Branding, Branches, and Socials"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-semibold truncate max-w-[130px] sm:max-w-[200px]">
              {orgConfig.name}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {/* Instagram Link for Active Organization */}
          {orgConfig.instagramUrl && (
            <a
              href={orgConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/30 text-[10px] font-mono transition-colors"
              title={`Visit ${orgConfig.instagram} on Instagram`}
            >
              <span>{orgConfig.instagram}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-75" />
            </a>
          )}
        </div>

        {/* Zone 2: 4–5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'dashboard' ? 'text-rose-400 border-b-2 border-rose-500 py-4' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onTabChange('attendance')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'attendance' ? 'text-blue-400 border-b-2 border-blue-500 py-4' : ''
            }`}
          >
            Attendance
          </button>
          <button
            onClick={() => onTabChange('students')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'students' ? 'text-rose-400 border-b-2 border-rose-500 py-4' : ''
            }`}
          >
            Students
          </button>
          <button
            onClick={() => onTabChange('fees')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'fees' ? 'text-emerald-400 border-b-2 border-emerald-500 py-4' : ''
            }`}
          >
            Fees & UPI
          </button>
          <button
            onClick={() => onTabChange('belt-exam')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'belt-exam' ? 'text-amber-400 border-b-2 border-amber-500 py-4' : ''
            }`}
          >
            Belt Grading
          </button>
          <button
            onClick={() => onTabChange('tournaments')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'tournaments' ? 'text-rose-400 border-b-2 border-rose-500 py-4' : ''
            }`}
          >
            Tournaments
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenOrgBranding}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Configure Organization Branding & Branches"
          >
            <Building2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Org Branding</span>
          </button>

          <button
            onClick={onOpenDesignSystem}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Inspect Colors, Belt Tokens & Ergonomics"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Design System</span>
          </button>

          <button
            onClick={onOpenAuth}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{userLabel.split(' ')[0]}</span>
            <span className="sm:hidden">Role</span>
          </button>
        </div>
      </div>
    </header>
  );
};

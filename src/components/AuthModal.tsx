import React, { useState } from 'react';
import { ActiveRole } from '../types';
import { X, Smartphone, KeyRound, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: ActiveRole, userLabel: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('9810122450');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [selectedRole, setSelectedRole] = useState<ActiveRole>('admin');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 450);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Realistic validation: test code "1234" is valid, any other 4 digits also accepted except "0000" simulates error
    if (otp === '0000') {
      setErrorMsg('Invalid OTP. Please enter 1234 (Demo OTP)');
      return;
    }
    if (otp.length < 4) {
      setErrorMsg('Please enter 4-digit verification code');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const label =
        selectedRole === 'admin'
          ? 'Master Nikhil Tyagi (Founder)'
          : selectedRole === 'coach'
          ? 'Coach Vikram Singh'
          : selectedRole === 'parent'
          ? 'Sunita Sharma (Parent of Aarav & Ananya)'
          : 'Kabir Mehra (Student)';
      onLoginSuccess(selectedRole, label);
      onClose();
    }, 400);
  };

  const selectDemoPersona = (role: ActiveRole, phone: string) => {
    setSelectedRole(role);
    setPhoneNumber(phone);
    setStep('phone');
    setOtp('');
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-600 to-amber-600 text-white flex items-center justify-center font-black text-xs tracking-tighter">
              TMA
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Thrust Dojang Member Login</h3>
              <p className="text-xs text-slate-400">@thrust_martial_arts_academy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Persona Quick Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Select Demo Persona to Test:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => selectDemoPersona('admin', '9810122450')}
                className={`p-2 rounded-lg text-left border transition-all ${
                  selectedRole === 'admin'
                    ? 'border-rose-500 bg-rose-500/10 text-white font-medium'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block font-semibold">Master (Admin)</span>
                <span className="text-[11px] opacity-75">Full Revenue & Operations</span>
              </button>

              <button
                type="button"
                onClick={() => selectDemoPersona('coach', '9871234567')}
                className={`p-2 rounded-lg text-left border transition-all ${
                  selectedRole === 'coach'
                    ? 'border-blue-500 bg-blue-500/10 text-white font-medium'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block font-semibold">Coach Vikram</span>
                <span className="text-[11px] opacity-75">30s Mobile Attendance</span>
              </button>

              <button
                type="button"
                onClick={() => selectDemoPersona('parent', '9811244321')}
                className={`p-2 rounded-lg text-left border transition-all ${
                  selectedRole === 'parent'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white font-medium'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block font-semibold">Parent Sunita</span>
                <span className="text-[11px] opacity-75">Manage 2 Children</span>
              </button>

              <button
                type="button"
                onClick={() => selectDemoPersona('student', '9810011998')}
                className={`p-2 rounded-lg text-left border transition-all ${
                  selectedRole === 'student'
                    ? 'border-amber-500 bg-amber-500/10 text-white font-medium'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block font-semibold">Student Kabir</span>
                <span className="text-[11px] opacity-75">Poomsae & Sparring Goals</span>
              </button>
            </div>
          </div>

          {/* Form */}
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Mobile Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="98101 22450"
                    className="w-full pl-12 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
                    maxLength={10}
                    autoFocus
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-2 text-xs text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Sending SMS Code...' : 'Get 4-Digit OTP'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Enter Verification Code
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-[11px] text-rose-400 hover:underline"
                  >
                    Change Number
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Enter 1234"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white tracking-widest placeholder-slate-600 focus:outline-none focus:border-rose-500"
                    maxLength={4}
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Demo hint: enter <span className="font-mono text-rose-400 font-bold">1234</span> to sign in (or enter 0000 to test error state).
                </p>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-2 text-xs text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Verifying OTP...' : 'Verify & Enter Dojang OS'}
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

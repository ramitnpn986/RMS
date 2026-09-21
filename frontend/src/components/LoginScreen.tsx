import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Building2,
  Utensils,
  Languages,
  Loader2
} from 'lucide-react';

interface LoginScreenProps {
  lang: 'en' | 'ne';
  setLang: (l: 'en' | 'ne') => void;
  onLoginSuccess: (token: string, userDetails?: any) => void;
}

export default function LoginScreen({ lang, setLang, onLoginSuccess }: LoginScreenProps) {
  const [pharmacyName, setPharmacyName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const t = {
    en: {
      portalTitle: "Authentication Portal",
      subtitle: "Restaurant Management System",
      restaurantLabel: "Restaurant Name",
      restaurantPlaceholder: "Enter registered Restaurant name",
      idLabel: "User ID / Staff ID",
      idPlaceholder: "Enter your user ID",
      passLabel: "Access Password",
      passPlaceholder: "Enter password",
      loginBtn: "Authenticate & Enter",
      authenticating: "Verifying credentials...",
      errorHeader: "Access Denied",
      unauthorizedTip: "Only authorized personnel are permitted to access this panel.",
      envNote: "Staff credentials are secure and verified in real-time.",
      officialTag: "Official IRD verified RMS system",
      switchLang: "नेपाली"
    },
    ne: {
      portalTitle: "प्रमाणीकरण पोर्टल",
      subtitle: "रेस्टुरेन्ट व्यवस्थापन प्रणाली",
      restaurantLabel: "रेस्टुरेन्टको नाम",
      restaurantPlaceholder: "दर्ता गरिएको रेस्टुरेन्टको नाम हाल्नुहोस्",
      idLabel: "प्रयोगकर्ता ID",
      idPlaceholder: "आफ्नो ID हाल्नुहोस्",
      passLabel: "पहुँच पासवर्ड",
      passPlaceholder: "पासवर्ड हाल्नुहोस्",
      loginBtn: "प्रमाणित गर्नुहोस् र प्रवेश गर्नुहोस्",
      authenticating: "प्रमाणीकरण हुँदैछ...",
      errorHeader: "पहुँच अस्वीकृत",
      unauthorizedTip: "केवल अधिकृत कर्मचारीहरूलाई मात्र यो प्रणाली पहुँच गर्न अनुमति छ।",
      envNote: "कर्मचारी परिचयपत्र सुरक्षित छन् र वास्तविक-समय डेटाबेसमा जाँच गरिन्छ।",
      officialTag: "आन्तरिक राजस्व विभाग (IRD) प्रमाणित प्रणाली",
      switchLang: "English"
    }
  }[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('https://rms-0wk0.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          pharmacyName: pharmacyName.trim(), 
          id: staffId.trim(),                
          password                        
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userDetails = data.user;
        localStorage.setItem('pharmacyUser', JSON.stringify(userDetails));
        onLoginSuccess(data.token, userDetails);
      } else {
        setErrorMsg(data.message || t.errorHeader);
      }
    } catch (err) {
      setErrorMsg(
        lang === 'en' 
          ? 'Unable to connect to authentication server.' 
          : 'प्रमाणीकरण सर्भरमा जडान गर्न असमर्थ।'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans text-slate-800 selection:bg-purple-100 selection:text-purple-900">
      
      {/* Dynamic Background Blur Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-300/30 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-300/30 blur-[100px] pointer-events-none" />

      {/* Main Form Container */}
      <div className="w-full max-w-md space-y-6 z-10 my-auto" id="login-container">
        
        {/* Core Auth Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-2xl shadow-slate-200/50 p-6 sm:p-8 space-y-6 relative" id="login-card">
          
          {/* Card Top Language Switcher */}
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ne' : 'en')}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-1.5 px-2.5 py-1 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 rounded-full text-xs font-medium text-slate-600 transition-all active:scale-95 cursor-pointer z-20"
          >
            <Languages className="w-3.5 h-3.5 text-purple-600" />
            <span>{t.switchLang}</span>
          </button>

          {/* Header & Logo Section */}
          <div className="flex flex-col items-center text-center space-y-3 pt-2" id="login-header">
            <div className="relative flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Restaurant Logo"
                className="h-28 sm:h-32 w-auto object-contain rounded-2xl shadow-sm transition-transform hover:scale-105 duration-300"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden p-4 bg-purple-50 rounded-2xl border border-purple-100">
                <Utensils className="h-12 w-12 text-purple-600" />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {t.portalTitle}
              </h1>
              <p className="text-xs font-medium text-slate-500 max-w-xs mx-auto">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Alert Message Box */}
          {errorMsg && (
            <div className="p-3.5 bg-red-50/80 border border-red-200/60 rounded-2xl text-xs text-red-700 flex gap-3 items-start animate-in fade-in slide-in-from-top-1 duration-200" id="login-error-alert">
              <ShieldAlert className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold block text-red-800">{t.errorHeader}</span>
                <p className="opacity-90 leading-relaxed">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
            
            {/* Restaurant Name Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                {t.restaurantLabel}
              </label>
              <div className="relative group">
                <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type="text"
                  required
                  value={pharmacyName}
                  onChange={(e) => setPharmacyName(e.target.value)}
                  placeholder={t.restaurantPlaceholder}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all text-slate-800 font-medium disabled:opacity-60"
                />
              </div>
            </div>

            {/* Staff ID Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                {t.idLabel}
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type="text"
                  required
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  placeholder={t.idPlaceholder}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all text-slate-800 font-medium disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                {t.passLabel}
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passPlaceholder}
                  disabled={isLoading}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all text-slate-800 font-medium disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-lg focus:outline-none cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-purple-600/20 hover:shadow-lg hover:shadow-purple-600/30 active:scale-[0.99] cursor-pointer mt-3 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.authenticating}</span>
                </>
              ) : (
                <span>{t.loginBtn}</span>
              )}
            </button>
          </form>
        </div>

        {/* Security Watermark Footer */}
        <div className="text-center space-y-1.5 px-2">
          <p className="text-xs font-bold text-purple-600 tracking-wide">
            {t.officialTag}
          </p>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-tight">
            {t.unauthorizedTip}
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 pt-0.5">
            {t.envNote}
          </p>
        </div>

      </div>
    </div>
  );
}
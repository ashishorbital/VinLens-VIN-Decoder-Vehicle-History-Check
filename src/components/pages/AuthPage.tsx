import React, { useState } from 'react';
import { VinLensLogo } from '../ui/VinLensLogo';
import { Button } from '../ui/Button';
import { 
  ArrowLeft, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  User, 
  Car, 
  FileText, 
  LogOut 
} from 'lucide-react';

export interface AuthPageProps {
  initialMode?: 'signin' | 'signup';
  currentUser: { name: string; email: string; role: string } | null;
  onLogin: (user: { name: string; email: string; role: string }) => void;
  onLogout: () => void;
  onBackToHome: () => void;
  onSearchVin: (vin: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'signin',
  currentUser,
  onLogin,
  onLogout,
  onBackToHome,
  onSearchVin
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accountType, setAccountType] = useState<'buyer' | 'dealer'>('buyer');
  const [rememberMe, setRememberMe] = useState(true);

  // Quick Demo credentials
  const handleQuickDemoLogin = (type: 'buyer' | 'dealer') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (type === 'buyer') {
        onLogin({
          name: 'Alex Vance',
          email: 'alex.vance@example.com',
          role: 'Verified Car Buyer'
        });
      } else {
        onLogin({
          name: 'Apex Motors Dealership',
          email: 'inventory@apexmotors.com',
          role: 'Commercial Dealer Partner'
        });
      }
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({
        name: fullName.trim() || (email.split('@')[0] || 'VinLens User'),
        email: email || 'user@example.com',
        role: accountType === 'dealer' ? 'Commercial Dealer Partner' : 'Verified Car Buyer'
      });
    }, 600);
  };

  // If already logged in, show User Dashboard / Account Portal
  if (currentUser) {
    return (
      <div className="min-h-screen bg-theme-secondary/40 flex flex-col transition-colors duration-200">
        {/* Navigation Bar */}
        <header className="border-b border-theme-subtle bg-theme-card/90 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
            <VinLensLogo />
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" onClick={onBackToHome} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout} className="gap-1.5 text-rose-600 hover:text-rose-700">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">
          {/* Welcome Profile Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme-subtle shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center font-bold text-2xl border border-accent-primary/20 shadow-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-heading font-bold text-theme-primary">
                    {currentUser.name}
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/20">
                    Active
                  </span>
                </div>
                <p className="text-sm text-theme-muted mt-0.5">{currentUser.email}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-accent-primary">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{currentUser.role}</span>
                </div>
              </div>
            </div>

            <Button variant="primary" size="md" onClick={onBackToHome} className="gap-2 font-heading font-bold">
              <Car className="w-4 h-4" />
              <span>Run New VIN Check</span>
            </Button>
          </div>

          {/* Saved Reports / History Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-theme-primary flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent-primary" />
                <span>Saved Vehicle History Reports</span>
              </h2>
              <span className="text-xs text-theme-muted">2 Reports on file</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sample Report 1 */}
              <div className="p-5 rounded-2xl bg-theme-card border border-theme-subtle shadow-xs space-y-3 hover:border-theme-hover transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600">
                    Clean Title
                  </span>
                  <span className="text-xs text-theme-muted font-mono font-medium">Yesterday</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-base text-theme-primary">2021 Audi A4 2.0T Quattro</h3>
                  <p className="text-xs font-mono font-medium text-theme-muted mt-0.5">VIN: WAUDFAFH7MA019823</p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-theme-subtle text-xs">
                  <span className="text-theme-muted">Score: <strong className="text-theme-primary">94/100</strong></span>
                  <button
                    onClick={() => {
                      onBackToHome();
                      onSearchVin('WAUDFAFH7MA019823');
                    }}
                    className="text-accent-primary font-bold hover:underline cursor-pointer"
                  >
                    View Report &rarr;
                  </button>
                </div>
              </div>

              {/* Sample Report 2 */}
              <div className="p-5 rounded-2xl bg-theme-card border border-theme-subtle shadow-xs space-y-3 hover:border-theme-hover transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600">
                    Clean Title
                  </span>
                  <span className="text-xs text-theme-muted font-mono font-medium">3 days ago</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-base text-theme-primary">2020 Toyota RAV4 XLE AWD</h3>
                  <p className="text-xs font-mono font-medium text-theme-muted mt-0.5">VIN: 2T3C1RFV4LC029144</p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-theme-subtle text-xs">
                  <span className="text-theme-muted">Score: <strong className="text-theme-primary">96/100</strong></span>
                  <button
                    onClick={() => {
                      onBackToHome();
                      onSearchVin('2T3C1RFV4LC029144');
                    }}
                    className="text-accent-primary font-bold hover:underline cursor-pointer"
                  >
                    View Report &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Authentication Form (Login & Sign Up)
  return (
    <div className="min-h-screen bg-theme-secondary/40 flex flex-col justify-between transition-colors duration-200">
      {/* Top Bar with Logo & Back button */}
      <header className="p-4 sm:p-6 max-w-6xl w-full mx-auto flex items-center justify-between">
        <VinLensLogo />
        <Button variant="secondary" size="sm" onClick={onBackToHome} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Button>
      </header>

      {/* Main Auth Card Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-theme-card rounded-3xl border border-theme-subtle shadow-xl p-6 sm:p-8 space-y-6">
          {/* Header & Tabs */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-theme-primary">
              {mode === 'signin' ? 'Welcome to VinLens' : 'Create Free Account'}
            </h1>
            <p className="text-xs sm:text-sm text-theme-muted">
              {mode === 'signin' 
                ? 'Sign in to access your saved vehicle history reports & instant alerts.'
                : 'Join over 500,000+ car buyers & dealers checking vehicle pedigrees.'}
            </p>

            {/* Toggle Tabs */}
            <div className="flex p-1 rounded-xl bg-theme-secondary border border-theme-subtle">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-theme-card text-theme-primary shadow-xs'
                    : 'text-theme-muted hover:text-theme-primary'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-theme-card text-theme-primary shadow-xs'
                    : 'text-theme-muted hover:text-theme-primary'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-theme-primary">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-theme-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-theme-subtle bg-theme-main text-theme-primary text-sm focus:outline-none focus:border-accent-primary"
                    />
                  </div>
                </div>

                {/* Account Type Selector */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-theme-primary">Account Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAccountType('buyer')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        accountType === 'buyer'
                          ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                          : 'border-theme-subtle bg-theme-main text-theme-muted hover:border-theme-hover'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Car Buyer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountType('dealer')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        accountType === 'dealer'
                          ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                          : 'border-theme-subtle bg-theme-main text-theme-muted hover:border-theme-hover'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Dealership</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-theme-primary">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-theme-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-theme-subtle bg-theme-main text-theme-primary text-sm focus:outline-none focus:border-accent-primary"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-theme-primary">Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to demo email.')}
                    className="text-xs text-accent-primary hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-theme-subtle absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-theme-subtle bg-theme-main text-theme-primary text-sm focus:outline-none focus:border-accent-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-subtle hover:text-theme-primary p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1 text-left">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-accent-primary focus:ring-accent-primary border-theme-subtle cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-theme-muted cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={loading}
              className="mt-2 font-heading font-bold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </span>
              ) : (
                <span>{mode === 'signin' ? 'Sign In to Account' : 'Create Free Account'}</span>
              )}
            </Button>
          </form>

          {/* Demo Profiles Helper */}
          <div className="pt-2 border-t border-theme-subtle space-y-2">
            <div className="text-[11px] uppercase tracking-wider font-bold text-theme-subtle text-center">
              ⚡ One-Click Demo Profiles
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('buyer')}
                className="p-2 rounded-xl bg-theme-secondary hover:bg-theme-hover border border-theme-subtle text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-bold text-theme-primary flex items-center gap-1">
                  <User className="w-3 h-3 text-accent-primary" />
                  <span>Buyer Demo</span>
                </div>
                <div className="text-[10px] text-theme-muted truncate">alex.vance@example.com</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('dealer')}
                className="p-2 rounded-xl bg-theme-secondary hover:bg-theme-hover border border-theme-subtle text-left transition-colors cursor-pointer group"
              >
                <div className="text-xs font-bold text-theme-primary flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-cyan-600" />
                  <span>Dealer Demo</span>
                </div>
                <div className="text-[10px] text-theme-muted truncate">Apex Motors Partner</div>
              </button>
            </div>
          </div>

          {/* Trust and Security Footnote */}
          <div className="flex items-center justify-center gap-4 text-xs text-theme-subtle pt-2">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>256-Bit SSL</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-primary" />
              <span>NMVTIS Data Partner</span>
            </span>
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="p-4 text-center text-xs text-theme-subtle">
        &copy; {new Date().getFullYear()} VinLens Inc. All rights reserved. Demo Authentication Mode.
      </footer>
    </div>
  );
};

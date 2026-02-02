import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try { await login(email, password); navigate(from, { replace: true }); }
    catch (err) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-20" /><div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/95 to-dark-950" /></div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"><span className="text-dark-900 font-bold text-xl">S</span></div></Link>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Sign in to continue discovering secret shows</p>
        </div>
        <div className="card p-8">
          {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"><AlertCircle size={20} /><span className="text-sm">{error}</span></div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div><label className="text-white/70 text-sm mb-2 block">Email</label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-field pl-12" required /></div></div>
            <div><label className="text-white/70 text-sm mb-2 block">Password</label><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="input-field pl-12 pr-12" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
            <div className="flex items-center justify-between"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500/50" /><span className="text-white/60 text-sm">Remember me</span></label><Link to="/forgot-password" className="text-primary-400 text-sm hover:text-primary-300">Forgot password?</Link></div>
            <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-50">{isLoading ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Signing in...</span> : 'Sign In'}</button>
          </form>
          <div className="mt-6 pt-6 border-t border-white/10 text-center"><p className="text-white/50">Don't have an account? <Link to="/signup" className="text-primary-400 hover:text-primary-300">Sign up</Link></p></div>
        </div>
        <p className="text-center text-white/40 text-xs mt-6">By signing in, you agree to our <Link to="/terms" className="text-white/60 hover:text-white">Terms of Service</Link> and <Link to="/privacy" className="text-white/60 hover:text-white">Privacy Policy</Link></p>
      </motion.div>
    </div>
  );
};

export default LoginPage;

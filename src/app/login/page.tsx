"use client";

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const brandColor = process.env.NEXT_PUBLIC_THEME_COLOR || "#38bdf8";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md bg-[#09090b] border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
        {/* Subtle background glow matching your theme */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-[60px] opacity-20 pointer-events-none"
          style={{ backgroundColor: brandColor }}
        />

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Lock size={24} style={{ color: brandColor }} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2 uppercase tracking-tight">Merchant Access</h2>
          <p className="text-neutral-500 text-xs text-center font-bold uppercase tracking-widest mb-8">
            Secure Admin Portal
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-4 text-neutral-500" />
                <input
                  type="email"
                  placeholder="Admin Email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/30 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-4 text-neutral-500" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/30 transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold text-center mt-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: brandColor }}
              className="w-full py-4 mt-4 rounded-xl text-black font-bold text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Enter Portal'} <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

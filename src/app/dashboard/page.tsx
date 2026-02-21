"use client";

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { LogOut, Users, Calendar, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const brandColor = process.env.NEXT_PUBLIC_THEME_COLOR || "#38bdf8";

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Verify user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      // 2. Determine the business slug
      const path = window.location.pathname;
      const currentSlug = path.split("/").filter(Boolean)[0] || "default-business";

      // 3. Fetch leads for this specific business
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('business_slug', currentSlug)
        .order('created_at', { ascending: false });

      if (data) setLeads(data);
      setIsLoading(false);
    };

    fetchDashboardData();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (isLoading) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 bg-[#09090b] p-6 flex flex-col hidden md:flex">
        <h1 className="text-xl font-extrabold uppercase tracking-tight mb-10 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brandColor }} />
          Nexus Admin
        </h1>
        
        <nav className="flex-1 space-y-4">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold">
            <Calendar size={18} style={{ color: brandColor }} /> Bookings
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-neutral-500 hover:text-white transition-all text-sm font-bold">
            <Users size={18} /> Clients
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-neutral-500 hover:text-red-400 transition-all text-sm font-bold uppercase tracking-widest mt-auto"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-10">
          <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Overview</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight">Recent Bookings</h2>
        </header>

        <div className="bg-[#09090b] border border-white/10 rounded-[2rem] overflow-hidden">
          {leads.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">
              <p className="text-xs font-bold uppercase tracking-widest">No bookings yet.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Service</th>
                  <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Date & Time</th>
                  <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="p-5 font-bold">{lead.service}</td>
                    <td className="p-5 text-sm text-neutral-400">
                      {lead.date} • {lead.time}
                    </td>
                    <td className="p-5">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-max">
                        <CheckCircle size={12} style={{ color: brandColor }} /> 
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Users, Heart, Shield, Building2, TrendingUp, Search, Filter, AlertTriangle } from "lucide-react";
import { adminStats, matchTrend, candidates } from "@/lib/mock-data";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Zyra AI" }, { name: "description", content: "Platform analytics & insights" }] }),
  component: AdminPage,
});

const occupancyPie = [
  { name: "Occupied", value: 78, color: "oklch(0.62 0.16 320)" },
  { name: "Reserved", value: 12, color: "oklch(0.78 0.11 195)" },
  { name: "Available", value: 10, color: "oklch(0.88 0.07 10)" },
];

function AdminPage() {
  const [q, setQ] = useState("");
  const filtered = candidates.filter((m: any) => m.name.toLowerCase().includes(q.toLowerCase()) || m.location.toLowerCase().includes(q.toLowerCase()));

  const kpis = [
    { l: "Total users", v: adminStats.users.toLocaleString(), i: Users, t: "+12.4%" },
    { l: "Active now", v: adminStats.activeNow.toLocaleString(), i: TrendingUp, t: "Live" },
    { l: "Match success", v: `${adminStats.successRate}%`, i: Heart, t: "+3.1%" },
    { l: "Safety alerts (7d)", v: adminStats.safetyAlerts, i: Shield, t: "All resolved" },
    { l: "Successful matches", v: adminStats.successfulMatches.toLocaleString(), i: Heart, t: "+18%" },
    { l: "Room occupancy", v: `${adminStats.occupancy}%`, i: Building2, t: "+2%" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Operations</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-2">Admin <span className="text-gradient">dashboard.</span></h1>
          <p className="mt-2 text-muted-foreground">User analytics, safety pulse, matching insights and occupancy.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-border">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users, cities…" className="bg-transparent outline-none text-sm w-56" />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-border text-sm font-semibold"><Filter className="size-4" /> Filter</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((k, i) => (
          <motion.div key={k.l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div className="size-9 rounded-xl bg-gradient-primary grid place-items-center"><k.i className="size-4 text-primary-foreground" /></div>
              <span className="text-[10px] font-semibold text-primary">{k.t}</span>
            </div>
            <div className="mt-3 font-display text-2xl font-semibold">{k.v}</div>
            <div className="text-xs text-muted-foreground">{k.l}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-xl font-semibold">Matching trend</div>
              <div className="text-xs text-muted-foreground">Successful matches per month vs. safety incidents</div>
            </div>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={matchTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.16 320)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.62 0.16 320)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.11 195)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.78 0.11 195)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 320)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "oklch(0.4 0.04 300)" }} />
                <YAxis tick={{ fontSize: 12, fill: "oklch(0.4 0.04 300)" }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.9 0.02 320)" }} />
                <Area type="monotone" dataKey="matches" stroke="oklch(0.62 0.16 320)" fill="url(#g1)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="safety" stroke="oklch(0.78 0.11 195)" fill="url(#g2)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="font-display text-xl font-semibold">Room occupancy</div>
          <div className="text-xs text-muted-foreground">Across 142 active properties</div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={occupancyPie} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={4}>
                  {occupancyPie.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table + AI insights */}
      <div className="mt-6 grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <div className="glass-card p-0 overflow-hidden">
          <div className="p-5 flex items-center justify-between border-b border-border/60">
            <div className="font-display text-xl font-semibold">Recent users</div>
            <span className="text-xs text-muted-foreground">{filtered.length} shown</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-muted/50">
                <tr>
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">Match</th>
                  <th className="text-left p-4">Safety</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m: any) => (
                  <tr key={m.id} className="border-t border-border/60 hover:bg-white/40">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`size-9 rounded-xl bg-gradient-to-br ${m.gradient} grid place-items-center text-white font-bold text-xs`}>{m.avatar}</div>
                        <div>
                          <div className="font-semibold">{m.name}</div>
                          <div className="text-xs text-muted-foreground">{m.age} yrs</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{m.role}</td>
                    <td className="p-4 text-muted-foreground">{m.location}</td>
                    <td className="p-4 font-semibold text-gradient">{m.score}%</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-gradient-primary" style={{ width: `${m.safety}%` }} /></div>
                        <span className="text-xs">{m.safety}</span>
                      </div>
                    </td>
                    <td className="p-4"><span className="text-[10px] inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/30 text-accent-foreground">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-card p-6">
            <div className="font-display text-xl font-semibold">AI matching insights</div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Emotional compatibility is the #1 predictor of 6-month retention (r=0.81).",
                "Voice-onboarded users complete profiles 4.2× faster than form users.",
                "Curfew alignment correlates strongest with student segment.",
              ].map((t) => (
                <li key={t} className="flex gap-3 p-3 rounded-2xl bg-white/70 border border-border"><span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-6 bg-gradient-warm/40">
            <div className="flex items-center gap-2 font-display text-xl font-semibold"><AlertTriangle className="size-5 text-primary" /> Safety alerts</div>
            <div className="mt-3 space-y-2 text-sm">
              {[
                { t: "Voice SOS triggered", w: "Resolved · 2h", who: "User #4821" },
                { t: "Repeated late check-in missed", w: "Followed up · 6h", who: "User #1290" },
                { t: "Tone-shift flagged", w: "Under review", who: "User #3702" },
              ].map((a) => (
                <div key={a.t} className="p-3 rounded-2xl bg-white/70 border border-border flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{a.t}</div>
                    <div className="text-xs text-muted-foreground">{a.who}</div>
                  </div>
                  <span className="text-[10px] text-primary font-semibold">{a.w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

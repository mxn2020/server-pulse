import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Server, Wifi, HardDrive, Cpu, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const servers = [
    { id: "1", name: "prod-web-01", ip: "10.0.0.1", cpu: 72, ram: 58, disk: 41, status: "online" },
    { id: "2", name: "prod-db-01", ip: "10.0.0.2", cpu: 18, ram: 84, disk: 67, status: "online" },
    { id: "3", name: "staging-01", ip: "10.0.0.3", cpu: 5, ram: 22, disk: 28, status: "online" },
    { id: "4", name: "prod-redis-01", ip: "10.0.0.4", cpu: 95, ram: 74, disk: 35, status: "warning" },
    { id: "5", name: "backup-01", ip: "10.0.0.5", cpu: 0, ram: 0, disk: 99, status: "offline" }
];
const history = Array.from({ length: 20 }, (_, i) => ({ t: `${i}m`, cpu: Math.floor(30 + Math.random() * 40), ram: Math.floor(50 + Math.random() * 30) }));
type Stat = { label: string; value: string; sub: string; color: string; icon: React.ElementType };
const stats: Stat[] = [
    { label: "Total Servers", value: "5", sub: "4 online, 1 offline", color: "var(--color-accent-primary)", icon: Server },
    { label: "Avg CPU", value: "38%", sub: "Last 60 minutes", color: "#10B981", icon: Cpu },
    { label: "Avg RAM", value: "48%", sub: "Across all nodes", color: "#8B5CF6", icon: HardDrive },
    { label: "Active Alerts", value: "2", sub: "1 critical, 1 warning", color: "#EF4444", icon: AlertTriangle }
];

export default function DashboardPage() {
    return (<div style={{ padding: "var(--space-6)", maxWidth: 1400 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
            <div>
                <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700 }}>Infrastructure Overview</h1>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", marginTop: 4 }}>Last updated: just now</p>
            </div>
            <button className="btn btn-primary"><Wifi size={16} /> Add Server</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            {stats.map(s => (
                <div key={s.label} className="card" style={{ padding: "var(--space-5)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-3)" }}>
                        <span style={{ fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: 500 }}>{s.label}</span>
                        <s.icon size={16} style={{ color: s.color }} />
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: s.color, fontFamily: "var(--font-mono)" }}>{s.value}</div>
                    <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginTop: "var(--space-2)" }}>{s.sub}</div>
                </div>
            ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-6)" }}>
            <div className="card" style={{ padding: "var(--space-5)" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "var(--space-4)" }}>Cluster CPU & RAM (last 20m)</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={history}>
                        <defs>
                            <linearGradient id="cpu" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} /><stop offset="95%" stopColor="#06B6D4" stopOpacity={0} /></linearGradient>
                            <linearGradient id="ram" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} /><stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient>
                        </defs>
                        <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} unit="%" />
                        <Tooltip contentStyle={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                        <Area type="monotone" dataKey="cpu" stroke="#06B6D4" fill="url(#cpu)" strokeWidth={2} name="CPU%" />
                        <Area type="monotone" dataKey="ram" stroke="#8B5CF6" fill="url(#ram)" strokeWidth={2} name="RAM%" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="card" style={{ padding: "var(--space-5)" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "var(--space-4)" }}>Server Fleet</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                    {servers.map(s => (
                        <Link key={s.id} to={`/server/${s.id}`} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-3)", borderRadius: "var(--radius-sm)", background: "var(--color-bg-secondary)", borderLeft: `3px solid ${s.status === "online" ? "#10B981" : s.status === "warning" ? "#F59E0B" : "#EF4444"}` }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "13px", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{s.name}</div>
                                <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", fontFamily: "var(--font-mono)" }}>{s.ip}</div>
                            </div>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: s.status === "online" ? "#10B981" : s.status === "warning" ? "#F59E0B" : "#EF4444", textTransform: "uppercase" }}>{s.status}</span>
                            <ArrowRight size={14} style={{ color: "var(--color-text-tertiary)" }} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>);
}

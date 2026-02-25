import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const history = Array.from({ length: 30 }, (_, i) => ({ t: `${i}m`, cpu: Math.floor(50 + Math.sin(i / 3) * 30), ram: Math.floor(65 + Math.cos(i / 4) * 15), disk: Math.floor(40 + i * 0.3) }));

export default function ServerDetailPage() {
    return (<div style={{ padding: "var(--space-6)", maxWidth: 1400 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            <Link to="/" className="btn btn-ghost btn-sm" style={{ padding: 6 }}><ArrowLeft size={18} /></Link>
            <div>
                <h1 style={{ fontSize: "var(--font-size-xl)", fontWeight: 700, fontFamily: "var(--font-mono)" }}>prod-web-01</h1>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", fontFamily: "var(--font-mono)" }}>10.0.0.1 &bull; Ubuntu 22.04 &bull; 8 vCPU / 16GB RAM</p>
            </div>
            <span className="badge badge-success" style={{ marginLeft: "auto" }}>Online</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            {[{ k: "CPU", v: "72%", color: "#06B6D4" }, { k: "RAM", v: "58%", color: "#8B5CF6" }, { k: "Disk", v: "41%", color: "#F59E0B" }].map(m => (
                <div key={m.k} className="card" style={{ padding: "var(--space-5)" }}>
                    <div style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>{m.k} Utilization</div>
                    <div style={{ fontSize: "32px", fontWeight: 700, fontFamily: "var(--font-mono)", color: m.color }}>{m.v}</div>
                    <div style={{ height: 6, background: "var(--color-bg-tertiary)", borderRadius: 3, marginTop: "var(--space-3)" }}>
                        <div style={{ height: "100%", width: m.v, background: m.color, borderRadius: 3, transition: "width 0.5s" }}></div>
                    </div>
                </div>
            ))}
        </div>

        <div className="card" style={{ padding: "var(--space-5)" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "var(--space-4)" }}>30-minute History</h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={history}>
                    <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip contentStyle={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey="cpu" stroke="#06B6D4" strokeWidth={2} dot={false} name="CPU%" />
                    <Line type="monotone" dataKey="ram" stroke="#8B5CF6" strokeWidth={2} dot={false} name="RAM%" />
                    <Line type="monotone" dataKey="disk" stroke="#F59E0B" strokeWidth={2} dot={false} name="Disk%" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>);
}

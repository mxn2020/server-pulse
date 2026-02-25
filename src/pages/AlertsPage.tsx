import { AlertTriangle, Bell, Clock, X } from "lucide-react";
const alerts = [
    { id: "1", server: "prod-redis-01", rule: "CPU > 90%", current: "95%", duration: "3m", sev: "critical" },
    { id: "2", server: "prod-web-01", rule: "Load avg > 4", current: "4.7", duration: "8m", sev: "warning" },
    { id: "3", server: "prod-db-01", rule: "RAM > 80%", current: "84%", duration: "Resolved", sev: "resolved" }
];
export default function AlertsPage() {
    return (<div style={{ padding: "var(--space-6)", maxWidth: 900 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
            <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, display: "flex", alignItems: "center", gap: "var(--space-2)" }}><AlertTriangle style={{ color: "#EF4444" }} /> Alerts</h1>
            <button className="btn"><Bell size={16} /> Notification Settings</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {alerts.map(a => (
                <div key={a.id} className="card" style={{ padding: "var(--space-5)", borderLeft: `4px solid ${a.sev === "critical" ? "#EF4444" : a.sev === "warning" ? "#F59E0B" : "#10B981"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <div style={{ fontWeight: 700, marginBottom: "var(--space-2)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                                <span className={`badge ${a.sev === "critical" ? "badge-danger" : a.sev === "warning" ? "badge-warning" : "badge-success"}`}>{a.sev}</span>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px" }}>{a.server}</span>
                            </div>
                            <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>{a.rule} &rarr; <strong style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-primary)" }}>{a.current}</strong></p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-text-tertiary)", fontSize: "12px" }}><Clock size={12} />{a.duration}</div>
                            {a.sev !== "resolved" && <button className="btn btn-ghost btn-sm" style={{ padding: 4 }}><X size={16} /></button>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>);
}

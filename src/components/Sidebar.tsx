import { Link, useLocation } from "react-router-dom";
import { Activity, Server, AlertTriangle, Settings, LayoutDashboard } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
export default function Sidebar() {
    const loc = useLocation();
    const links = [
        { to: "/", icon: LayoutDashboard, label: "Overview" },
        { to: "/server/1", icon: Server, label: "Servers" },
        { to: "/alerts", icon: AlertTriangle, label: "Active Alerts" },
        { to: "/settings", icon: Settings, label: "Configuration" }
    ];
    return (<aside style={{ width: "var(--sidebar-width)", background: "var(--color-bg-secondary)", borderRight: "1px solid var(--color-border)", height: "100vh", position: "fixed", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "var(--space-6)", display: "flex", alignItems: "center", gap: "var(--space-3)", borderBottom: "1px solid var(--color-border)" }}>
            <div style={{ color: "var(--color-accent-primary)" }}><Activity size={24} /></div>
            <strong style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.5px" }}>ServerPulse</strong>
        </div>
        <nav style={{ padding: "var(--space-4)", flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", marginBottom: 8, paddingLeft: "var(--space-2)", letterSpacing: 1 }}>Monitoring</div>
            {links.map(l => <Link key={l.to} to={l.to} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-3)", borderRadius: "var(--radius-sm)", color: loc.pathname === l.to ? "var(--color-accent-primary)" : "var(--color-text-secondary)", background: loc.pathname === l.to ? "var(--color-bg-card)" : "transparent", fontWeight: 500, fontSize: "14px", transition: "all var(--transition-fast)", borderLeft: loc.pathname === l.to ? "2px solid var(--color-accent-primary)" : "2px solid transparent" }}><l.icon size={18} />{l.label}</Link>)}
        </nav>
        <div style={{ padding: "var(--space-4)", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "flex-end" }}><ThemeToggle /></div>
    </aside>);
}

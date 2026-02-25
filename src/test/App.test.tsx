import { describe, it, expect } from "vitest"; import { render, screen } from "@testing-library/react"; import { MemoryRouter } from "react-router-dom";
import Sidebar from "../components/Sidebar"; import DashboardPage from "../pages/DashboardPage"; import AlertsPage from "../pages/AlertsPage"; import ServerDetailPage from "../pages/ServerDetailPage";
function wrap(ui: React.ReactElement) { return render(<MemoryRouter>{ui}</MemoryRouter>); }

describe("Pages", () => {
    it("Sidebar renders", () => { wrap(<Sidebar />); expect(screen.getByText("ServerPulse")).toBeInTheDocument(); });
    it("DashboardPage renders", () => { wrap(<DashboardPage />); expect(screen.getByText("Infrastructure Overview")).toBeInTheDocument(); });
    it("ServerDetailPage renders", () => { wrap(<ServerDetailPage />); expect(screen.getByText("30-minute History")).toBeInTheDocument(); });
    it("AlertsPage renders", () => { wrap(<AlertsPage />); expect(screen.getAllByText("Alerts")[0]).toBeInTheDocument(); });
});

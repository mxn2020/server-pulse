import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import ServerDetailPage from "./pages/ServerDetailPage";
import AlertsPage from "./pages/AlertsPage";

export default function App() {
  return (<BrowserRouter>
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: "var(--sidebar-width)", flex: 1, minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/server/:id" element={<ServerDetailPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/settings" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>);
}

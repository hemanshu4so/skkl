import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Normal app
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Login from "./pages/Login";
import Renew from "./pages/Renew";
import ShopSettings from "./pages/ShopSettings";

// 🔹 Super Admin
import SuperAdminLayout from "./superadmin/SuperAdminLayout";
import SuperAdminDashboard from "./superadmin/SuperAdminDashboard";
import CreateShop from "./superadmin/CreateShop";
import ShopsList from "./superadmin/ShopsList";
import ShopDetails from "./superadmin/ShopDetails";
import EditShop from "./superadmin/EditShop";
import Plans from "./superadmin/Plans";
import Payments from "./superadmin/Payments";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🔐 PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/renew" element={<Renew />} />

        {/* ⚡ SUPER ADMIN */}
        <Route path="/sa" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="create-shop" element={<CreateShop />} />
          <Route path="shops" element={<ShopsList />} />
          <Route path="shop/:id" element={<ShopDetails />} />
          <Route path="edit-shop/:id" element={<EditShop />} />
          <Route path="plans" element={<Plans />} />
          <Route path="payments" element={<Payments />} />
        </Route>

        {/* 🏪 CRM */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<ShopSettings />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
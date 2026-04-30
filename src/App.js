import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Normal app
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Login from "./pages/Login";

// Super Admin
import SuperAdminLayout from "./superadmin/SuperAdminLayout";
import SuperAdminDashboard from "./superadmin/SuperAdminDashboard";
import CreateShop from "./superadmin/CreateShop";
import ShopsList from "./superadmin/ShopsList";
import ShopDetails from "./superadmin/ShopDetails";
import EditShop from "./superadmin/EditShop";

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 🔥 SUPER ADMIN PANEL (ONLY ONCE) */}
        <Route path="/sa/*" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="create-shop" element={<CreateShop />} />
          <Route path="shops" element={<ShopsList />} />
          <Route path="shop/:id" element={<ShopDetails />} />
          <Route path="edit-shop/:id" element={<EditShop />} />
        </Route>

        {/* 🔥 NORMAL CRM */}
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
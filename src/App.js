import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Login from "./pages/Login";
import SuperAdmin from "./pages/SuperAdmin";

function App() {
  return (
    <Router>
      <Routes>
        
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="superadmin" element={<SuperAdmin />} /> {/* 🔥 FIX */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
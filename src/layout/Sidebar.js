import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { userData, role, logout } = useAuth();

  const handleLogout = async () => {
    await logout();       // Firebase Auth logout
    navigate("/login");   // Redirect
  };

  return (
    <div style={{
      width: "220px",
      background: "#0c0c0c",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "space-between"
    }}>
      
      {/* TOP MENU */}
      <div>
        <h2 style={{ padding: "20px" }}>SKKL CRM</h2>

        <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/")}>
          🏠 Dashboard
        </div>

        <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => navigate("/customers")}>
          👤 Customers
        </div>

        <div style={{ padding: "10px", cursor: "pointer" }}>
          📦 Products
        </div>

        <div style={{ padding: "10px", cursor: "pointer" }}>
          💰 Billing
        </div>

        {/* 👑 Super Admin Only */}
        {role === "superadmin" && (
          <div
            style={{ padding: "10px", cursor: "pointer", color: "#ffd700" }}
            onClick={() => navigate("/superadmin")}
          >
            👑 Super Admin
          </div>
        )}
      </div>

      {/* BOTTOM PROFILE */}
      <div style={{
        borderTop: "1px solid #333",
        padding: "15px"
      }}>
        <div style={{ marginBottom: "10px" }}>
          👤 {userData?.name || "User"}
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "8px",
            background: "#ff4d4d",
            border: "none",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

    </div>
  );
}
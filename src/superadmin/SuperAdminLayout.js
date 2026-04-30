import { Outlet, useNavigate } from "react-router-dom";

export default function SuperAdminLayout() {
  const navigate = useNavigate();

  const item = {
    padding: "12px",
    cursor: "pointer",
    borderBottom: "1px solid #333"
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#111",
        color: "#fff"
      }}>
        <h2 style={{ padding: "15px" }}>⚡ SUPER ADMIN</h2>

        <div style={item} onClick={() => navigate("/sa")}>
          📊 Dashboard
        </div>

        <div style={item} onClick={() => navigate("/sa/create-shop")}>
          ➕ Create Shop
        </div>

        <div style={item} onClick={() => navigate("/sa/shops")}>
          🏪 All Shops
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
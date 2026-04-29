import { useState, useEffect } from "react";

export default function LockScreen({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const checkPin = (value) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    console.log("Entered PIN:", value);
    console.log("Saved PIN:", userData?.pin);

    if (String(value) === String(userData?.pin)) {
      setError("");
      onUnlock();
    } else {
      setError("Wrong PIN ❌");
      setPin("");

      // 🔥 Shake animation FIXED (inside else)
      const box = document.getElementById("lock-box");
      if (box) {
        box.style.animation = "shake 0.3s";
        setTimeout(() => (box.style.animation = ""), 300);
      }
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      checkPin(pin);
    }
    // eslint-disable-next-line
  }, [pin]);

  return (
    <>
      <div style={styles.overlay}>
        <div id="lock-box" style={styles.box}>
          <h2 style={{ marginBottom: "5px" }}>🔒 Locked</h2>
          <p style={{ fontSize: "14px", color: "#aaa" }}>
            Enter your 4-digit PIN
          </p>

          <input
            type="password"
            maxLength={4}
            value={pin}
            autoFocus
            onChange={(e) => {
              setError("");
              setPin(e.target.value);
            }}
            style={styles.input}
          />

          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}
        </div>
      </div>

      <style>
        {`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      `}
      </style>
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(6px)",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  box: {
    background: "#111",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    width: "300px",
    color: "#fff",
    boxShadow: "0 0 25px rgba(255,255,255,0.08)",
  },

  input: {
    marginTop: "15px",
    padding: "12px",
    fontSize: "22px",
    textAlign: "center",
    letterSpacing: "12px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#fff",
    outline: "none",
  },
};
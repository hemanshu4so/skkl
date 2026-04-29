import { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  const snapshot = await getDocs(collection(db, "users"));

  let foundUser = null;

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (
      data.email?.toLowerCase().trim() === email.toLowerCase().trim() &&
      String(data.password).trim() === String(password).trim()
    ) {
      foundUser = { id: doc.id, ...data };
    }
  });

  if (!foundUser) {
    alert("Invalid email or password ❌");
    return;
  }

  const userPin =
    foundUser.pin || foundUser?.permissions?.pin || "1234";

  localStorage.setItem(
    "user",
    JSON.stringify({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      pin: userPin,
    })
  );

  if (foundUser.role === "superadmin") {
    navigate("/superadmin");
  } else {
    navigate("/");
  }
};

  return (
    <div style={{ padding: "100px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
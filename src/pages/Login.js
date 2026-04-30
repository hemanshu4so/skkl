import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 🔐 Firebase Auth Login
      const userCred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const uid = userCred.user.uid;

      // 🔍 1️⃣ try normal users collection
      let userRef = doc(db, "users", uid);
      let snap = await getDoc(userRef);

      let role = "user";
      let userData = null;

      // 🔍 2️⃣ if not found → check superadmins
      if (!snap.exists()) {
        userRef = doc(db, "superadmins", uid);
        snap = await getDoc(userRef);

        if (!snap.exists()) {
          alert("User data not found ❌");
          return;
        }

        role = "superadmin";
        userData = snap.data();
      } else {
        userData = snap.data();
        role = userData.role || "user";
      }

      console.log("LOGIN USER:", userData);

      // ✅ SAFE STORE (no password)
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: uid,
          name: userData.name || "",
          role: role,
          shopId: userData.shopId || null,
          pin: userData.pin || null
        })
      );

      // 🚀 ROLE BASED ROUTING
      if (role === "superadmin") {
        navigate("/sa"); // 🔥 IMPORTANT CHANGE
      } else if (role === "admin") {
        navigate("/"); // later admin panel banavsu
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      alert("Invalid email or password ❌");
    }
  };

  return (
    <div style={{ padding: "100px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
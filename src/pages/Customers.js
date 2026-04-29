import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

export default function Customers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customers, setCustomers] = useState([]);

  const shopId = "xNSHZ9P76zfXdpYFmSH1";

  // 🔥 REALTIME + FILTER (only this shop)
  useEffect(() => {
    const q = query(
      collection(db, "customers"),
      where("shopId", "==", shopId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCustomers(list);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 ADD CUSTOMER
  const addCustomer = async () => {
    if (!name || !phone) {
      alert("Fill all fields");
      return;
    }

    await addDoc(collection(db, "customers"), {
      shopId,
      name,
      phone,
      createdAt: new Date(),
    });

    setName("");
    setPhone("");
  };

  // 🔥 DELETE CUSTOMER
  const deleteCustomer = async (id) => {
    await deleteDoc(doc(db, "customers", id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Add Customer</h2>

      <input
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button
        onClick={addCustomer}
        style={{
          padding: "10px",
          width: "100%",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Customer
      </button>

      <hr style={{ margin: "20px 0" }} />

      <h2>Customer List</h2>
      <p>Total: {customers.length}</p>

      {customers.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "10px",
            background: "#f9f9f9",
          }}
        >
          <b>{c.name}</b>
          <br />
          {c.phone}

          <br /><br />

          <button
            onClick={() => deleteCustomer(c.id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
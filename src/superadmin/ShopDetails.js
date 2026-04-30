import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ShopDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "shops", id));
      if (snap.exists()) {
        setShop(snap.data());
      }
    };
    fetch();
  }, [id]);

  if (!shop) return <p>Loading...</p>;

  return (
    <div>

      <button onClick={() => navigate(-1)} style={backBtn}>
        ⬅ Back
      </button>

      <h2>{shop.name}</h2>

      <div style={card}>
        <p><b>Shop ID:</b> {id}</p>
        <p><b>Owner ID:</b> {shop.ownerId}</p>
        <p><b>Created:</b> {shop.createdAt?.toDate?.().toString()}</p>
      </div>
    </div>
  );
}

const backBtn = {
  marginBottom: "15px",
  padding: "8px 12px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
};

const card = {
  background: "#111",
  color: "#fff",
  padding: "20px",
  borderRadius: "10px",
};  
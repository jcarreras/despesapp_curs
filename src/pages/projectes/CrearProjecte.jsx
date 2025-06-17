import { useState } from "react";
import { getCurrentUser, saveCollection } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Projecte.css";
export default function CrearProjecte() {
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) {
      navigate("/register");
      return;
    }
    const nouProjecte = {
      name: nom,
      owner: user.uid,
      participants: [user.uid], // Guardem només UIDs per simplicitat
      despeses: [""]
    };
    const docRef = saveCollection("projectes", nouProjecte);
    navigate("/");
  };

  return (
    <div className="projecte-container">
      <h2 >Crear nou projecte</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={nom}
          onChange={e => setNom(e.target.value)}
          placeholder="Nom del projecte"
          required
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};
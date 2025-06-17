import { useState } from "react";
import { getCurrentUser, saveCollection } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Participants.css";

export default function CrearParticipant() {
    const [nom, setNom]     = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleParticipant = async (e) => {
        e.preventDefault();
        const user = getCurrentUser();
        if (!user) return;
        const nouParticipant = {
            name: nom,
            email: email,
            uid: crypto.randomUUID()
        };
        const docRef = saveCollection("participants", nouParticipant);
        navigate("/gestioparticipants");
    };
  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Crear un nou Participant no registrat</h1>
        <form onSubmit={handleParticipant}>
          <div className="form-group">
             <label htmlFor="name" className="form-label">
               Nom
             </label>
             <input
               type="text"
               placeholder="Nom de l'usuari"
               id="name"
               value={nom}
               onChange={(e) => setNom(e.target.value)}
               className="form-input"
               required
             />
          </div>
          <br/>
          <div className="form-group">
             <label htmlFor="email" className="form-label">
               Correu electrònic
             </label>
             <input
               type="email"
               placeholder="Correu electrònic"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="form-input"
               required
             />
          </div>
          <br/>
          <button type="submit" className="form-button">
             Crear 
          </button>
        </form>
       </div>
     </div>
    
  );
};
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RetornaInfoParticipant, RetornaNomParticipant, getCurrentUser, updateCollection} from "../../firebase/firebase";


export default function EditarParticipant() {
  const { id } = useParams(); // Document on hi ha el participant
  const navigate = useNavigate();
  const usuari   = getCurrentUser();
  const [nomusuari, setNomUsuari] = useState("");
  const [carregant, setCarregant] = useState(true);
  const [nom, setNom]             = useState("");
  const [email, setEmail]         = useState([]);
  const [uid, setUid]             = useState("");

  useEffect(() => {
      const obtenirNom = async () => {
        if (usuari?.uid) {
          const nom2 = await RetornaNomParticipant(usuari.uid);
          setNomUsuari(nom2);
        }
      };
      obtenirNom();
    }, [usuari]);

  useEffect(() => {
    const carregarParticipant = async () => {
      const p = await RetornaInfoParticipant(id); // p és un objecte, no un snap
      if (p) {
        setNom(p.name);
        setEmail(p.email);
        setUid(p.uid);
        setCarregant(false);
      }
    };
    if (id) carregarParticipant();
  }, [id]);

  const handleParticipant = async (e) =>{
    e.preventDefault();
    const updateParticipant={
      name:nom,
      email:email
    };
    await updateCollection("participants", id, updateParticipant);
    alert("Particpant actualitzat");
    navigate("/gestioparticipants");
  };

  
  if (carregant) return <p>Carregant...</p>;

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Hola, {nomusuari}. Edita el Participant {nom}</h1>
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
          <div className="form-group">
             <label htmlFor="email" className="form-label">
               UID del participant: {uid}
             </label>   
          </div>    
          <div className="form-group">
             <label htmlFor="email" className="form-label">
               Id del document on és el participant: {id}
             </label>   
          </div>      
          <br/>
          <button type="submit" className="form-button">
             Guardar Canvis
          </button>
        </form>
       </div>
     </div>
  );
};




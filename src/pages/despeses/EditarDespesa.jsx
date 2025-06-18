import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RetornaInfoDespesa, saveCollection, isUserLoggedIn, RetornaParticipants, RetornaInfoParticipant, RetornaNomParticipant, getCurrentUser, updateCollection} from "../../firebase/firebase";
import './Despeses.css';

export default function EditarDespesa() {
  const { id } = useParams(); 
  const [nomusuari, setNomUsuari]  = useState("");
  const [concepte, setConcepte]    = useState("");
  const [quantia, setQuantia]      = useState("");
  const [pagatPer, setPagatPer]    = useState("");
  const [uid, setUid]              = useState("");
  const [dividirEntre, setDividirEntre] = useState([]);
  const [participants, setParticipants] = useState([]);  
  const [carregant, setCarregant]  = useState(true);
  const navigate = useNavigate();
  const usuari   = getCurrentUser();

  const resetForm = () => {
    setConcepte("");
    setQuantia("");
    setPagatPer("");
    setDividirEntre([]);
    setUid("");
  }

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
    const unsubscribe = isUserLoggedIn(async () => {
      if (usuari) { // Usuari autenticat, carreguem els seus projectes
        await fetchParticipants();
      } else {        // No autenticat, redirigir al login
        navigate("/login");
        return;
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const carregarDespesa = async () => {
      const p = await RetornaInfoDespesa(id); // p és un objecte, no un snap
      if (p) {
        setConcepte(p.concepte);
        setQuantia(p.quantia);
        setPagatPer(p.pagatPer);
        setDividirEntre(p.dividirEntre);
        setUid(p.uid);
        setCarregant(false);
      }
    };
    if (id) carregarDespesa();
  }, [id]);

  const fetchParticipants = async () => {
    const results = await RetornaParticipants();
    setParticipants(results);
  };
  
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




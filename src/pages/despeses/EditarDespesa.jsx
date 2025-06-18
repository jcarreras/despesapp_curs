import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RetornaInfoDespesa, isUserLoggedIn, RetornaParticipants, 
  RetornaNomParticipant, getCurrentUser, updateCollection} from "../../firebase/firebase";
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

  const handleDespesa = async (e) =>{
    e.preventDefault();
    const updateDespesa={
      concepte:concepte,
      quantia:quantia,
      pagatPer: pagatPer,
      dividirEntre:dividirEntre
    };
    await updateCollection("despeses", id, updateDespesa);
    alert("Despesa actualitzada");
    navigate("/gestiodespeses");
  };

  
  if (carregant) return <p>Carregant...</p>;

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Hola, {nomusuari}. Edita la Despesa {nom}</h1>
        <form onSubmit={handleDespesa}>
          <div className="form-group">
            <label>
                <span>Concepte</span>
                <input 
                    type="text" 
                    id="concepte"
                    placeholder="Concepte de la despesa"
                    onChange={(e) => setConcepte(e.target.value)} 
                    value={concepte} 
                    className="form-input"
                    required
                />
            </label>
          </div>
          <br/>
          <div className="form-group">
            <label>
                <span>Quantia</span>
                <input 
                    type="text" 
                    id="quantia"
                    placeholder="cost de la despesa"                    
                    onChange={(e) => setQuantia(e.target.value)} 
                    value={quantia} 
                    className="form-input"
                    required
                />
            </label>
          </div>
          <br/>
          <div className="form-group">           
            <label>
                <span>Pagat per: </span>
                <select value={pagatPer} id = "pagatPer" name="pagatPer" onChange={(e) => {setPagatPer(e.target.value)}}>
                {participants.length === 0 ? (
                     <p>No hi ha cap participant. Crea'n un abans de dividir les despeses!</p>
                ) : (
                    participants.map(participant => (
                        <option key={participant.id} value={participant.uid}>{participant.name}, {participant.email}</option>
                    ))
                )}
                </select>
            </label>
          </div> 
          <br/>
          <div className="form-group">    
           <label>         
                <span>Dividit entre: </span>  
                <select value={dividirEntre} multiple id = "dividitEntre" name="dividitEntre" onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  setDividirEntre(selected);
                }}>
                {participants.length === 0 ? (
                     <p>No hi ha cap participant. Crea'n un abans de dividir les despeses!</p>
                ) : (
                    participants.map(participant => (
                        <option key={participant.id} value={participant.uid}>{participant.name}, {participant.email}</option>
                    ))
                )}
                </select>
            </label>
          </div>
          <br/>
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




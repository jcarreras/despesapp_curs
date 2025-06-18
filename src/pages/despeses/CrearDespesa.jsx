import { useEffect, useState } from 'react';
import { saveCollection, isUserLoggedIn, getCurrentUser, RetornaParticipants, RetornaNomParticipant } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import './Despeses.css';

export default function CrearDespesa() {
  const [participants, setParticipants] = useState([]);
  const [nomusuari, setNomUsuari] = useState("");
  const [concepte, setConcepte] = useState("");
  const [quantia, setQuantia] = useState("");
  const [pagatPer, setPagatPer] = useState("");
  const [dividirEntre, setDividirEntre]= useState([]);
  const navigate = useNavigate();
  const usuari   = getCurrentUser();

  const resetForm = () => {
    setConcepte("");
    setQuantia("");
    setPagatPer("");
    setDividirEntre([]);
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

  const fetchParticipants = async () => {
    const results = await RetornaParticipants();
    setParticipants(results);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const despesa = {
        concepte: concepte,
        quantitat: quantia,
        pagatPer: pagatPer,
        dividirEntre: dividirEntre,
        uid: crypto.randomUUID(),
    };
    await afegirDespesa(despesa);
    resetForm();
  };
  const afegirDespesa = async (despesa) => {
      const docRef = saveCollection("despeses", despesa);
      alert("Despesa afegida");
      navigate("/gestiodespeses");
  };

  return (

    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Hola {nomusuari}. Crear una nova despesa</h1>
        <form onSubmit={handleSubmit}>
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
                <select id = "pagatPer" name="pagatPer" onChange={(e) => {setPagatPer(e.target.value)}}>
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
          <div className="form-group">    
           <label>         
                <span>Dividit entre: </span>  
                <select multiple id = "dividitEntre" name="dividitEntre" onChange={(e) => {
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
          <button type="submit" className="form-button">
             Crear despesa
          </button>
        </form>
       </div>
     </div>
  );
};
import { useEffect, useState } from "react";
import { RetornaDespeses, logoutUser, isUserLoggedIn,  
  getCurrentUser, RetornaNomParticipant, deleteCollection } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import './Despeses.css';

export default function GestioDespeses() {
  const [despeses, setDespeses]   = useState([]);
  const [nomusuari, setNomUsuari] = useState("");
  const [concepte, setConcepte]   = useState("");
  const [quantia, setQuantia]     = useState("");
  const [pagatPer, setPagatPer]   = useState("");
  const [dividirEntre, setDividirEntre] = useState([]);
  const [participants, setParticipants] = useState([]);  
  const [loading, setLoading]     = useState(true);
  const navigate = useNavigate();
  const usuari   = getCurrentUser();

  useEffect(() => {
    const obtenirNom = async () => {
      if (usuari?.uid) {
        const nom = await RetornaNomParticipant(usuari.uid);
        setNomUsuari(nom);
      }
    };
    obtenirNom();
  }, [usuari]);

  useEffect(() => {
    const unsubscribe = isUserLoggedIn(async () => {
      if (usuari) { // Usuari autenticat, carreguem els seus projectes
        await fetchDespeses();
        setLoading(false);
      } else {        // No autenticat, redirigir al login
        navigate("/login");
        return;
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchDespeses = async () => {
    const results = await RetornaDespeses();
    setDespeses(results);
  };

  const handleSignOut = () => {
    logoutUser();
    navigate("/login");
  };

  const eliminarDespesa = async (id) => {
    if (window.confirm("Segur que vols eliminar aquesta despesa?")) {
      await deleteCollection("despeses", id);
      setDespeses(prevDespeses =>prevDespeses.filter(p => p.uid !== id));
      await fetchDespeses();
    }
  };

  const tornar = async () =>{
    navigate("/");
  };

  if (loading) return <p>Carregant...</p>;  

  return (
    <div className="inici-container">
       <h2>Hola, {nomusuari}. Aquí pots veure totes les despeses</h2>
       <ul className="inici-content">
         {despeses.length === 0 ? (
           <p>No hi ha cap despesa. Crea'n un!</p>
         ) : (
           despeses.map(despesa => (
             <li key={despesa.id}>{despesa.concepte}, {despesa.quantia}
                <Link to={`/despesa/${despesa.id}`}>Editar </Link>
                <button onClick={()=>eliminarDespesa(despesa.id)}>Eliminar</button>
             </li>
           ))
         )}
       </ul>
       <br />
       <Link to={`/creardespesa`}>
         <button> Crear una nova despesa</button>
       </Link>
               <br />
       <div>
          <button onClick={tornar}>Tornar a la llista de projectes</button>
          <br />        <br />
          <button onClick={handleSignOut}>Tancar sessió</button>
       </div>
     </div>
  )
}

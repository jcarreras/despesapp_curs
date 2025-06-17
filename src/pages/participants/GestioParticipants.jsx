import { useEffect, useState } from "react";
import { RetornaParticipants, logoutUser, isUserLoggedIn,  
  getCurrentUser, RetornaNomParticipant, deleteCollection } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import './Participants.css';

export default function GestioParticipants() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [nom, setNomUsuari]       = useState("");
  const navigate                  = useNavigate();
  const usuari                    = getCurrentUser();


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
        await fetchParticipants();
        setLoading(false);
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

  const handleSignOut = () => {
    logoutUser();
    navigate("/login");
  };

  const eliminarParticipant = async (id) => {
    if (window.confirm("Segur que vols eliminar aquest participant?")) {
      await deleteCollection("participants", id);
      setParticipants(prevParticipants =>prevParticipants.filter(p => p.uid !== id));
      await fetchParticipants();
    }
  };

  const tornar = async () =>{
    navigate("/");
  };

  if (loading) return <p>Carregant...</p>;    
  return (
         <div className="inici-container">
       <h2>Hola, {nom}. Aquí pots veure tots els participants</h2>
       <ul className="inici-content">
         {participants.length === 0 ? (
           <p>No hi ha cap participant. Crea'n un!</p>
         ) : (
           participants.map(participant => (
             <li key={participant.id}>{participant.name}, {participant.email}
                <Link to={`/participant/${participant.id}`}>Editar </Link>
                <button onClick={()=>eliminarParticipant(participant.id)}>Eliminar</button>
             </li>
           ))
         )}
       </ul>
       <br />
       <Link to={`/crearparticipant`}>
         <button> Crear nou participant no registrat</button>
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

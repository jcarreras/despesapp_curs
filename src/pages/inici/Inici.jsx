import { useEffect, useState } from "react";
import { logoutUser, isUserLoggedIn, RetornaProjectes, 
  getCurrentUser, RetornaNomParticipant, deleteCollection } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import './Inici.css';

export default function Inici() {
  const [user, setUser]           = useState(null);
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const navigate                  = useNavigate();
  const usuari                    = getCurrentUser();
  const [nomUsuari, setNomUsuari] = useState("");

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
        setUser(usuari);
        await fetchUserProjects(usuari.uid);
        setLoading(false);
      } else {        // No autenticat, redirigir al login
        navigate("/login");
        return;
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchUserProjects = async (uid) => {
    const results = await RetornaProjectes(uid);
    setProjects(results);
  };

  const handleSignOut = () => {
    logoutUser();
    navigate("/login");
  };

  const eliminarProjecte = async (id) => {
    if (window.confirm("Segur que vols eliminar aquest projecte?")) {
      await deleteCollection("projectes", id);
      setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
    }
  };

  if (loading) return <p>Carregant...</p>;

  return (
     <div className="inici-container">
       <h2>Aquí pots veure els teus projectes {nomUsuari}</h2>
       <ul className="inici-content">
         {projects.length === 0 ? (
           <p>No tens cap projecte. Crea'n un!</p>
         ) : (
           projects.map(project => (
             <li key={project.id}>{project.name}
                <Link to={`/projecte/${project.id}`}>Editar </Link>
                <button onClick={()=>eliminarProjecte(project.id)}>Eliminar</button>
             </li>
           ))
         )}
       </ul>
       <br />
       <Link to={`/crearprojecte`}>
         <button> Crear nou projecte</button>
       </Link>
        <br />
       <Link to={`/crearparticipant`}>
         <button> Crear nou participant no registrat</button>
       </Link>
        <br />
       <div>
          <button onClick={handleSignOut}>Tancar sessió</button>
       </div>
     </div>
  );
};
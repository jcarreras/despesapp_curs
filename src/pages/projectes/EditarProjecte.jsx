import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  RetornaParticipants,
  RetornaDespeses,
  RetornaInfoProjecte,
  db,
  getCurrentUser
} from "../../firebase/firebase";
import "./Projecte.css";

export default function EditarProjecte() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carregant, setCarregant] = useState(true);
  const [nomProjecte, setNomProjecte] = useState("");
  const [participants, setParticipants] = useState([]);
  const [despeses, setDespeses] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedDespeses, setSelectedDespeses] = useState([]);

  useEffect(() => {
    const carregarDades = async () => {
      const p = await RetornaInfoProjecte(id);
      const partList = await RetornaParticipants();
      const despesaList = await RetornaDespeses();

      if (p) {
        setNomProjecte(p.name);
        setSelectedParticipants(p.participants || []);
        setSelectedDespeses(p.despeses || []);
      }

      setParticipants(partList);
      setDespeses(despesaList);
      setCarregant(false);
    };
    if (id) carregarDades();
  }, [id]);

  const guardarCanvis = async () => {
    const ref = doc(db, "projectes", id);
    await updateDoc(ref, {
      name: nomProjecte,
      participants: selectedParticipants,
      despeses: selectedDespeses,
    });
    alert("Projecte actualitzat");
    navigate("/");
  };

  const eliminarProjecte = async () => {
    const ref = doc(db, "projectes", id);
    await deleteDoc(ref);
    navigate("/");
  };

  if (carregant) return <p>Carregant projecte...</p>;

  return (
    <div className="projecte-container">
      <h2>Edita projecte</h2>

      <input
        value={nomProjecte}
        onChange={e => setNomProjecte(e.target.value)}
        placeholder="Nom del projecte"
        required
      />

      <div className="form-group">
        <label>Participants del projecte:</label>
        <select
          multiple
          value={selectedParticipants}
          onChange={e =>
            setSelectedParticipants(Array.from(e.target.selectedOptions, opt => opt.value))
          }
        >
          {participants.map(p => (
            <option key={p.uid} value={p.uid}>
              {p.name} ({p.email})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Despeses del projecte:</label>
        <select
          multiple
          value={selectedDespeses}
          onChange={e =>
            setSelectedDespeses(Array.from(e.target.selectedOptions, opt => opt.value))
          }
        >
          {despeses.map(d => (
            <option key={d.id} value={d.id}>
              {d.concepte} - {d.quantia} €
            </option>
          ))}
        </select>
      </div>

      <br />
      <button onClick={guardarCanvis}>Guardar canvis</button>
      <button onClick={eliminarProjecte}>Eliminar projecte</button>
      <button onClick={() => navigate("/")}>Tornar</button>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   addDoc,
//   collection,
//   deleteDoc,
// } from "firebase/firestore";
// import { RetornaDocProjecte, RetornaInfoProjecte, getCurrentUser, db, auth } from "../../firebase/firebase";

// export default function EditarProjecte() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const user = getCurrentUser();
//   const [carregant, setCarregant] = useState(true);
//   const [nomProjecte, setNomProjecte] = useState("");
//   const [participants, setParticipants] = useState([]);
//   const [nouParticipant, setNouParticipant] = useState("");
//   const [despeses,setDespeses]=useState([]);
//   const [despesa, setDespesa] = useState({
//     concepte: "",
//     quantitat: "",
//     pagatPer: "",
//     pagadors: [],
//   });

//   useEffect(() => {
//     const carregarProjecte = async () => {
//       const p = await RetornaInfoProjecte(id); // p és un objecte, no un snap
//       if (p) {
//         setNomProjecte(p.name);
//         setParticipants(p.participants || []);
//         setDespeses(prev => ({
//           ...prev,
//           pagatPer: p.owner?.uid || "",
//           pagadors: (p.participants || []).map(p => p.id),
//         }));
//         setCarregant(false);
//       }
//     };
//     if (id) carregarProjecte();
//   }, [id]);

//   const afegirParticipant = () => {
//     if (!nouParticipant.trim()) return;
//     const nou = {
//       id: crypto.randomUUID(),
//       name: nouParticipant.trim(),
//     };
//     setParticipants(prev => [...prev, nou]);
//     setNouParticipant("");
//   };
//   const tornar = async () =>{
//     navigate("/");
//   };
//   const eliminarProjecte = async () => {
//     const ref = doc(db, "projectes", id);
//     await deleteDoc(id);
//     navigate("/");
//   };
//   const guardarProjecte = async () => {
//     const ref = doc(db, "projectes", id);
//     await updateDoc(ref, {
//       participants: participants,
//       despeses:despeses
//     });
//     alert("Projecte actualitzat");
//     navigate("/");
//   };

//   const afegirDespesa = async e => {
//     // if (!nouParticipant.trim()) return;
//     // const nou = {
//     //   id: crypto.randomUUID(),
//     //   name: nouParticipant.trim(),
//     // };
//     // setParticipants(prev => [...prev, nou]);
//     // setNouParticipant("");
//     e.preventDefault();
//     const ref = collection(db, "projectes", id, "despeses");

//     const nova = {
//       ...despesa,
//       quantitat: parseFloat(despesa.quantitat),
//     };

//     await addDoc(ref, nova);
//     alert("Despesa afegida");

//     setDespesa({
//       concepte: "",
//       quantitat: "",
//       pagatPer: auth.currentUser?.uid || "",
//       pagadors: participants.map(p => p.id),
//     });
//   };

//   const toggleSplit = pid => {
//     setDespesa(prev => ({
//       ...prev,
//       pagadors: prev.pagadors.includes(pid)
//         ? prev.pagadors.filter(id => id !== pid)
//         : [...prev.pagadors, pid],
//     }));
//   };

//   if (carregant) return <p>Carregant...</p>;

//   return (
//     <div>
//       <h3>Edita el projecte</h3>
//       <h4>{nomProjecte}</h4>
//       <hr />
//       <h5>Participants</h5>
//       <ul>
//         {participants.map(p => (
//           <li key={p.id}>{p.name}</li>
//         ))}
//       </ul>
//       <input
//         value={nouParticipant}
//         onChange={e => setNouParticipant(e.target.value)}
//         placeholder="Nou participant"
//       />
//       <span>         </span>
//       <button onClick={afegirParticipant}>Afegir participant</button>
//       <br />
//       <hr />
//       <h5>Despeses</h5>
//       <ul>
//         {despeses.map(p => (
//           <li key={p.id}>{p.name}</li>
//         ))}
//       </ul>
//       <form onSubmit={afegirDespesa}>
//         <input
//           placeholder="Concepte"
//           value={despesa.concepte}
//           onChange={e => setDespesa({ ...despesa, concepte: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Quantitat"
//           value={despesa.quantitat}
//           onChange={e => setDespesa({ ...despesa, quantitat: e.target.value })}
//           required
//         />
//         <select
//           value={despesa.pagatPer}
//           onChange={e => setDespesa({ ...despesa, pagatPer: e.target.value })}
//         >
//           {participants.map(p => (
//             <option key={p.id} value={p.id}>
//               {p.data().name}
//             </option>
//           ))}
//         </select>

//         <div>
//           <p>Dividir entre:</p>
//           {participants.map(p => (
//             <label key={p.id} style={{ display: "block" }}>
//               <input
//                 type="checkbox"
//                 checked={despesa.pagadors.includes(p.id)}
//                 onChange={() => toggleSplit(p.id)}
//               />
//               {p.data().name}
//             </label>
//           ))}
//         </div>
//         <button type="submit">Afegir despesa</button>
//         <br/> <br />
//         <button onClick={guardarProjecte}>Guardar projecte</button>
//         <button onClick={eliminarProjecte}>Eliminar projecte</button>
//         <button onClick={tornar}>Tornar a la llista de projectes</button>
//       </form>
//     </div>
//   );
// };
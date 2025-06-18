import { useState, useEffect } from "react";
import { getCurrentUser, saveCollection, RetornaParticipants, RetornaDespeses } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Projecte.css";

export default function CrearProjecte() {
  const [nom, setNom] = useState("");
  const [participants, setParticipants] = useState([]);
  const [despeses, setDespeses] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedDespeses, setSelectedDespeses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDades = async () => {
      const partList = await RetornaParticipants();
      const despesaList = await RetornaDespeses();
      setParticipants(partList);
      setDespeses(despesaList);
    };
    carregarDades();
  }, []);

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
      participants: selectedParticipants.length > 0 ? selectedParticipants : [user.uid],
      despeses: selectedDespeses.length > 0 ? selectedDespeses : [],
    };

    await saveCollection("projectes", nouProjecte);
    navigate("/");
  };

  return (
    <div className="projecte-container">
      <h2>Crear nou projecte</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={nom}
          onChange={e => setNom(e.target.value)}
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

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}


// import { useState } from "react";
// import { getCurrentUser, saveCollection } from "../../firebase/firebase";
// import { useNavigate } from "react-router-dom";
// import "./Projecte.css";
// export default function CrearProjecte() {
//   const [nom, setNom] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = getCurrentUser();
//     if (!user) {
//       navigate("/register");
//       return;
//     }
//     const nouProjecte = {
//       name: nom,
//       owner: user.uid,
//       participants: [user.uid], // Guardem només UIDs per simplicitat
//       despeses: [""]
//     };
//     const docRef = saveCollection("projectes", nouProjecte);
//     navigate("/");
//   };

//   return (
//     <div className="projecte-container">
//       <h2 >Crear nou projecte</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           value={nom}
//           onChange={e => setNom(e.target.value)}
//           placeholder="Nom del projecte"
//           required
//         />
//         <button type="submit">Crear</button>
//       </form>
//     </div>
//   );
// };














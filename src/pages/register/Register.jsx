// register.jsx
import { useState } from "react";
import { registerUser, saveCollection } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [email, setEmail]       = useState("");
  const [name, setName]         = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError]       = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("Les contrasenyes no coincideixen!");
        return;
      }
      const res = await registerUser(email, password);
      if(res.code == undefined){
        console.log(res.user.uid);
        saveCollection("participants", {uid: res.user.uid, email, name})
            .then((user)=>{
                console.log(user);
                console.log("Usuari registrat correctament");
            });
        navigate("/");
      } else {
        setError("Hi ha hagut un error, el més segur és que l'usuari ja existeixi, torna-ho a provar!", res.message);
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
      }
      
    } catch (err) {
      setError("Error al registrar-se");
    }
  };
  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Registra't</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
             <label htmlFor="name" className="form-label">
               Nom
             </label>
             <input
               type="text"
               placeholder="Nom de l'usuari"
               id="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
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
          <div className="form-group">
             <label htmlFor="password" className="form-label">
               Contrasenya
             </label>
             <input
               type="password"
               placeholder="Contrasenya"
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="form-input"
               required
             />
          </div>
          <br/>           
          <div className="form-group">
             <label htmlFor="confirmPassword" className="form-label">
               Confirmi la contrasenyaauth,
             </label>
             <input
               type="password"
               placeholder="Repeteix la contrasenya"
               id="confirmPassword"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               className="form-input"
               required
             />
          </div>
          <button type="submit" className="form-button">
             Registra't
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
       </div>
     </div>
  );
};
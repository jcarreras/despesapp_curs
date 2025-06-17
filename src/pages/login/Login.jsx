// login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../firebase/firebase";
import "./Login.css";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      if (res.code == undefined){
        navigate("/");
      }else{
        setError("Error d'inici de sessió, torna-ho a provar!");
      }
    }catch(err){
      setError("Error d'inici de sessió");
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Inicia la sessió</h1>
        <form onSubmit={handleLogin}>
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
           <button type="submit" className="form-button">
             Inicia sessió
           </button>
           {error && <p className="error-message">{error}</p>}
         </form>
        <p>No tens compte? <Link to="/register">Registra't aquí</Link></p>
       </div>
     </div>
  );
};
import React, { useState } from "react";
import "./Register.css";
import { registerUser, saveCollection } from "../../firebase/firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      alert("Les contrasenyes no coincideixen!");
      return;
    }
    console.log("Email:", email);
    console.log("Nom:", name);
    console.log("Contrasenya:", password);
    
    // Enviar les dades a Firebase
    const res = await registerUser(email, password);

    if(res.code == undefined){
        console.log(res.user.uid);
        saveCollection("participants", {uid: res.user.uid, email, name})
            .then((user)=>{
                console.log(user);
                console.log("Usuari registrat correctament");
                
            });
    } else {
        setError(res.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Registra't</h1>
        {error && <p className="error-message">{error}</p>} {/* Missatge d'error */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correu electrònic
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contrasenya
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirma la contrasenya
            </label>
            <input
              type="password"
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
        </form>
      </div>
    </div>
  );
}

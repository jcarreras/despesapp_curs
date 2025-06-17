// main.jsx o App.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inici from "./pages/inici/Inici";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import EditarProjecte from "./pages/projectes/EditarProjecte";
import CrearProjecte from "./pages/projectes/CrearProjecte";
import Navbar from './components/navbar/Navbar';
import CrearParticipant from "./pages/participants/CrearParticipant";
import EditarParticipant from "./pages/participants/EditarParticipant";
import GestioParticipants from "./pages/participants/GestioParticipants";
import CrearDespesa from "./pages/despeses/CrearDespesa";
import EditarDespesa from "./pages/despeses/EditarDespesa";
import GestioDespeses from "./pages/despeses/GestioDespeses";
import './App.css';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inici />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crearprojecte" element={<CrearProjecte />} />
        <Route path='/projecte/:id' element={<EditarProjecte />} />
        <Route path='/crearparticipant' element={<CrearParticipant />} />
        <Route path='/participant/:id' element={<EditarParticipant />} />
        <Route path='/gestioparticipants' element={<GestioParticipants />} />
        <Route path='/creardespesa' element={<CrearDespesa />} />
        <Route path='/despesa/:id' element={<EditarDespesa />} />   
        <Route path='/gestiodespeses' element={<GestioDespeses />} />            
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
};
export default App;


// import './App.css';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Inici from './pages/inici/Inici';
// import Login from './pages/login/Login';
// import Navbar from './components/navbar/Navbar';
// import ProjectesDetall from './components/projectesDetall/ProjectesDetall';
// import DespesesDetall from './components/despesesDetall/DespesesDetall';
// import ParticipantsDetall from './components/participantsDetall/ParticipantsDetall';

// import Register from './pages/register/Register';

// function App() {

//   return (
//     <div>
//       <Navbar />
//         <Routes>
//           <Route path='/' element={<Inici />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/register' element={<Register/>} />
//           <Route path='/projectes' element={<Inici />} />
//           <Route path='/projecte/:id' element={<ProjectesDetall />} />
//           <Route path='/despesa/:id' element={<DespesesDetall />} />
//           <Route path='/participant/:id' element={<ParticipantsDetall />} />
//           <Route path='*' element={<Navigate to="/" replace />} />
//         </Routes>
//     </div>
//   )
// }

// export default App

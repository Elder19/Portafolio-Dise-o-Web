import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Interfaces/Rutas"; // tu menú
import Inicio from "./Interfaces/Inicio";
import Perfil from "./Interfaces/Perfil";
import Cursos from "./Interfaces/Cursos";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cursos" element={<Cursos />} />
      </Routes>
    </Router>
  );
}

export default App;

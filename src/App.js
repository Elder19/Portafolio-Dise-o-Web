import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Interfaces/Rutas"; // tu menú
import Inicio from "./Interfaces/Inicio";
import Perfil from "./Interfaces/Perfil";
import Cursos from "./Interfaces/Cursos";
import CursoDetalle from "./Interfaces/CursoDetalle";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/cursos/:id" element={<CursoDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;




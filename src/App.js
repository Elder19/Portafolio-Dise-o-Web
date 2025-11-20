import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Interfaces/Rutas";
import Inicio from "./Interfaces/Inicio";
import Perfil from "./Interfaces/Perfil";
import Cursos from "./Interfaces/Cursos";
import CursoDetalle from "./Interfaces/CursoDetalle";
import Comentarios from "./Interfaces/Comentarios";
import Hobbies from "./Interfaces/Hobbies";


import TrabajosOrgx from "./Interfaces/TrabajosOrgx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/cursos/:id" element={<CursoDetalle />} />
        <Route path="/comentarios" element={<Comentarios />} />

        <Route path="/trabajos" element={<TrabajosOrgx />} />
        <Route path="/hobbies" element={<Hobbies />} />

      </Routes>
    </Router>
  );
}

export default App;

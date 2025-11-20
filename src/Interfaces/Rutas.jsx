import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";
import logoTec from "../assets/tec.png";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar" aria-label="Menú principal" id="main-nav">
      <div className="logo-container">
        <img src={logoTec} alt="Logo del TEC" className="logo-img" />
      </div>

      <button
        id="menu-toggle"
        aria-controls="main-nav-list"
        aria-expanded={menuOpen}
        className="menu-btn"
        type="button"
        onClick={handleToggle}
      >
        ☰
      </button>

      <ul
        className={`nav-links${menuOpen ? " open" : ""}`}
        id="main-nav-list"
        onClick={() => setMenuOpen(false)}
      >
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/cursos">Cursos</Link>
        </li>
        <li>
          <Link to="/perfil">Perfil</Link>
        </li>
       

        <li>
          <Link to="/comentarios">Comentarios</Link>
        </li>
         <li>
         <Link to="/trabajos">Trabajos.orgx</Link>
        </li>
        <li>
  <Link to="/hobbies">Hobbies</Link>
</li>

      </ul>
    </nav>
  );
};

export default NavBar;

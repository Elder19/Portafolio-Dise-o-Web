import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ElderImg from "../assets/ELDER.jpg";
import "../Styles/Perfil.css";

function Perfil() {
  const [Biografia, setBiografia] = useState(null);
  // Cargar JSON con datos del perfil
  useEffect(() => {
    fetch("/datos/Biografia.json")
      .then((res) => res.json())
      .then((data) => setBiografia(data))
      .catch((err) => console.error("Error al cargar JSON:", err));
  }, []);

  // Helper para barra de nivel
  const nivelBarra = (nivel) => {
    switch (nivel) {
      case "Básico":
        return 33;
      case "Intermedio":
        return 66;
      case "Avanzado":
        return 100;
      default:
        return 0;
    }
  };

  // Función para exportar PDF

  const exportarPDF = () => {
    if (!Biografia || !Biografia.DatosPersonales) return;
    const doc = new jsPDF();

  
    fetch(ElderImg)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imgBase64 = reader.result;
          if (imgBase64) {
            doc.addImage(imgBase64, "JPEG", 150, 20, 40, 40);
          }

          // Encabezado
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text("Currículum Vitae - Elder Leon Perez", 14, 20);

          // Datos personales a la par de la foto
          const datos = Biografia.DatosPersonales;
          doc.setFontSize(12);
          doc.setFont("helvetica", "normal");
          let yDatos = 26;
          doc.text(`Nombre: ${datos.nombre}`, 14, yDatos);
          doc.text(`Cédula: ${datos.cedula}`, 14, (yDatos += 6));
          doc.text(`Edad: ${datos.edad}`, 14, (yDatos += 6));
          doc.text(
            `Fecha de nacimiento: ${datos.fechaNacimiento}`,
            14,
            (yDatos += 6)
          );
          doc.text(`Dirección: ${datos.direccion}`, 14, (yDatos += 6));
          doc.text(`Email: ${datos.email}`, 14, (yDatos += 6));
          doc.text(`Teléfono: ${datos.numero}`, 14, (yDatos += 6));

          let y = Math.max(yDatos + 20, 80);

          // Sección Habilidades 
          doc.setFont("helvetica", "bold");
          doc.text("Habilidades Técnicas", 14, y);
          y += 8;

          const col1X = 14; // Lenguajes
          const col2X = 80; // Herramientas
          const col3X = 140; // Tecnologías
          let maxY = y;

          const lenguajes = Biografia.HabilidadesTecnicas.Lenguajes || [];
          const herramientas = Biografia.HabilidadesTecnicas.Herramientas || [];
          const tecnologias = Biografia.HabilidadesTecnicas.Tecnologias || [];

          // Función para imprimir en columna
          const printColumn = (arr, x, yStart, title) => {
            let yCol = yStart;
            doc.setFont("helvetica", "bold");
            doc.text(title, x, yCol);
            yCol += 6;
            doc.setFont("helvetica", "normal");
            arr.forEach((hab) => {
              doc.text(`- ${hab.nombre} (${hab.nivel})`, x, yCol);
              yCol += 6;
            });
            return yCol;
          };

          const endY1 = printColumn(lenguajes, col1X, y, "Lenguajes");
          const endY2 = printColumn(herramientas, col2X, y, "Herramientas");
          const endY3 = printColumn(tecnologias, col3X, y, "Tecnologías");

          maxY = Math.max(endY1, endY2, endY3);

          // Certificaciones
          autoTable(doc, {
            startY: maxY + 10,
            head: [["Certificación", "Institución"]],
            body: Biografia.Certificaciones.map((cert) => [
              cert.nombre,
              cert.institucion,
            ]),
            theme: "grid",
            styles: { fontSize: 11 },
          });

          // Redes profesionales
          autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["Red", "URL"]],
            body: (Biografia.RedesProfesionales || []).map((red) => [
              red.nombre,
              red.url,
            ]),
            theme: "grid",
            styles: { fontSize: 11 },
          });

          doc.save("CV_Elder_Leon_Perez.pdf");
        };
        reader.readAsDataURL(blob);
      });
  };
  if (!Biografia) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <header>
        <h1>Perfil profesional</h1>
       
      </header>
      <main>
        <div className="biografia-container">
          <div>
            <img
              src={ElderImg}
              alt="Imagen tipo pasaporte del estudiante"
              className="perfil-img"
            />
          </div>
          <div>
            <h2>{Biografia.DatosPersonales.nombre}</h2>
            <p>
              <b>Cédula:</b> {Biografia.DatosPersonales.cedula}
            </p>
            <p>
              <b>Edad:</b> {Biografia.DatosPersonales.edad}
            </p>
            <p>
              <b>Fecha de nacimiento:</b>{" "}
              {Biografia.DatosPersonales.fechaNacimiento}
            </p>
            <p>
              <b>Dirección:</b> {Biografia.DatosPersonales.direccion}
            </p>
            <p>
              <b>Email:</b> {Biografia.DatosPersonales.email}
            </p>
            <p>
              <b>Teléfono:</b> {Biografia.DatosPersonales.numero}
            </p>
          </div>
        </div>

        <section className="perfil-section">
          <p>{Biografia.BiografiaProfesional}</p>
        </section>

        <section className="perfil-section">
          <h3>Habilidades técnicas</h3>
          <div className="habilidades-container">
            {Object.entries(Biografia.HabilidadesTecnicas).map(([cat, arr]) => (
              <div key={cat}>
                <h4>{cat}</h4>
                <ul className="habilidades-list">
                  {arr.map((hab, i) => (
                    <li key={i} className="habilidad-item">
                      <span className="habilidad-nombre">{hab.nombre}</span>
                      <div className="habilidad-barra">
                        <div
                          className={`nivel-${hab.nivel.toLowerCase()}`}
                          style={{ width: `${nivelBarra(hab.nivel)}%` }}
                        ></div>
                        <span className="habilidad-nivel">{hab.nivel}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="perfil-section">
          <h3>Certificaciones</h3>
          <ul>
            {Biografia.Certificaciones.map((cert, i) => (
              <li key={i}>
                <b>{cert.nombre}</b> - {cert.institucion}
                {cert.enlace && (
                  <>
                    {" "}
                    <a
                      href={cert.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver evidencia
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="perfil-section">
          <h3>Redes profesionales</h3>
          <ul>
            {Biografia.RedesProfesionales.map((red, i) => (
              <li key={i}>
                <b>{red.nombre}:</b>{" "}
                <a href={red.url} target="_blank" rel="noopener noreferrer">
                  {red.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
         <button
          onClick={exportarPDF}
          className="perfil-descargar-btn"
          
        >
          Descargar PDF
        </button>
      </main>
    </div>
  );
}

export default Perfil;

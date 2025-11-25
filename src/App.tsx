import { useState, useEffect } from "react";
import { ProductosPage } from "./components/pages/ProductosPage";
import { InventariosPage } from "./components/pages/InventariosPage";
import { LotesPage } from "./components/pages/LotesPage";
import { MovimientosPage } from "./components/pages/MovimientosPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { Navbar } from "./components/organism/Navbar";

function App() {
  // Cargar página activa desde localStorage o usar "dashboard" por defecto
  const [paginaActiva, setPaginaActiva] = useState(() => {
    const saved = localStorage.getItem("paginaActiva");
    return saved || "dashboard";
  });

  // Guardar página activa en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("paginaActiva", paginaActiva);
  }, [paginaActiva]);

  const renderPagina = () => {
    switch (paginaActiva) {
      case "dashboard":
        return <DashboardPage />;
      case "productos":
        return <ProductosPage />;
      case "inventarios":
        return <InventariosPage />;
      case "lotes":
        return <LotesPage />;
      case "movimientos":
        return <MovimientosPage />;
      case "ventas":
        return <div className="container mt-4"><h2>Ventas (Externo)</h2><p>Próximamente...</p></div>;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <>
      <Navbar 
        usuario="Admin" 
        version="1.0.0" 
        paginaActiva={paginaActiva}
        onNavigate={setPaginaActiva}
      />
      <div className="main-content">
        {renderPagina()}
      </div>
    </>
  );
}

export default App;

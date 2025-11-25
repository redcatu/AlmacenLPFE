import { BarChart3, Package, Truck, Menu, X } from "lucide-react";

import { useState } from "react";
import { LogoNav } from "../atoms/LogoNav";
import { ItemNavegacion } from "../molecules/ItemNavegacion";
import { UsuarioInfo } from "../atoms/UsuarioInfo";
import { VersionInfo } from "../atoms/VersionInfo";

interface NavbarProps {
  usuario?: string;
  version?: string;
  paginaActiva?: string;
  onNavigate?: (pagina: string) => void;
}

export function Navbar(props: NavbarProps) {
  const { usuario, version, paginaActiva, onNavigate } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const itemsNavegacion = [
    {
      icono: BarChart3,
      texto: "Dashboard",
      href: "#dashboard",
      id: "dashboard",
    },
    { icono: Package, texto: "Productos", href: "#productos", id: "productos" },
    {
      icono: Package,
      texto: "Inventarios",
      href: "#inventarios",
      id: "inventarios",
    },
    { icono: Package, texto: "Lotes", href: "#lotes", id: "lotes" },
    {
      icono: Truck,
      texto: "Movimientos",
      href: "#movimientos",
      id: "movimientos",
    },
  ];

  return (
    <>
      {/* Botón toggle para móvil */}
      <button
        className="navbar-toggle"
        onClick={toggleNavbar}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para móvil */}
      <div
        className={`navbar-overlay ${isOpen ? "show" : ""}`}
        onClick={closeNavbar}
      ></div>

      {/* Sidebar */}
      <nav className={`navbar-sidebar ${isOpen ? "open" : ""}`}>
        {/* Header con Logo */}
        <div className="navbar-sidebar-header">
          <LogoNav />
        </div>

        {/* Navegación */}
        <div className="navbar-sidebar-nav">
          {itemsNavegacion.map((item) => (
            <ItemNavegacion
              key={item.id}
              icono={item.icono}
              texto={item.texto}
              href={item.href}
              activo={paginaActiva === item.id}
              onClick={() => {
                if (onNavigate) {
                  onNavigate(item.id);
                }
                closeNavbar();
              }}
            />
          ))}
        </div>

        {/* Footer con info de usuario */}
        <div className="navbar-sidebar-footer">
          <UsuarioInfo usuario={usuario} />
          <VersionInfo version={version} />
        </div>
      </nav>
    </>
  );
}

import type { LucideIcon } from "lucide-react";
import { IconoNav } from "../atoms/IconoNav";

interface ItemNavegacionProps {
  icono: LucideIcon;
  texto: string;
  href: string;
  activo?: boolean;
  onClick?: () => void;
}

export function ItemNavegacion({
  icono,
  texto,
  href,
  activo,
  onClick,
}: ItemNavegacionProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`item-navegacion ${activo ? "activo" : ""}`}
    >
      <IconoNav icono={icono} activo={activo} />
      <span>{texto}</span>
    </a>
  );
}

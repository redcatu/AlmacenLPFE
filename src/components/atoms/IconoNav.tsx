import type { LucideIcon } from "lucide-react";

interface IconoNavProps {
  icono: LucideIcon;
  activo?: boolean;
}

export function IconoNav({ icono: Icono }: IconoNavProps) {
  return <Icono size={20} />;
}

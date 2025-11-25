import type { LucideIcon } from "lucide-react";

interface IconoNavProps {
  icono: LucideIcon;
  activo?: boolean;
}

export function IconoNav({ icono: Icono, activo }: IconoNavProps) {
  return (
    <Icono
      size={20}
      className={`transition-colors ${
        activo ? "text-blue-600" : "text-gray-500"
      }`}
    />
  );
}

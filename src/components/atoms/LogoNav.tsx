import { Store } from "lucide-react";

interface LogoNavProps {
  texto?: string;
}

export function LogoNav(props: LogoNavProps) {
  const { texto = "AlmacenLP" } = props;
  return (
    <>
      <a href="/" className="navbar-sidebar-logo">
        <Store size={24} />
        <span>{texto}</span>
      </a>
    </>
  );
}


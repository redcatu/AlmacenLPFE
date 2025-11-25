interface UsuarioInfoProps {
  usuario?: string;
}

export function UsuarioInfo(props: UsuarioInfoProps) {
  const { usuario = "Admin" } = props;
  return (
    <>
      <div className="navbar-sidebar-usuario">Usuario: {usuario}</div>
    </>
  );
}


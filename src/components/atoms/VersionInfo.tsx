interface VersionInfoProps {
  version?: string;
}

export function VersionInfo(props: VersionInfoProps) {
  const { version = "1.0.0" } = props;
  return (
    <>
      <div className="navbar-sidebar-version">Versión {version}</div>
    </>
  );
}


import useSWR from "swr";

async function fetchApi(key) {
  const status = await fetch(key);
  if (!status.ok) {
    throw new Error("status_code: ", status.status);
  }
  const response = await status.json();
  return response;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
      <DatabaseStatus />
    </>
  );
}

function UpdateAt() {
  const { data, isLoading } = useSWR("api/v1/status", fetchApi, {
    refreshInterval: 5000,
  });

  if (isLoading) return <p>Carregando...</p>;

  const update = data?.update_at ?? {};

  return (
    <>
      <p>Atualizado em: {new Date(update).toLocaleDateString("pt-BR")}</p>
    </>
  );
}

function DatabaseStatus() {
  const { data, isLoading } = useSWR("api/v1/status", fetchApi, {
    refreshInterval: 5000,
  });

  if (isLoading) return <p>Carregando...</p>;

  const database = data?.dependencies?.database ?? {};

  return (
    <div>
      <h2>Database:</h2>
      <p>Versão: {database.version}</p>
      <p>Conexões atuais: {database.current_connections}</p>
      <p>Máximo de conexões: {database.max_connections}</p>
    </div>
  );
}

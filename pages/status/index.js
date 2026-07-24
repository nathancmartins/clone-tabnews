import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = response.json();
  return responseBody;
}

export default function StatusPage() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <>
      <h1>Status Page</h1>
      <UpdatedAt updatedAt={data?.updated_at} isLoading={isLoading} />
      <DatabaseStatus databaseInfo={data?.dependecies} isLoading={isLoading} />
    </>
  );
}

function UpdatedAt({ updatedAt, isLoading }) {
  let updatedAtText = isLoading
    ? "Carregando"
    : new Date(updatedAt).toLocaleString("pt-br");

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus({ databaseInfo, isLoading }) {
  let databaseText = isLoading
    ? "Carregando..."
    : JSON.stringify(databaseInfo, null, 2);
  return (
    <div>
      <h3>Database Status</h3>
      <pre>{databaseText}</pre>
    </div>
  );
}

const apiUrl = import.meta.env.VITE_APP_API_URL;

export async function getFiles() {
  const response = await fetch(`${apiUrl}/list-files/`);
  const data = await response.json();

  return { data };
}

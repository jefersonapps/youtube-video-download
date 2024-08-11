const apiUrl = import.meta.env.VITE_APP_API_URL;

export async function clearDownlods() {
  const response = await fetch(`${apiUrl}/clear_downloads/`, {
    method: "DELETE",
  });
  const data = await response.json();

  return { data };
}

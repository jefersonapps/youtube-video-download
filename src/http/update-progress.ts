const apiUrl = import.meta.env.VITE_APP_API_URL;

export async function updateProgress(downloadId: string) {
  const response = await fetch(`${apiUrl}/progress/${downloadId}`);
  const data = await response.json();

  return { data };
}

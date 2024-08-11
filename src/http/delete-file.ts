const apiUrl = import.meta.env.VITE_APP_API_URL;

export async function deleteFile(fileId: string) {
  const response = await fetch(`${apiUrl}/delete/${fileId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return { data };
}

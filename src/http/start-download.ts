const apiUrl = import.meta.env.VITE_APP_API_URL;

export async function startDownload(url: string) {
  const isYouTubeUrl = (url: string): boolean => {
    const youtubePattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/|youtu\.be\/)/;
    return youtubePattern.test(url);
  };

  if (!isYouTubeUrl(url)) {
    throw new Error("URL inválida! Certifique-se de que a URL é do YouTube.");
  }

  const response = await fetch(`${apiUrl}/download/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Erro na requisição. Tente novamente.");
  }

  const data = await response.json();

  return { data };
}

import { Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { updateProgress } from "./http/update-progress";
import { getFiles } from "./http/get-files";
import { clearDownlods } from "./http/clear-downloads";
import { Form } from "./components/form";
import { DownloadStatusItem } from "./components/download-status-item";
import { DownloadedFilesItem } from "./components/downloaded-files-item";

export interface File {
  url: string;
  name: string;
  id: string;
  title: string;
  yt_url: string;
}

export interface Download {
  id: string;
  url: string;
  progress: number;
  status: string;
}

const apiUrl = import.meta.env.VITE_APP_API_URL;

export function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);

  const fetchFiles = async () => {
    try {
      const { data } = await getFiles();

      if (data.files && data.files.length > 0) {
        const fileData = data.files.map((file: any) => ({
          url: `${apiUrl}/download/${file.id}`,
          name: file.original_file_name,
          id: file.id,
          title: file.title,
          yt_url: file.url,
        }));

        setFiles(fileData);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleClearDownloads = async () => {
    try {
      const { data } = await clearDownlods();

      setFiles([]);
      setDownloads([]);

      if (data.message) {
        toast.info("Arquivos apagados com sucesso!");
      }
    } catch (error) {
      console.error("Error clearing downloads:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    const intervalIds: { [key: string]: number } = {};

    downloads.forEach((download) => {
      if (!intervalIds[download.id]) {
        intervalIds[download.id] = setInterval(async () => {
          try {
            const { data } = await updateProgress(download.id);

            setDownloads((prevDownloads) =>
              prevDownloads.map((d) => {
                if (d.id === download.id) {
                  return {
                    ...d,
                    progress: data.percent || 0,
                    status:
                      data.status === "Completed"
                        ? "Download finalizado!"
                        : `Baixando: ${data.url}`,
                  };
                }
                return d;
              })
            );

            if (data.status === "Completed") {
              clearInterval(intervalIds[download.id]);
              delete intervalIds[download.id];
              setTimeout(() => fetchFiles(), 1000);
            }
          } catch (error) {
            console.error("Error fetching progress:", error);
            setDownloads((prevDownloads) =>
              prevDownloads.map((d) => {
                if (d.id === download.id) {
                  return {
                    ...d,
                    status: "Error fetching progress",
                  };
                }
                return d;
              })
            );
            clearInterval(intervalIds[download.id]);
            delete intervalIds[download.id];
          }
        }, 1000);
      }
    });

    return () => {
      Object.values(intervalIds).forEach((intervalId) =>
        clearInterval(intervalId)
      );
    };
  }, [downloads.length]);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl mb-6 font-bold text-center">Video Downloader</h1>

      <Form setDownloads={setDownloads} />

      {downloads.length > 0 && (
        <section>
          <h2 className="text-2xl mb-4">Status dos Downloads</h2>
          <ul className="space-y-4">
            {downloads.map((download) => (
              <DownloadStatusItem key={download.id} download={download} />
            ))}
          </ul>
        </section>
      )}

      {files.length > 0 && (
        <section>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl mt-6 mb-4">Vídeos baixados</h2>

            <button
              title="Limpar Downloads"
              onClick={handleClearDownloads}
              className="bg-zinc-950 hover:bg-zinc-800 text-white p-3 rounded"
            >
              <Trash />
            </button>
          </div>
          <ul className="space-y-4">
            {files.map((file) => (
              <DownloadedFilesItem
                key={file.id}
                file={file}
                setDownloads={setDownloads}
                setFiles={setFiles}
              />
            ))}
          </ul>
        </section>
      )}
      <Toaster invert richColors />
    </div>
  );
}

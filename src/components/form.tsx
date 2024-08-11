import { toast } from "sonner";
import { startDownload } from "../http/start-download";
import { Dispatch, SetStateAction } from "react";
import { Download } from "../app";

interface FormProps {
  setDownloads: Dispatch<SetStateAction<Download[]>>;
}

export function Form({ setDownloads }: FormProps) {
  const handleStartDownload = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form) {
      console.error("Form element is not available.");
      return;
    }

    const formData = new FormData(form);
    const url = formData.get("url")?.toString().trim() || "";

    if (!url) {
      toast.error("URL inválida!");
      return;
    }

    try {
      const { data } = await startDownload(url);

      const newDownload = {
        id: data.download_id,
        url: url,
        progress: 0,
        status: "Baixando",
      };

      setDownloads((prevDownloads) => [...prevDownloads, newDownload]);

      form.reset();
    } catch (error: any) {
      console.error("Error starting download:", error.message);
      toast.error(String(error.message));
    }
  };

  return (
    <form
      onSubmit={handleStartDownload}
      className="mb-6 flex items-center gap-2"
    >
      <input
        type="text"
        name="url"
        placeholder="Digite uma URL de um vídeo"
        className="p-3 bg-zinc-800 border border-zinc-700 rounded w-full text-lg"
      />
      <button
        type="submit"
        className="px-4 bg-zinc-100 hover:bg-zinc-100/90 text-zinc-950 p-3 rounded text-lg"
      >
        Baixar
      </button>
    </form>
  );
}

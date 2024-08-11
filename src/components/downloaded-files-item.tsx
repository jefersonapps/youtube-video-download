import { toast } from "sonner";
import { Download, File } from "../app";
import { deleteFile } from "../http/delete-file";
import { YouTubeEmbed } from "./youtube-embed";
import { Dispatch, SetStateAction } from "react";
import { Trash } from "lucide-react";

interface DownloadedFilesItemProps {
  file: File;
  setFiles: Dispatch<SetStateAction<File[]>>;
  setDownloads: Dispatch<SetStateAction<Download[]>>;
}

export function DownloadedFilesItem({
  file,
  setFiles,
  setDownloads,
}: DownloadedFilesItemProps) {
  const handleDeleteFile = async (fileId: string) => {
    try {
      const { data } = await deleteFile(fileId);

      if (data.message) {
        toast.info("Arquivo apagado com sucesso!");

        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));

        setDownloads((prevDownloads) =>
          prevDownloads.filter((download) => download.id !== fileId)
        );
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <li
      key={file.id}
      className="bg-zinc-800 p-4 rounded flex justify-center lg:justify-between items-center flex-wrap gap-4"
    >
      <YouTubeEmbed videoUrl={file.yt_url} />
      <div className="flex gap-2 max-w-md">
        <span className="font-semibold">Título:</span>
        <span>{file.title}</span>
      </div>

      <div className="flex gap-2">
        <span className="font-semibold">Arquivo:</span>
        <a href={file.url} className="text-blue-400 hover:underline">
          {file.name}
        </a>
      </div>
      <button
        onClick={() => handleDeleteFile(file.id)}
        className="text-red-500 hover:text-red-400"
        title="Apagar arquivo"
      >
        <Trash />
      </button>
    </li>
  );
}

import { Download } from "../app";
import { YoutubeThumb } from "./youtube-thumb";

export function DownloadStatusItem({ download }: { download: Download }) {
  return (
    <li
      key={download.id}
      className="bg-zinc-800 p-4 rounded flex gap-4 items-center"
    >
      <div className="w-28 rounded-md overflow-hidden">
        <YoutubeThumb videoUrl={download.url} />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-semibold">{download.status}</span>
            <span className="font-semibold">
              URL:{" "}
              <a
                className="font-normal text-blue-400 hover:underline"
                href={download.url}
                target="_blank"
              >
                {download.url}
              </a>
            </span>
          </div>
          <span className="text-sm">{download.progress.toFixed(2)}%</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2.5 mt-2">
          <div
            className="bg-emerald-600 h-2.5 rounded-full"
            style={{ width: `${download.progress}%` }}
          ></div>
        </div>
      </div>
    </li>
  );
}

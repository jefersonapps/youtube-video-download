import { useYouTubeVideoId } from "../hooks/useYouTubeVideoId";

interface YouTubeEmbedProps {
  videoUrl: string;
}

const videoHeight = 200;
const aspectRatio = 16 / 9;

export function YouTubeEmbed({ videoUrl }: YouTubeEmbedProps) {
  const videoId = useYouTubeVideoId(videoUrl);

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="rounded-md overflow-hidden">
      <iframe
        height={videoHeight}
        width={videoHeight * aspectRatio}
        src={embedUrl}
        title="Player de vídeo do YouTube"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

import { useYouTubeVideoId } from "../hooks/useYouTubeVideoId";

interface YoutubeThumbProps {
  videoUrl: string;
}
export function YoutubeThumb({ videoUrl }: YoutubeThumbProps) {
  const videoId = useYouTubeVideoId(videoUrl);

  const thumbUrl = `//img.youtube.com/vi/${videoId}/0.jpg`;

  return <img src={thumbUrl} />;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

/**
 * 视频区域：进入视口时通过 IntersectionObserver 自动播放（autoplay=1&mute=1&loop=1），
 * 同时保留点击播放按钮作为后备。未激活前只渲染封面缩略图 + 播放按钮，避免立即加载 iframe。
 */
export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [userStarted, setUserStarted] = useState(false);

  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  // 单视频循环需要带上 playlist=<videoId>
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`;

  // 进入视口自动加载并播放（仅触发一次；用户手动点击后不再监听）
  useEffect(() => {
    if (userStarted) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [userStarted]);

  const handlePlay = () => {
    setUserStarted(true);
    setActive(true);
  };

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg bg-black"
        style={{ paddingBottom: "56.25%" }}
      >
        {active ? (
          <iframe
            className="absolute top-0 left-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(${thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--nav-theme)/0.92)] shadow-lg shadow-black/30 text-white transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
              <Play className="h-6 w-6 fill-white md:h-8 md:w-8" />
            </span>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

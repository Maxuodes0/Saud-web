"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share, Heart, SkipBack, SkipForward, Play, Pause } from "lucide-react";
import styles from "@/components/ui/music-player-card.module.css";

export interface MusicPlayerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  artistName: string;
  artistHandle: string;
  avatarSrc: string;
  albumArtSrc: string;
  mediaFit?: "cover" | "contain";
  songDuration: number;
  currentProgress: number;
  isPlaying: boolean;
  isLiked: boolean;
  onPlayPauseClick: () => void;
  onLikeClick: () => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onShareClick?: () => void;
  videoSrc?: string;
  emptyLabel?: string;
  onProgressChange?: (progress: number, duration: number) => void;
  onPlaybackEnd?: () => void;
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const MusicPlayerCard = React.forwardRef<HTMLDivElement, MusicPlayerCardProps>(
  (
    {
      className,
      artistName,
      artistHandle,
      avatarSrc,
      albumArtSrc,
      mediaFit = "cover",
      songDuration,
      currentProgress,
      isPlaying,
      isLiked,
      onPlayPauseClick,
      onLikeClick,
      onNextClick,
      onPrevClick,
      onShareClick,
      videoSrc,
      emptyLabel,
      onProgressChange,
      onPlaybackEnd,
      ...props
    },
    ref,
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const canPlay = Boolean(videoSrc);
    const progressPercentage =
      songDuration > 0 ? Math.max(0, Math.min(100, (currentProgress / songDuration) * 100)) : 0;

    React.useEffect(() => {
      const video = videoRef.current;
      if (!video || !canPlay) {
        return;
      }

      if (isPlaying) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    }, [canPlay, isPlaying]);

    React.useEffect(() => {
      const video = videoRef.current;
      if (!video || !canPlay) {
        return;
      }

      if (Math.abs(video.currentTime - currentProgress) > 1.2) {
        video.currentTime = currentProgress;
      }
    }, [canPlay, currentProgress]);

    return (
      <div ref={ref} className={cn(styles.card, className)} {...props}>
        <div className={styles.header}>
          <div className={styles.identity}>
            <Avatar>
              <AvatarImage src={avatarSrc} alt={artistName} />
              <AvatarFallback>{artistName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className={styles.identityText}>
              <p className={styles.name}>{artistName}</p>
              <p className={styles.handle}>{artistHandle}</p>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              variant="ghost"
              size="icon"
              className={styles.actionButton}
              onClick={onShareClick}
              aria-label="Share project"
            >
              <Share className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(styles.actionButton, isLiked && styles.liked)}
              onClick={onLikeClick}
              aria-label="Like project"
            >
              <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
            </Button>
          </div>
        </div>

        <div className={styles.mediaWrap}>
          {canPlay ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={albumArtSrc}
              className={cn(styles.media, mediaFit === "contain" && styles.mediaContain)}
              playsInline
              preload="metadata"
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                onProgressChange?.(video.currentTime, Number.isFinite(video.duration) ? video.duration : songDuration);
              }}
              onLoadedMetadata={(event) => {
                const video = event.currentTarget;
                onProgressChange?.(video.currentTime, Number.isFinite(video.duration) ? video.duration : songDuration);
              }}
              onEnded={() => {
                onPlaybackEnd?.();
              }}
            />
          ) : (
            <Image
              src={albumArtSrc}
              alt={`Visual cover for ${artistName}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={cn(styles.media, mediaFit === "contain" && styles.mediaContain)}
            />
          )}

          {!canPlay && <div className={styles.placeholder}>{emptyLabel ?? "Add video source"}</div>}

          <div className={styles.overlay}>
            <div className={styles.progressBlock}>
              <div className={styles.timeRow}>
                <span>{formatTime(currentProgress)}</span>
                <span>-{formatTime(Math.max(songDuration - currentProgress, 0))}</span>
              </div>

              <div
                className={styles.track}
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className={styles.fill} style={{ width: `${progressPercentage}%` }} />
                <div className={styles.thumb} style={{ left: `${progressPercentage}%` }} />
              </div>
            </div>

            <div className={styles.controls}>
              <Button
                variant="ghost"
                size="icon"
                className={styles.controlButton}
                onClick={onPrevClick}
                aria-label="Previous item"
                disabled={!canPlay}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(styles.controlButton, styles.playButton)}
                onClick={onPlayPauseClick}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                disabled={!canPlay}
              >
                {isPlaying ? <Pause className="h-7 w-7" fill="currentColor" /> : <Play className="h-7 w-7" fill="currentColor" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={styles.controlButton}
                onClick={onNextClick}
                aria-label="Next item"
                disabled={!canPlay}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

MusicPlayerCard.displayName = "MusicPlayerCard";

export { MusicPlayerCard };

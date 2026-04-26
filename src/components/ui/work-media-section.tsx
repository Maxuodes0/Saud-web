"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MusicPlayerCard } from "@/components/ui/music-player-card";
import { cn } from "@/lib/utils";
import type { SiteLanguage } from "@/lib/site-content";
import styles from "@/components/ui/work-media-section.module.css";

type WorkMediaItem = {
  id: string;
  artistName: string;
  artistHandle: string;
  avatarSrc: string;
  albumArtSrc: string;
  videoSrc?: string;
  mediaFit?: "cover" | "contain";
  duration: number;
};

type WorksMediaSectionProps = {
  language: SiteLanguage;
};

type PlaybackState = {
  isPlaying: boolean;
  isLiked: boolean;
  progress: number;
  duration: number;
};

const SUPERCOPA_VIDEO_URL = "/videos/supercopa-de-espana-2026.mp4";

const WORK_ITEMS: Record<SiteLanguage, WorkMediaItem[]> = {
  ar: [
    {
      id: "project-1",
      artistName: "كأس السوبر الإسباني 2026",
      artistHandle: "تغطية حدث",
      avatarSrc: "/sprint-s-logo-white.png",
      albumArtSrc: "/esspain.jpg",
      videoSrc: SUPERCOPA_VIDEO_URL,
      mediaFit: "cover",
      duration: 205,
    },
    {
      id: "project-2",
      artistName: "محتوى الهلال",
      artistHandle: "سرد بصري",
      avatarSrc: "/sprint-s-logo-white.png",
      albumArtSrc: "/hilal.jpg",
      videoSrc: "",
      duration: 84,
    },
    {
      id: "project-3",
      artistName: "كأس السوبر الايطالي 2026",
      artistHandle: "تفعيل بصري",
      avatarSrc: "/sprint-s-logo-white.png",
      albumArtSrc: "/venue-activation.png",
      videoSrc: "",
      mediaFit: "cover",
      duration: 78,
    },
  ],
  en: [
    {
      id: "project-1",
      artistName: "Supercopa de España 2026",
      artistHandle: "Event Coverage",
      avatarSrc: "/sprint-s-logo-white.png",
      albumArtSrc: "/esspain.jpg",
      videoSrc: SUPERCOPA_VIDEO_URL,
      mediaFit: "cover",
      duration: 205,
    },
    {
      id: "project-2",
      artistName: "Al Hilal Content",
      artistHandle: "Visual Storytelling",
      avatarSrc: "/sprint-s-logo-white.png",
      albumArtSrc: "/hilal.jpg",
      videoSrc: "",
      duration: 84,
    },
    {
      id: "project-3",
      artistName: "Supercoppa Italiana 2026",
      artistHandle: "Branded Experience",
      avatarSrc: "/sprint-s-logo-white.png",
      albumArtSrc: "/venue-activation.png",
      videoSrc: "",
      mediaFit: "cover",
      duration: 78,
    },
  ],
};

const introTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function WorksMediaSection({ language }: WorksMediaSectionProps) {
  const items = WORK_ITEMS[language];
  const isArabic = language === "ar";
  const introOffset = isArabic ? 36 : -36;
  const [playback, setPlayback] = React.useState<PlaybackState[]>(
    items.map((item) => ({
      isPlaying: false,
      isLiked: false,
      progress: 0,
      duration: item.duration,
    })),
  );

  React.useEffect(() => {
    setPlayback(
      items.map((item) => ({
        isPlaying: false,
        isLiked: false,
        progress: 0,
        duration: item.duration,
      })),
    );
  }, [items]);

  const togglePlay = (index: number) => {
    if (!items[index]?.videoSrc) {
      return;
    }

    setPlayback((current) =>
      current.map((entry, entryIndex) => ({
        ...entry,
        isPlaying: entryIndex === index ? !entry.isPlaying : false,
      })),
    );
  };

  const toggleLike = (index: number) => {
    setPlayback((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, isLiked: !entry.isLiked } : entry,
      ),
    );
  };

  const resetPlayback = (index: number) => {
    setPlayback((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, isPlaying: false, progress: 0 } : entry,
      ),
    );
  };

  const updateProgress = (index: number, progress: number, duration: number) => {
    setPlayback((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index
          ? {
              ...entry,
              progress,
              duration: Number.isFinite(duration) && duration > 0 ? duration : entry.duration,
            }
          : entry,
      ),
    );
  };

  const handleShare = async (item: WorkMediaItem) => {
    if (typeof navigator === "undefined" || !navigator.share) {
      return;
    }

    try {
      await navigator.share({
        title: item.artistName,
        text: item.artistHandle,
        url: window.location.href,
      });
    } catch {}
  };

  return (
    <section id="work" className={styles.section}>
      <div className={styles.shell}>
        <motion.div
          className={cn(styles.intro, isArabic ? styles.introRtl : styles.introLtr)}
          initial={{ opacity: 0, x: introOffset, y: 16 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={introTransition}
        >
          <span className={cn(styles.eyebrow, isArabic && styles.eyebrowAr)}>
            {isArabic ? "الأعمال" : "Work"}
          </span>
          <h2 className={cn(styles.headline, isArabic && styles.headlineAr)}>
            {isArabic ? "ثلاث لقطات من أعمالنا" : "Three Featured Work Pieces"}
          </h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.08,
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <MusicPlayerCard
                artistName={item.artistName}
                artistHandle={item.artistHandle}
                avatarSrc={item.avatarSrc}
                albumArtSrc={item.albumArtSrc}
                videoSrc={item.videoSrc}
                mediaFit={item.mediaFit}
                songDuration={playback[index]?.duration ?? item.duration}
                currentProgress={playback[index]?.progress ?? 0}
                isPlaying={playback[index]?.isPlaying ?? false}
                isLiked={playback[index]?.isLiked ?? false}
                onPlayPauseClick={() => togglePlay(index)}
                onLikeClick={() => toggleLike(index)}
                onPrevClick={() => resetPlayback(index)}
                onNextClick={() => resetPlayback(index)}
                onShareClick={() => void handleShare(item)}
                onProgressChange={(progress, duration) => updateProgress(index, progress, duration)}
                onPlaybackEnd={() => resetPlayback(index)}
                emptyLabel={isArabic ? "أضف رابط الفيديو هنا" : "Add your video source here"}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

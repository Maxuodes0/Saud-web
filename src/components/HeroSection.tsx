"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { PartnerLogos } from "@/components/PartnerLogos";
import styles from "@/components/hero.module.css";
import type { SiteLanguage } from "@/lib/site-content";
import { siteContent } from "@/lib/site-content";

type HeroSectionProps = {
  language: SiteLanguage;
  onToggleLanguage: () => void;
};

export function HeroSection({ language, onToggleLanguage }: HeroSectionProps) {
  const content = siteContent[language];
  const titleLines = content.title.split("\n");
  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 700], ["0%", "12%"]);
  const backgroundScale = useTransform(scrollY, [0, 700], [1.03, 1.14]);
  const contentY = useTransform(scrollY, [0, 560], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollY, [0, 560], [1, 0.58]);

  const entranceTransition = {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section id="home" className={styles.heroSection}>
      <motion.div
        className={styles.heroBackgroundLayer}
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <Image
          src="/herosec55.png"
          alt="Sprint S stadium background"
          fill
          priority
          className={styles.heroBackground}
        />
      </motion.div>
      <div className={styles.overlay} />

      <Navbar language={language} onToggleLanguage={onToggleLanguage} />

      <motion.div
        className={`${styles.shell} ${styles.heroContent}`}
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className={styles.heroTop}>
          <motion.div
            className={styles.heroLogoWrap}
            initial={{ opacity: 0, y: 36, scale: 0.94, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={entranceTransition}
          >
            <Image
              src="/sprint-s-logo-white.png"
              alt="Sprint S"
              width={640}
              height={180}
              priority
              className={styles.heroLogo}
            />
          </motion.div>
          <motion.p
            className={styles.heroTagline}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 0.12 }}
          >
            {content.text}
          </motion.p>
          <motion.div
            className={styles.heroCopy}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 0.18,
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            <motion.h1 className={styles.heroTitle}>
              {titleLines.map((line) => (
                <motion.span
                  key={line}
                  className={styles.heroTitleLine}
                  variants={{
                    hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: entranceTransition,
                    },
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
        </div>

      </motion.div>

      <motion.div
        className={styles.heroPartners}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...entranceTransition, delay: 0.38 }}
      >
        <PartnerLogos language={language} />
      </motion.div>
    </section>
  );
}

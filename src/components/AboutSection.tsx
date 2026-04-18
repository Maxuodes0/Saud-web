"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/components/hero.module.css";
import type { SiteLanguage } from "@/lib/site-content";
import { siteContent } from "@/lib/site-content";

type AboutSectionProps = {
  language: SiteLanguage;
};

function renderParagraph(paragraph: string) {
  const parts = paragraph.split("SPRINT-S");

  return parts.flatMap((part, index) => {
    const nodes = [<span key={`text-${index}`}>{part}</span>];

    if (index < parts.length - 1) {
      nodes.push(
        <Image
          key={`logo-${index}`}
          src="/sprint-s-logo-white.png"
          alt="Sprint S"
          width={146}
          height={34}
          className={styles.aboutInlineBrand}
        />,
      );
    }

    return nodes;
  });
}

export function AboutSection({ language }: AboutSectionProps) {
  const { about, direction } = siteContent[language];
  const slideFrom = direction === "rtl" ? 48 : -48;

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutBackgroundLayer}>
        <Image
          src="/sec21.jpg"
          alt="Sprint S about section background"
          fill
          className={styles.aboutBackgroundImage}
        />
        <div className={styles.aboutShade} />
      </div>

      <div className={`${styles.shell} ${styles.aboutShell}`}>
        <div className={styles.aboutStage}>
          <motion.div
            className={styles.aboutHeadlinePanel}
            initial={{ opacity: 0, x: slideFrom, y: 24 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={styles.aboutHeadline}>{about.headline}</h2>
          </motion.div>

          <motion.div
            className={styles.aboutTextPanel}
            initial={{ opacity: 0, x: -slideFrom, y: 32 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {about.subheadline ? <p className={styles.aboutSubheadline}>{about.subheadline}</p> : null}

            <div className={styles.aboutParagraphs}>
              {about.body.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  className={styles.aboutParagraph}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.72,
                    delay: 0.16 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {renderParagraph(paragraph)}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

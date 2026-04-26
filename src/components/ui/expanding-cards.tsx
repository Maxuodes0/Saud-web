"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import styles from "@/components/ui/expanding-cards.module.css";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  imageFit?: "cover" | "contain";
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

const ARABIC_TEXT_PATTERN = /[\u0600-\u06FF]/;

export const ExpandingCards = React.forwardRef<HTMLUListElement, ExpandingCardsProps>(
  ({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(defaultActiveIndex);
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const gridStyle = React.useMemo<React.CSSProperties>(() => {
      if (activeIndex === null) {
        return {};
      }

      if (isDesktop) {
        return {
          gridTemplateColumns: items
            .map((_, index) => (index === activeIndex ? "5.4fr" : "1fr"))
            .join(" "),
          gridTemplateRows: "1fr",
        };
      }

      return {
        gridTemplateColumns: "1fr",
        gridTemplateRows: items
          .map((_, index) => (index === activeIndex ? "4fr" : "1fr"))
          .join(" "),
      };
    }, [activeIndex, isDesktop, items]);

    const activateCard = (index: number) => {
      setActiveIndex(index);
    };

    return (
      <ul ref={ref} className={cn(styles.cards, className)} style={gridStyle} {...props}>
        {items.map((item, index) => {
          const isArabic = ARABIC_TEXT_PATTERN.test(`${item.title} ${item.description}`);

          return (
            <li
              key={item.id}
              className={styles.card}
              onMouseEnter={() => activateCard(index)}
              onFocus={() => activateCard(index)}
              onClick={() => activateCard(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  activateCard(index);
                }
              }}
              tabIndex={0}
              data-active={activeIndex === index}
            >
              <Image
                src={item.imgSrc}
                alt={item.title}
                fill
                sizes="(max-width: 767px) 100vw, 22vw"
                className={cn(styles.image, item.imageFit === "contain" && styles.imageContain)}
              />
              <div className={styles.overlay} />

              <article className={styles.content}>
                <h3 className={cn(styles.railTitle, isArabic && styles.railTitleAr)}>
                  {item.title}
                </h3>
                <h3 className={cn(styles.title, isArabic && styles.titleAr)}>{item.title}</h3>
                <p className={cn(styles.description, isArabic && styles.descriptionAr)}>
                  {item.description}
                </p>
              </article>

              <a
                href={item.linkHref}
                className={styles.linkHitbox}
                aria-label={item.title}
                onClick={(event) => {
                  if (item.linkHref === "#") {
                    event.preventDefault();
                  }
                }}
              />
            </li>
          );
        })}
      </ul>
    );
  },
);

ExpandingCards.displayName = "ExpandingCards";

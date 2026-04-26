"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import styles from "@/components/ui/logos3.module.css";

interface Logo {
  id: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
  headingClassName?: string;
  itemLabelClassName?: string;
}

const Logos3 = ({
  heading = "Trusted by these companies",
  logos = [],
  className,
  headingClassName,
  itemLabelClassName,
}: Logos3Props) => {
  const isArabic = /[\u0600-\u06FF]/.test(heading);
  const carouselLogos = logos.length > 0 ? [...logos, ...logos] : [];

  return (
    <section className={cn(styles.section, className)}>
      <div className={styles.headingWrap}>
        <h2 className={cn(styles.heading, isArabic && styles.headingAr, headingClassName)}>
          {heading}
        </h2>
      </div>

      <div className={styles.trackWrap}>
        <Carousel
          className={styles.carousel}
          gap="0.75rem"
          opts={{ loop: true, align: "start" }}
          plugins={[
            AutoScroll({
              playOnInit: true,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              speed: 0.7,
            }),
          ]}
        >
          <CarouselContent className={styles.content}>
            {carouselLogos.map((logo, index) => {
              const isArabicLabel = /[\u0600-\u06FF]/.test(logo.label ?? logo.description);

              return (
                <CarouselItem key={`${logo.id}-${index}`} className={styles.item}>
                  <div className={styles.logoShell}>
                    <div className={styles.logoCard} aria-label={logo.description}>
                      {logo.image ? (
                        <div className={styles.logoImageWrap}>
                          <Image
                            src={logo.image}
                            alt={logo.description}
                            width={200}
                            height={200}
                            className={cn(styles.logoImage, logo.className)}
                          />
                        </div>
                      ) : null}

                      {logo.icon ? <span className={styles.logoIcon}>{logo.icon}</span> : null}

                      {logo.label ? (
                        <span
                          className={cn(
                            styles.logoLabel,
                            isArabicLabel && styles.logoLabelAr,
                            itemLabelClassName,
                          )}
                        >
                          {logo.label}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />
      </div>
    </section>
  );
};

export { Logos3 };

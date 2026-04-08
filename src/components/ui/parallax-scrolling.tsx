'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import styles from '@/components/ui/parallax-scrolling.module.css';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

      if (!triggerElement) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 },
      ];

      layers.forEach((layerObj, index) => {
        timeline.to(
          `[data-parallax-layer="${layerObj.layer}"]`,
          {
            yPercent: layerObj.yPercent,
            ease: 'none',
          },
          index === 0 ? undefined : '<',
        );
      });

      ScrollTrigger.refresh();
    }, parallaxRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div id="work" className={styles.parallax} ref={parallaxRef}>
      <section className={styles.header}>
        <div className={styles.visuals}>
          <div className={styles.blackLineOverflow} />

          <div data-parallax-layers className={styles.layers}>
            <Image
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
              width={800}
              height={1100}
              sizes="(max-width: 900px) 130vw, 74vw"
              data-layer="1"
              data-parallax-layer="1"
              alt=""
              className={styles.layerImage}
            />
            <Image
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
              width={800}
              height={1100}
              sizes="(max-width: 900px) 112vw, 66vw"
              data-layer="2"
              data-parallax-layer="2"
              alt=""
              className={styles.layerImage}
            />
            <div data-parallax-layer="3" className={styles.layerTitle}>
              <h2 className={styles.title}>Showcase</h2>
            </div>
            <Image
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
              width={800}
              height={1100}
              sizes="(max-width: 900px) 102vw, 61vw"
              data-layer="4"
              data-parallax-layer="4"
              alt=""
              className={styles.layerImage}
            />
          </div>

          <div className={styles.fade} />
        </div>
      </section>

      <section className={styles.content}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 160 160"
          fill="none"
          className={styles.icon}
        >
          <path
            d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
            fill="currentColor"
          />
        </svg>
        <p className={styles.caption}>
          A scroll-driven visual section has been added here so the third screen feels more cinematic
          and layered than a static block.
        </p>
      </section>
    </div>
  );
}

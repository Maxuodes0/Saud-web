"use client";

import * as React from "react";
import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import styles from "@/components/ui/logo-cloud-3.module.css";

type Logo = {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  icon?: React.ReactNode;
  label?: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div {...props} className={cn(styles.cloud, className)}>
      <InfiniteSlider gap={18} reverse duration={30} durationOnHover={55}>
        {logos.map((logo) =>
          logo.src ? (
            <Image
              key={`logo-${logo.alt}`}
              alt={logo.alt}
              className={styles.logoImage}
              src={logo.src}
              height={logo.height || 20}
              width={logo.width || 100}
            />
          ) : (
            <div key={`logo-${logo.alt}`} className={styles.logoItem} aria-label={logo.alt}>
              {logo.icon ? <span className={styles.logoIcon}>{logo.icon}</span> : null}
              <span className={styles.logoLabel}>{logo.label ?? logo.alt}</span>
            </div>
          ),
        )}
      </InfiniteSlider>
    </div>
  );
}

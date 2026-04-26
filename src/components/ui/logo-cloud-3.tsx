"use client";

import * as React from "react";
import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import styles from "@/components/ui/logo-cloud-3.module.css";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div {...props} className={cn(styles.cloud, className)}>
      <InfiniteSlider gap={20} reverse duration={14}>
        {logos.map((logo) => (
          <div key={`logo-${logo.alt}`} className={styles.logoFrame}>
            <Image
              alt={logo.alt}
              className={styles.logoImage}
              src={logo.src}
              height={logo.height || 200}
              width={logo.width || 200}
            />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}

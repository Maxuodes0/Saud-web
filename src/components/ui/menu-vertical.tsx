"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import styles from "@/components/ui/menu-vertical.module.css";

type MenuItem = {
  label: string;
  href: string;
};

interface MenuVerticalProps {
  menuItems: MenuItem[];
  activeHref?: string;
  className?: string;
  color?: string;
  direction?: "ltr" | "rtl";
  skew?: number;
  onItemClick?: (item: MenuItem) => void;
}

const MotionLink = motion.create(Link);

export function MenuVertical({
  menuItems = [],
  activeHref,
  className,
  color = "#53a7ff",
  direction = "ltr",
  skew = 0,
  onItemClick,
}: MenuVerticalProps) {
  return (
    <div className={cn(styles.root, direction === "rtl" ? styles.rtl : styles.ltr, className)}>
      {menuItems.map((item, index) => {
        const isActive = activeHref === item.href;

        return (
          <motion.div
            key={`${item.href}-${index}`}
            className={styles.item}
            initial="initial"
            whileHover="hover"
            data-active={isActive}
          >
            <motion.div
              variants={{
                initial: { x: direction === "rtl" ? "100%" : "-100%", color: "inherit", opacity: 0 },
                hover: { x: 0, color, opacity: 1 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={styles.arrow}
            >
              <ArrowRight strokeWidth={3} size={34} />
            </motion.div>

            <MotionLink
              href={item.href}
              variants={{
                initial: { x: direction === "rtl" ? 40 : -40, color: isActive ? color : "inherit" },
                hover: { x: 0, color, skewX: skew },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(styles.link, isActive && styles.active)}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onItemClick?.(item)}
            >
              {item.label}
            </MotionLink>
          </motion.div>
        );
      })}
    </div>
  );
}

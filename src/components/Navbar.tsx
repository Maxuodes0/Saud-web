"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/components/hero.module.css";
import type { SiteLanguage } from "@/lib/site-content";
import { siteContent } from "@/lib/site-content";

type NavbarProps = {
  language: SiteLanguage;
  onToggleLanguage: () => void;
};

export function Navbar({ language, onToggleLanguage }: NavbarProps) {
  const content = siteContent[language];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""} ${
        menuOpen ? styles.mobileMenuOpen : ""
      }`}
    >
      <div className={styles.navbarShell}>
        <div className={styles.navbarRow}>
          <a href="#home" className={styles.navBrand} aria-label="Sprint S home">
            <Image
              src="/sprint-s-logo-white.png"
              alt="Sprint S"
              width={220}
              height={56}
              priority
              className={styles.navBrandLogo}
            />
          </a>

          <button
            type="button"
            className={styles.mobileMenuToggle}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className={styles.mobileMenuLine} />
            <span className={styles.mobileMenuLine} />
            <span className={styles.mobileMenuLine} />
          </button>

          <div className={`${styles.navCollapse} ${menuOpen ? styles.navCollapseOpen : ""}`}>
            <nav id="primary-navigation" className={styles.navMenu} aria-label="Primary">
              {content.nav.map((item) => (
                <a key={item.href} href={item.href} className={styles.navLink} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className={styles.navActions}>
              <button
                type="button"
                className={styles.languageSwitch}
                onClick={() => {
                  onToggleLanguage();
                  closeMenu();
                }}
              >
                {content.switchLabel}
              </button>
              <a href="#contact" className={styles.navCta} onClick={closeMenu}>
                {content.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

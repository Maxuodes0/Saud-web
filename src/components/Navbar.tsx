"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MenuVertical } from "@/components/ui/menu-vertical";
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
  const [activeHref, setActiveHref] = useState("#home");

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

  useEffect(() => {
    const sections = content.nav
      .map((item) => document.querySelector(item.href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        const nextSection = visibleEntries[0]?.target;

        if (nextSection instanceof HTMLElement) {
          setActiveHref(`#${nextSection.id}`);
        }
      },
      {
        rootMargin: "-32% 0px -52% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const syncFromHash = () => {
      const hash = window.location.hash;

      if (content.nav.some((item) => item.href === hash)) {
        setActiveHref(hash);
      } else if (window.scrollY < 120) {
        setActiveHref("#home");
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [content.nav]);

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
              <div className={styles.navDesktopLinks}>
                {content.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`${styles.navLink} ${activeHref === item.href ? styles.navLinkActive : ""}`}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    onClick={() => {
                      setActiveHref(item.href);
                      closeMenu();
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <MenuVertical
                menuItems={content.nav}
                activeHref={activeHref}
                className={styles.navMobileMenu}
                color="#53a7ff"
                direction={content.direction}
                onItemClick={(item) => {
                  setActiveHref(item.href);
                  closeMenu();
                }}
              />

              <button
                type="button"
                className={styles.navUtilityButton}
                onClick={() => {
                  onToggleLanguage();
                  closeMenu();
                }}
              >
                {content.switchLabel}
              </button>
            </nav>

            <div className={styles.navActions}>
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

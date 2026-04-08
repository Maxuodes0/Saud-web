"use client";

import * as React from "react";
import { MotionConfig, motion } from "motion/react";
import { cn } from "@/lib/utils";
import styles from "@/components/ui/animated-slideshow.module.css";
import type { SiteLanguage } from "@/lib/site-content";

interface TextStaggerHoverProps {
  text: string;
  index: number;
  className?: string;
}

interface HoverSliderImageProps {
  index: number;
  imageUrl: string;
  className?: string;
}

interface HoverSliderContextValue {
  activeSlide: number;
  changeSlide: (index: number) => void;
}

type ServiceSlide = {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
};

type ServicesAnimatedSlideshowProps = {
  language: SiteLanguage;
};

function splitEnglishText(text: string) {
  return text
    .split(" ")
    .map((word) => `${word} `)
    .flatMap((word) => word.split(""));
}

function splitArabicText(text: string) {
  return text.match(/[^\s]+\s*/g) ?? [text];
}

function hasArabic(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined);

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext);

  if (!context) {
    throw new Error("useHoverSliderContext must be used within a HoverSliderProvider");
  }

  return context;
}

const SLIDES: Record<SiteLanguage, ServiceSlide[]> = {
  ar: [
    {
      id: "athlete-management",
      title: "تمثيل وإدارة الرياضيين",
      body: "إدارة الحضور التجاري والإعلامي للرياضيين، وتنظيم الشراكات والفرص التي تعزّز قيمة الاسم الرياضي داخل الملعب وخارجه.",
      imageUrl: "/serv.jpg",
    },
    {
      id: "digital-marketing",
      title: "التسويق الرقمي",
      body: "تصميم وتنفيذ حملات رقمية تربط العلامة بالجمهور الرياضي بالمحتوى المناسب والتوقيت المناسب مع متابعة الأداء وتحسين النتائج باستمرار.",
      imageUrl: "/hero-background.jpg",
    },
    {
      id: "media-coverage",
      title: "التغطية الإعلامية للفعاليات",
      body: "تغطية ميدانية شاملة للفعاليات الرياضية عبر التصوير والتحرير السريع وإنتاج مواد جاهزة للنشر اللحظي عبر القنوات المختلفة.",
      imageUrl: "/services-background.jpg",
    },
    {
      id: "content-strategy",
      title: "استراتيجية النشر وصناعة المحتوى",
      body: "تخطيط المحتوى الرياضي وصناعته وفق رحلة واضحة من الفكرة إلى النشر بما يتوافق مع المنصة والهدف والجمهور المستهدف.",
      imageUrl: "/sec21.jpg",
    },
    {
      id: "brand-strategy",
      title: "استراتيجية العلامة التجارية",
      body: "صياغة حضور واضح للعلامة داخل المشهد الرياضي من خلال تموضع دقيق ورسائل متسقة وتجربة بصرية متماسكة.",
      imageUrl: "/second-sec-image.jpg",
    },
    {
      id: "pr-management",
      title: "إدارة العلاقات العامة",
      body: "إدارة العلاقة مع الإعلام والجمهور والشركاء بما يحافظ على سمعة الجهة ويعزّز حضورها في اللحظات المهمة.",
      imageUrl: "/about-us-image.jpg",
    },
    {
      id: "influencer-marketing",
      title: "التسويق عبر المؤثرين",
      body: "اختيار المؤثرين المناسبين وبناء حملات تعاون تحقق وصولًا نوعيًا وتفاعلًا مرتبطًا بأهداف النشاط الرياضي.",
      imageUrl: "/hero-background.jpg",
    },
  ],
  en: [
    {
      id: "athlete-management",
      title: "Athlete Management",
      body: "Managing the commercial and media presence of athletes while structuring partnerships that strengthen their value on and off the field.",
      imageUrl: "/serv.jpg",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      body: "Designing and executing campaigns that connect brands with sports audiences through the right content, timing, and continuous optimization.",
      imageUrl: "/hero-background.jpg",
    },
    {
      id: "media-coverage",
      title: "Event Media Coverage",
      body: "Full on-ground sports coverage through filming, fast editing, and instant-ready publishing assets across channels.",
      imageUrl: "/services-background.jpg",
    },
    {
      id: "content-strategy",
      title: "Content Strategy",
      body: "Planning and producing sports content through a clear path from concept to publishing, aligned with platform, goal, and audience.",
      imageUrl: "/sec21.jpg",
    },
    {
      id: "brand-strategy",
      title: "Brand Strategy",
      body: "Crafting a clear sports-market presence through sharp positioning, consistent messaging, and a cohesive visual system.",
      imageUrl: "/second-sec-image.jpg",
    },
    {
      id: "pr-management",
      title: "Public Relations",
      body: "Managing media, audience, and partner relationships in ways that protect reputation and strengthen visibility in key moments.",
      imageUrl: "/about-us-image.jpg",
    },
    {
      id: "influencer-marketing",
      title: "Influencer Marketing",
      body: "Selecting the right creators and building collaborations that drive qualified reach and engagement tied to sports objectives.",
      imageUrl: "/hero-background.jpg",
    },
  ],
};

export const HoverSlider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const changeSlide = React.useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </HoverSliderContext.Provider>
  );
});
HoverSlider.displayName = "HoverSlider";

export const TextStaggerHover = React.forwardRef<HTMLButtonElement, TextStaggerHoverProps>(
  ({ text, index, className }, ref) => {
    const { activeSlide, changeSlide } = useHoverSliderContext();
    const isActive = activeSlide === index;
    const isArabic = hasArabic(text);
    const tokens = isArabic ? splitArabicText(text) : splitEnglishText(text);

    const activate = () => changeSlide(index);

    return (
      <button
        ref={ref}
        type="button"
        className={cn(styles.titleButton, isActive && styles.titleButtonActive, className)}
        onMouseEnter={activate}
        onFocus={activate}
        onClick={activate}
        aria-pressed={isActive}
      >
        <span className={styles.titleInner}>
          {tokens.map((token, tokenIndex) => (
            <span
              key={`${token}-${tokenIndex}`}
              className={cn(styles.characterWrap, isArabic && styles.wordWrap)}
            >
              <MotionConfig
                transition={{
                  delay: tokenIndex * (isArabic ? 0.05 : 0.02),
                  duration: 0.32,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <motion.span
                  className={styles.characterBase}
                  initial={{ y: "0%" }}
                  animate={isActive ? { y: "-110%" } : { y: "0%" }}
                >
                  {token}
                </motion.span>

                <motion.span
                  className={styles.characterActive}
                  initial={{ y: "110%" }}
                  animate={isActive ? { y: "0%" } : { y: "110%" }}
                >
                  {token}
                </motion.span>
              </MotionConfig>
            </span>
          ))}
        </span>
      </button>
    );
  },
);
TextStaggerHover.displayName = "TextStaggerHover";

const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    opacity: 1,
    scale: 1,
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    opacity: 0,
    scale: 1.04,
  },
};

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(styles.imageWrap, className)} {...props}>
      {children}
    </div>
  );
});
HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

export const HoverSliderImage = React.forwardRef<HTMLDivElement, HoverSliderImageProps>(
  ({ index, imageUrl, className }, ref) => {
    const { activeSlide } = useHoverSliderContext();

    return (
      <motion.div
        ref={ref}
        className={cn(styles.imagePanel, className)}
        style={{ backgroundImage: `url(${imageUrl})` }}
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
        variants={clipPathVariants}
        initial="hidden"
        animate={activeSlide === index ? "visible" : "hidden"}
      />
    );
  },
);
HoverSliderImage.displayName = "HoverSliderImage";

export function ServicesAnimatedSlideshow({ language }: ServicesAnimatedSlideshowProps) {
  const slides = SLIDES[language];
  const [activeSlide, setActiveSlide] = React.useState(0);
  const active = slides[activeSlide] ?? slides[0];
  const isArabic = language === "ar";

  return (
    <section id="services" className={styles.section}>
      <div className={styles.shell}>
        <HoverSlider className={cn(styles.layout, isArabic ? styles.rtl : styles.ltr)}>
          <HoverSliderSync activeSlide={activeSlide} setActiveSlide={setActiveSlide} />

          <div className={styles.titlesColumn}>
            <h2 className={cn(styles.eyebrow, isArabic && styles.eyebrowAr)}>
              {isArabic ? "خدماتنا" : "Our Services"}
            </h2>

            <div className={styles.titles}>
              {slides.map((slide, index) => (
                <TextStaggerHover
                  key={slide.id}
                  index={index}
                  text={slide.title}
                  className={isArabic ? undefined : styles.titleButtonEn}
                />
              ))}
            </div>
          </div>

          <div className={styles.mediaColumn}>
            <HoverSliderImageWrap>
              {slides.map((slide, index) => (
                <HoverSliderImage key={slide.id} index={index} imageUrl={slide.imageUrl} />
              ))}
            </HoverSliderImageWrap>

            <motion.div
              key={active.id}
              className={styles.descriptionCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className={cn(styles.cardTitle, !isArabic && styles.cardTitleEn)}>{active.title}</h3>
              <p className={cn(styles.cardBody, !isArabic && styles.cardBodyEn)}>{active.body}</p>
            </motion.div>
          </div>
        </HoverSlider>
      </div>
    </section>
  );
}

function HoverSliderSync({
  activeSlide,
  setActiveSlide,
}: {
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
}) {
  const context = useHoverSliderContext();

  React.useEffect(() => {
    if (context.activeSlide !== activeSlide) {
      setActiveSlide(context.activeSlide);
    }
  }, [activeSlide, context.activeSlide, setActiveSlide]);

  return null;
}

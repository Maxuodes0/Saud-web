export type SiteLanguage = "ar" | "en";

type NavItem = {
  href: string;
  label: string;
};

type AboutValue = {
  title: string;
  body: string;
};

type AboutStat = {
  value: string;
  label: string;
};

type LocaleContent = {
  direction: "rtl" | "ltr";
  nav: NavItem[];
  cta: string;
  switchLabel: string;
  title: string;
  text: string;
  emailLabel: string;
  about: {
    headline: string;
    subheadline: string;
    body: string[];
    values: AboutValue[];
    stats: AboutStat[];
  };
};

export const siteContent: Record<SiteLanguage, LocaleContent> = {
  ar: {
    direction: "rtl",
    nav: [
      { href: "#home", label: "الرئيسية" },
      { href: "#about", label: "من نحن" },
      { href: "#projects", label: "مشاريعنا" },
      { href: "#work", label: "الأعمال" },
    ],
    cta: "ابدأ مشروعك",
    switchLabel: "English",
    title: "نحوّل الرياضة إلى أثر\nيراه الجمهور ويثق به الشركاء",
    text: "شريكك الاستراتيجي في التسويق الرياضي",
    emailLabel: "راسلنا",
    about: {
      headline: "من نحن",
      subheadline: "",
      body: [
        "في SPRINT-S نؤمن أن الرياضة عالم متنوع، وألعاب مختلفة، وتحديات متجددة، وشغف يتجاوز الملعب.",
        "ومن هذا المنطلق، تأسست SPRINT-S لتفعيل قوة الرياضة وتحويلها إلى مشاريع ومبادرات مؤثرة ومستدامة، تُنفّذ وفق حلول مخصّصة لكل جهة.",
        "نطمح إلى الريادة في سوق التسويق الرياضي عبر تمكين شركائنا من حلول تسويقية رياضية متكاملة تُدار باحترافية على يد خبراء في التغطيات الرياضية، واستراتيجيات التسويق الرياضي، وصناعة المحتوى الرياضي.",
      ],
      values: [
        {
          title: "الرياضة أولًا",
          body: "نحوّل الشغف الرياضي إلى قيمة قابلة للقياس.",
        },
        {
          title: "شراكة حقيقية",
          body: "نبني حلولًا مخصّصة لكل جهة بدل القوالب الجاهزة.",
        },
        {
          title: "تنفيذ احترافي",
          body: "فريق متخصص في التغطيات والاستراتيجيات وصناعة المحتوى.",
        },
      ],
      stats: [
        { value: "05", label: "بطولات دولية" },
        { value: "20+", label: "مشروع منجز" },
        { value: "3", label: "سنوات خبرة" },
      ],
    },
  },
  en: {
    direction: "ltr",
    nav: [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#work", label: "Work" },
    ],
    cta: "Start a project",
    switchLabel: "العربية",
    title: "We turn sport into brand impact\nAudiences feel and partners trust.",
    text: "Your strategic sports marketing partner",
    emailLabel: "Email us",
    about: {
      headline: "About Us",
      subheadline: "",
      body: [
        "At SPRINT-S, we believe sport is a diverse world of different games, evolving challenges, and passion that goes far beyond the field.",
        "From that belief, SPRINT-S was founded to activate the power of sport and transform it into impactful, sustainable projects and initiatives delivered through tailored solutions for every partner.",
        "We aim to lead the sports marketing market by enabling our partners with integrated solutions managed by specialists in sports coverage, sports marketing strategy, and sports content production.",
      ],
      values: [
        {
          title: "Sport-first thinking",
          body: "We turn sporting energy into measurable brand value.",
        },
        {
          title: "Tailored partnership",
          body: "Every solution is built around the needs of each client.",
        },
        {
          title: "Expert execution",
          body: "Coverage, strategy, and content under one disciplined team.",
        },
      ],
      stats: [
        { value: "05", label: "International events" },
        { value: "20+", label: "Projects delivered" },
        { value: "3", label: "Years of experience" },
      ],
    },
  },
};

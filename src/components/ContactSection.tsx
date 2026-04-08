"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "@/components/contact-section.module.css";
import type { SiteLanguage } from "@/lib/site-content";

type ContactSectionProps = {
  language: SiteLanguage;
};

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

type ContactLocale = {
  label: string;
  headline: string;
  body: string;
  note: string;
  submit: string;
  direct: string;
  infoTitle: string;
  info: Array<{ label: string; value: string; href?: string }>;
  fields: {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
  };
  placeholders: {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
  };
};

const CONTENT: Record<SiteLanguage, ContactLocale> = {
  ar: {
    label: "تواصل معنا",
    headline: "دعنا نسمع فكرتك",
    body: "املأ النموذج بالبيانات الأساسية عن مشروعك، وسنرتب معك الخطوة التالية بما يناسب نوع العمل والنطاق المطلوب.",
    note: "عند الإرسال سيتم فتح بريدك الإلكتروني برسالة مجهزة بالبيانات التي أدخلتها.",
    submit: "إرسال الطلب",
    direct: "أو راسلنا مباشرة",
    infoTitle: "معلومات التواصل",
    info: [
      { label: "البريد", value: "info@sprint-s.sa", href: "mailto:info@sprint-s.sa" },
      { label: "الموقع", value: "الرياض، السعودية" },
      { label: "الرد", value: "خلال يوم عمل" },
    ],
    fields: {
      name: "الاسم",
      company: "الجهة / الشركة",
      email: "البريد الإلكتروني",
      phone: "رقم الجوال",
      message: "تفاصيل المشروع",
    },
    placeholders: {
      name: "اكتب اسمك الكامل",
      company: "اسم الجهة أو النادي أو العلامة",
      email: "name@example.com",
      phone: "+966",
      message: "اشرح نوع المشروع، الهدف، والمدة المتوقعة.",
    },
  },
  en: {
    label: "Contact Us",
    headline: "Tell us about your project",
    body: "Fill in the core details about your project and we will come back with the next step based on the scope and type of work.",
    note: "Submitting the form will open your email client with a pre-filled message using the details you entered.",
    submit: "Send inquiry",
    direct: "Or email us directly",
    infoTitle: "Contact details",
    info: [
      { label: "Email", value: "info@sprint-s.sa", href: "mailto:info@sprint-s.sa" },
      { label: "Location", value: "Riyadh, Saudi Arabia" },
      { label: "Response", value: "Within one business day" },
    ],
    fields: {
      name: "Full name",
      company: "Company / organization",
      email: "Email",
      phone: "Phone",
      message: "Project details",
    },
    placeholders: {
      name: "Write your full name",
      company: "Club, brand, or company name",
      email: "name@example.com",
      phone: "+966",
      message: "Share the project type, objective, and expected timeline.",
    },
  },
};

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactSection({ language }: ContactSectionProps) {
  const isArabic = language === "ar";
  const content = CONTENT[language];
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      if (submitted) {
        setSubmitted(false);
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      isArabic
        ? `طلب مشروع جديد - ${form.company || form.name}`
        : `New project inquiry - ${form.company || form.name}`,
    );

    const body = encodeURIComponent(
      [
        `${content.fields.name}: ${form.name}`,
        `${content.fields.company}: ${form.company || "-"}`,
        `${content.fields.email}: ${form.email}`,
        `${content.fields.phone}: ${form.phone || "-"}`,
        "",
        `${content.fields.message}:`,
        form.message,
      ].join("\n"),
    );

    setSubmitted(true);
    window.location.href = `mailto:info@sprint-s.sa?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.shell}>
        <motion.div
          className={`${styles.intro} ${isArabic ? styles.introRtl : styles.introLtr}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={`${styles.label} ${isArabic ? styles.labelAr : ""}`}>{content.label}</span>
          <h2 className={`${styles.headline} ${isArabic ? styles.headlineAr : ""}`}>
            {content.headline}
          </h2>
          <p className={`${styles.body} ${isArabic ? styles.bodyAr : ""}`}>{content.body}</p>
        </motion.div>

        <div className={styles.stage}>
          <motion.form
            className={styles.formCard}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
          >
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span className={`${styles.fieldLabel} ${isArabic ? styles.fieldLabelAr : ""}`}>
                  {content.fields.name}
                </span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  className={styles.input}
                  placeholder={content.placeholders.name}
                />
              </label>

              <label className={styles.field}>
                <span className={`${styles.fieldLabel} ${isArabic ? styles.fieldLabelAr : ""}`}>
                  {content.fields.company}
                </span>
                <input
                  type="text"
                  value={form.company}
                  onChange={handleChange("company")}
                  className={styles.input}
                  placeholder={content.placeholders.company}
                />
              </label>

              <label className={styles.field}>
                <span className={`${styles.fieldLabel} ${isArabic ? styles.fieldLabelAr : ""}`}>
                  {content.fields.email}
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  className={styles.input}
                  placeholder={content.placeholders.email}
                />
              </label>

              <label className={styles.field}>
                <span className={`${styles.fieldLabel} ${isArabic ? styles.fieldLabelAr : ""}`}>
                  {content.fields.phone}
                </span>
                <input
                  type="text"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className={styles.input}
                  placeholder={content.placeholders.phone}
                />
              </label>

              <label className={`${styles.field} ${styles.fieldFull}`}>
                <span className={`${styles.fieldLabel} ${isArabic ? styles.fieldLabelAr : ""}`}>
                  {content.fields.message}
                </span>
                <textarea
                  required
                  value={form.message}
                  onChange={handleChange("message")}
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder={content.placeholders.message}
                />
              </label>
            </div>

            <div className={styles.formFooter}>
              <button type="submit" className={styles.submitButton}>
                {content.submit}
              </button>
              <a href="mailto:info@sprint-s.sa" className={styles.directLink}>
                {content.direct}
              </a>
            </div>

            <p className={`${styles.note} ${submitted ? styles.noteActive : ""}`}>{content.note}</p>
          </motion.form>

          <motion.aside
            className={`${styles.infoCard} ${isArabic ? styles.infoCardAr : styles.infoCardEn}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className={`${styles.infoTitle} ${isArabic ? styles.infoTitleAr : ""}`}>
              {content.infoTitle}
            </h3>

            <div className={styles.infoList}>
              {content.info.map((item) => (
                <div key={item.label} className={styles.infoItem}>
                  <span className={`${styles.infoLabel} ${isArabic ? styles.infoLabelAr : ""}`}>
                    {item.label}
                  </span>
                  {item.href ? (
                    <a href={item.href} className={styles.infoValueLink}>
                      {item.value}
                    </a>
                  ) : (
                    <span className={`${styles.infoValue} ${isArabic ? styles.infoValueAr : ""}`}>
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import proverbs from "@/data/proverbs.json";
import { PageTransition, SectionHeading, fadeUp, stagger } from "@/components/motion/Primitives";
import { useLang, pick } from "@/hooks/useLang";

export const Route = createFileRoute("/proverbs")({
  head: () => ({
    meta: [
      { title: "Palestinian Proverbs — Living Documentary" },
      { name: "description", content: "A collection of Palestinian proverbs with meanings, in Arabic, English and French." },
      { property: "og:title", content: "Palestinian Proverbs" },
      { property: "og:description", content: "The wisdom of the Palestinian street." },
    ],
  }),
  component: ProverbsPage,
});

function ProverbsPage() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <PageTransition>
      <SectionHeading title={t("proverbs.title")} subtitle={t("proverbs.subtitle")} />
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid gap-5 md:grid-cols-2">
        {proverbs.proverbs.map((p: any) => (
          <motion.article
            key={p.id}
            variants={fadeUp}
            className="relative overflow-hidden rounded-2xl glass p-6 shadow-cinema hover-lift"
          >
            <Quote className="absolute -end-3 -top-3 h-20 w-20 text-accent/10" />
            <p className="font-display text-xl leading-relaxed text-foreground/95 md:text-2xl">
              “{pick(p.text, lang)}”
            </p>
            <div className="mt-4 border-t border-border pt-3">
              <span className="text-[10px] uppercase tracking-wider text-accent">{t("proverbs.meaning")}</span>
              <p className="mt-1 text-sm text-muted-foreground">{pick(p.meaning, lang)}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </PageTransition>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import figures from "@/data/figures.json";
import { PageTransition, SectionHeading, fadeUp, stagger } from "@/components/motion/Primitives";
import { useLang, pick } from "@/hooks/useLang";
import { useFirstImage } from "@/hooks/useWikimedia";
import { SmartImage } from "@/components/media/SmartImage";

export const Route = createFileRoute("/figures")({
  head: () => ({
    meta: [
      { title: "Figures — Palestine" },
      { name: "description", content: "Notable Palestinian figures, voices and artists." },
    ],
  }),
  component: FiguresPage,
});

function FiguresPage() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <PageTransition>
      <SectionHeading eyebrow="People" title={t("figures.title")} subtitle={t("figures.subtitle")} />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {figures.map((f) => (
          <FigureCard key={f.id} figure={f} lang={lang} t={t} />
        ))}
      </motion.div>
    </PageTransition>
  );
}

function FigureCard({ figure, lang, t }: any) {
  const img = useFirstImage(figure.query);
  return (
    <motion.article variants={fadeUp} className="group overflow-hidden rounded-3xl glass shadow-cinema hover-lift">
      <div className="relative">
        <SmartImage src={img} alt={pick(figure.name, lang)} aspect="4/5" className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-2xl font-semibold">{pick(figure.name, lang)}</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{pick(figure.role, lang)}</p>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h4 className="text-xs uppercase tracking-wider text-accent">{t("figures.biography")}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{pick(figure.bio, lang)}</p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wider text-accent">{t("figures.achievements")}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{pick(figure.legacy, lang)}</p>
        </div>
      </div>
    </motion.article>
  );
}

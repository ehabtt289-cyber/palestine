import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calendar, MapPin, BookOpen } from "lucide-react";
import figures from "@/data/figures.json";
import { PageTransition, SectionHeading, fadeUp, stagger } from "@/components/motion/Primitives";
import { useLang, pick } from "@/hooks/useLang";
import { useFirstImage } from "@/hooks/useWikimedia";
import { SmartImage } from "@/components/media/SmartImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
        {figures.map((f: any) => (
          <FigureCard key={f.id} figure={f} lang={lang} t={t} />
        ))}
      </motion.div>
    </PageTransition>
  );
}

function fmtDate(d: string | null | undefined, lang: string) {
  if (!d || d === "—") return "—";
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return d;
    return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : lang === "fr" ? "fr-FR" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dt);
  } catch {
    return d;
  }
}

function FigureCard({ figure, lang, t }: any) {
  const img = useFirstImage(figure.query);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.article
        variants={fadeUp}
        className="group flex flex-col overflow-hidden rounded-3xl glass shadow-cinema hover-lift"
      >
        <div className="relative">
          <SmartImage
            src={img}
            alt={pick(figure.name, lang)}
            aspect="4/5"
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display text-2xl font-semibold">{pick(figure.name, lang)}</h3>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{pick(figure.role, lang)}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col space-y-3 p-5">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-accent">{t("figures.biography")}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{pick(figure.bio, lang)}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-accent">{t("figures.achievements")}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{pick(figure.legacy, lang)}</p>
          </div>
          <Button
            variant="secondary"
            className="mt-auto w-full"
            onClick={() => setOpen(true)}
          >
            <BookOpen className="me-2 h-4 w-4" />
            {t("figures.readMore")}
          </Button>
        </div>
      </motion.article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto glass-strong sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-gradient-gold">
              {pick(figure.name, lang)}
            </DialogTitle>
            <DialogDescription className="text-accent">{pick(figure.role, lang)}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-[200px,1fr]">
            <div className="overflow-hidden rounded-2xl">
              <SmartImage src={img} alt={pick(figure.name, lang)} aspect="3/4" />
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid gap-2">
                <InfoRow
                  icon={<Calendar className="h-4 w-4 text-accent" />}
                  label={t("figures.born")}
                  value={fmtDate(figure.born, lang)}
                />
                <InfoRow
                  icon={<Calendar className="h-4 w-4 text-accent" />}
                  label={t("figures.died")}
                  value={figure.died ? fmtDate(figure.died, lang) : t("figures.stillLiving")}
                />
                {figure.birthplace && (
                  <InfoRow
                    icon={<MapPin className="h-4 w-4 text-accent" />}
                    label={t("figures.birthplace")}
                    value={pick(figure.birthplace, lang)}
                  />
                )}
              </div>
              <div>
                <h4 className="mb-1 text-xs uppercase tracking-wider text-accent">
                  {t("figures.biography")}
                </h4>
                <p className="text-muted-foreground">{pick(figure.bio, lang)}</p>
              </div>
              <div>
                <h4 className="mb-1 text-xs uppercase tracking-wider text-accent">
                  {t("figures.details")}
                </h4>
                <p className="text-muted-foreground">{pick(figure.details, lang)}</p>
              </div>
              <div>
                <h4 className="mb-1 text-xs uppercase tracking-wider text-accent">
                  {t("figures.achievements")}
                </h4>
                <p className="text-muted-foreground">{pick(figure.legacy, lang)}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

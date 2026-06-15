import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Flame, BookOpen } from "lucide-react";
import martyrs from "@/data/martyrs.json";
import { PageTransition, SectionHeading, fadeUp, stagger } from "@/components/motion/Primitives";
import { useLang, pick } from "@/hooks/useLang";
import { useFirstImage } from "@/hooks/useWikimedia";
import { SmartImage } from "@/components/media/SmartImage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/martyrs")({
  head: () => ({
    meta: [
      { title: "Palestinian Martyrs — Living Documentary" },
      { name: "description", content: "Honoring Palestinian martyrs: writers, journalists, leaders and activists." },
      { property: "og:title", content: "Palestinian Martyrs" },
      { property: "og:description", content: "Names that became flames." },
    ],
  }),
  component: MartyrsPage,
});

function MartyrsPage() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <PageTransition>
      <div className="mb-10 flex items-center justify-center gap-3 text-accent">
        <Flame className="h-6 w-6" />
        <span className="text-xs uppercase tracking-[0.3em]">{t("martyrs.eyebrow")}</span>
      </div>
      <SectionHeading title={t("martyrs.title")} subtitle={t("martyrs.subtitle")} />
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {martyrs.martyrs.map((m: any) => (
          <MartyrCard key={m.id} martyr={m} lang={lang} />
        ))}
      </motion.div>
    </PageTransition>
  );
}

function MartyrCard({ martyr, lang }: any) {
  const img = useFirstImage(martyr.query);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <motion.article variants={fadeUp} className="group flex flex-col overflow-hidden rounded-2xl glass shadow-cinema hover-lift">
        <div className="relative">
          <SmartImage src={img} alt={pick(martyr.name, lang)} aspect="4/3" className="transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-semibold text-gradient-gold">{pick(martyr.name, lang)}</h3>
          <span className="mt-1 text-xs uppercase tracking-[0.2em] text-accent">{martyr.years}</span>
          <p className="mt-2 text-sm text-muted-foreground">{pick(martyr.role, lang)}</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={() => setOpen(true)}>
            <BookOpen className="me-2 h-4 w-4" />
            {t("common.readMore")}
          </Button>
        </div>
      </motion.article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto glass-strong sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-gradient-gold">{pick(martyr.name, lang)}</DialogTitle>
            <DialogDescription className="text-accent">{martyr.years}</DialogDescription>
          </DialogHeader>
          <div className="overflow-hidden rounded-2xl">
            <SmartImage src={img} alt={pick(martyr.name, lang)} aspect="16/9" />
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <p className="font-medium text-foreground">{pick(martyr.role, lang)}</p>
            <p className="leading-7 text-muted-foreground">{pick(martyr.bio, lang)}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

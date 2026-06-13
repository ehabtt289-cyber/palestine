import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BookOpen } from "lucide-react";
import events from "@/data/events.json";
import { PageTransition, SectionHeading, Reveal } from "@/components/motion/Primitives";
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

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline — Palestine" },
      { name: "description", content: "A scrollable historical timeline of Palestine." },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <PageTransition>
      <SectionHeading eyebrow="History" title={t("timeline.title")} subtitle={t("timeline.subtitle")} />
      <div className="relative">
        <div className="absolute inset-y-0 start-4 w-px bg-gradient-to-b from-accent/10 via-accent/60 to-accent/10 md:start-1/2" />
        <ul className="space-y-12">
          {events.map((e, i) => (
            <TimelineItem key={e.id} event={e} index={i} lang={lang} t={t} />
          ))}
        </ul>
      </div>
    </PageTransition>
  );
}

function TimelineItem({ event, index, lang, t }: any) {
  const img = useFirstImage(event.query);
  const [open, setOpen] = useState(false);
  const left = index % 2 === 0;
  return (
    <li className="relative md:grid md:grid-cols-2 md:gap-10">
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200 }}
        className="absolute start-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-gold-glow md:start-1/2"
      />
      <Reveal className={`ms-12 md:ms-0 ${left ? "md:col-start-1 md:text-end" : "md:col-start-2"}`}>
        <div className="glass shadow-cinema hover-lift overflow-hidden rounded-2xl">
          <SmartImage src={img} alt={pick(event.title, lang)} aspect="16/9" />
          <div className="p-5">
            <span className="text-xs uppercase tracking-[0.2em] text-accent">{event.year}</span>
            <h3 className="mt-1 font-display text-xl font-semibold">{pick(event.title, lang)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{pick(event.description, lang)}</p>
            {event.details && (
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => setOpen(true)}
              >
                <BookOpen className="me-2 h-4 w-4" />
                {t("timeline.readMore")}
              </Button>
            )}
          </div>
        </div>
      </Reveal>

      {event.details && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto glass-strong sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-gradient-gold">
                {pick(event.title, lang)}
              </DialogTitle>
              <DialogDescription className="text-accent">{event.year}</DialogDescription>
            </DialogHeader>
            <div className="overflow-hidden rounded-2xl">
              <SmartImage src={img} alt={pick(event.title, lang)} aspect="16/9" />
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <p className="text-muted-foreground">{pick(event.description, lang)}</p>
              <div>
                <h4 className="mb-1 text-xs uppercase tracking-wider text-accent">
                  {t("timeline.details")}
                </h4>
                <p className="whitespace-pre-line leading-7 text-muted-foreground">
                  {pick(event.details, lang)}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </li>
  );
}
